"use server";

import { generateObject } from 'ai';
import { z } from 'zod';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import type { Document } from '@langchain/core/documents';
import type { GenerateQuiz, QuizInstruction } from '@/lib/types';

const generateSystemPrompt = ({ numberQuestions, focus, difficulty, instruction, docs }: QuizInstruction) => {
  return `
  Actua como un profesor experto con bastantes años de experiencia en cualquier tema.
  Tu objetivo es crear un quiz con las siguientes características:
  - Las preguntas deben ser sobre: ${instruction}
  - ${numberQuestions} preguntas
  - Enfocado en ${focus}
  - Dificultad ${difficulty}

  Este es el contenido del PDF del cual se generan las preguntas:
  "${docs}"
  `;
};

const googleModel = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY
});

type GenerateQuizParams = {
  numberQuestions: number;
  focus: "general" | "tecnictal" | "theoretical";
  difficulty: "easy" | "medium" | "hard" | "expert";
}

export const generateQuiz = async (
  data: FormData
): Promise<GenerateQuiz | undefined> => {
  const pdfFile = data.get("file");
  const instruction = data.get("question") as string | null;
  const numberQuestions = Number(data.get("numberQuestions"));
  const focus = data.get("focus") as GenerateQuizParams["focus"];
  const difficulty = data.get("difficulty") as GenerateQuizParams["difficulty"];

  if (!pdfFile) {
    console.error("No file found in form data");
    return;
  }

  //Load the PDF file
  const loader = new PDFLoader(pdfFile);
  const docs = await loader.load();

  // Split the documents into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200
  });

  const splitDocs = await textSplitter.splitDocuments(docs);

  // Embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004", // 768 dimensions
    apiKey: process.env.GOOGLE_API_KEY
  });

  // Vector Store
  const inMemoryVectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs, // Documents to embed
    embeddings // Embeddings from the model
  );

  // Obtain similarity search results
  // Retrieve the documents
  const vectorStoreRetriever = inMemoryVectorStore.asRetriever({
    k: 2,
    searchType: "similarity"
  });

  // Get the documents
  const retrievedDocuments: Document[] = await vectorStoreRetriever.invoke(`Busca información sobre ${instruction}`);

  const result = retrievedDocuments.map((doc) => doc.pageContent).join("\n");

  const { object } = await generateObject({
    model: googleModel('gemini-1.5-pro'),
    schema: z.object({
      quiz: z.object({
        questions: z.array(z.object({
          question: z.string(),
          options: z.array(z.string()).describe('Cuatro opciones de respuesta'),
          answer: z.string()
        }))
      }),
      title: z.string().describe('Título del quiz')
    }),
    prompt: generateSystemPrompt({
      numberQuestions,
      focus,
      difficulty,
      instruction: instruction || "",
      docs: result
    })
  });

  return object;
};