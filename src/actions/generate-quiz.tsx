"use server";

import { generateObject } from 'ai';
import { z } from 'zod';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import type { Document } from '@langchain/core/documents';
import { Models, type GenerateQuiz, type Options, type QuizInstruction } from '@/lib/types';
import { OpenAIEmbeddings } from "@langchain/openai";
import { createOpenAI } from '@ai-sdk/openai';

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

type GenerateQuizParams = {
  numberQuestions: number;
  focus: "general" | "tecnictal" | "theoretical";
  difficulty: "easy" | "medium" | "hard" | "expert";
}

const getModelEmbeddings = (config: Options) => {
  if (config.model === Models.GPT4o || config.model === Models.GPT4oMini) {
    console.log("Using OpenAI model");

    const model = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
      apiKey: config.apiKey
    });

    return model;
  }


  console.log("Using Google model");

  const model = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: config.apiKey
  });

  return model;
};

const getModel = (config: Options) => {
  if (config.model === Models.Gemini15ProLatest || config.model === Models.GeminiFlash15) {
    console.log("Using Google model 2");
    console.log("DATA", config);
    console.log("DATA 2", process.env.GOOGLE_GEMINI_API);

    const apiKey = config.isFree ? process.env.GOOGLE_GEMINI_API || "" : config.apiKey;
    const google = createGoogleGenerativeAI({ apiKey });
    const model = google(config.model);
    return model;
  }

  console.log("Using OpenAI model 2");

  const openai = createOpenAI({ apiKey: config.apiKey });
  const model = openai(`${config.model}`);
  return model;
};

export const generateQuiz = async (
  data: FormData,
  config: Options
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

  console.log("Generating quiz with instruction:", config);

  //Load the PDF file
  const loader = new PDFLoader(pdfFile);
  const docs = await loader.load();

  // Split the documents into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200
  });

  const splitDocs = await textSplitter.splitDocuments(docs);

  const defaultModelEmbeddings = {
    model: Models.Gemini15ProLatest,
    apiKey: process.env.GOOGLE_GEMINI_API || ""
  };

  console.log("Using default model:", defaultModelEmbeddings);


  // Embeddings
  const embeddings = getModelEmbeddings(config.isFree ? defaultModelEmbeddings : config);

  // Vector Store
  const inMemoryVectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs, // Documents to embed
    embeddings // Embeddings from the model
  );

  console.log("Vector store created", inMemoryVectorStore);


  // Obtain similarity search results
  // Retrieve the documents
  const vectorStoreRetriever = inMemoryVectorStore.asRetriever({
    k: 2,
    searchType: "similarity"
  });

  console.log("Vector store retriever created", vectorStoreRetriever);


  // Get the documents
  const retrievedDocuments: Document[] = await vectorStoreRetriever.invoke(`Busca información sobre ${instruction}`);
  console.log("Retrieved documents:", retrievedDocuments);


  const result = retrievedDocuments.map((doc) => doc.pageContent).join("\n");
  console.log("Retrieved documents 2:", result);

  const defaultModel = {
    model: Models.Gemini15ProLatest,
    apiKey: process.env.GOOGLE_GEMINI_API || ""
  };

  const { object } = await generateObject({
    model: config.isFree ? getModel(defaultModel) : getModel(config),
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