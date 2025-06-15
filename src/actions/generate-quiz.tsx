"use server";
import { generateObject } from 'ai';
import { z } from 'zod';
import type { Document } from '@langchain/core/documents';
import type { GenerateQuiz, Options, QuizInstruction } from '@/lib/types';
import { Languages, Models, QuestionType } from '@/lib/types';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { dictionaryQuestionType } from '@/lib/utils';
import { AISDKExporter } from 'langsmith/vercel';
import { ollama } from 'ollama-ai-provider';

const generateSystemPrompt = ({
  numberQuestions,
  focus,
  difficulty,
  instruction,
  docs,
  questionType,
  language
}: QuizInstruction) => {
  return `
  Actua como un profesor experto con bastantes años de experiencia en cualquier tema.
  Tu objetivo es crear un quiz con las siguientes características:
  - Las preguntas deben ser sobre: ${instruction}
  - ${numberQuestions} preguntas
  - Enfocado en ${focus}
  - Dificultad ${difficulty}
  - Existen cuatro tipos de preguntas: Verdadero o Falso, selección múltiple con una sola respuesta, selección múltiple con múltiples respuestas. El tipo de pregunta debe ser: "${dictionaryQuestionType(questionType)}".
  - Cuando el tipo de pregunta sea "Verdadero o Falso", las respuestas deben ser "Verdadero" o "Falso".
  - Cuando el tipo de pregunta sea "Selección múltiple", las respuestas deben ser cuatro opciones y no debe tener la opción "Todas las anteriores".
  - El quiz debe ser generado en el idioma "${language}".
  Este es el contenido del PDF del cual se generan las preguntas:
  "${docs}"
  `;
};


const generateSystemPromptImage = ({
  numberQuestions,
  focus,
  difficulty,
  instruction,
  questionType,
  language
}: QuizInstruction) => {
  return `
  Actua como un profesor experto con bastantes años de experiencia en cualquier tema.
  Tu objetivo es crear un quiz con las siguientes características:
  - Las preguntas deben ser sobre: ${instruction}
  - ${numberQuestions} preguntas
  - Enfocado en ${focus}
  - Dificultad ${difficulty}
  - Existen cuatro tipos de preguntas: Verdadero o Falso, selección múltiple con una sola respuesta, selección múltiple con múltiples respuestas. El tipo de pregunta debe ser: "${dictionaryQuestionType(questionType)}".
  - Cuando el tipo de pregunta sea "Verdadero o Falso", las respuestas deben ser "Verdadero" o "Falso".
  - Cuando el tipo de pregunta sea "Selección múltiple", las respuestas deben ser cuatro opciones y no debe tener la opción "Todas las anteriores".
  - El contenido del cual debes basarte para crear el quiz debe ser la imagen suministrada por el usuario.
  - El quiz debe ser generado en el idioma "${language}".
  `;
};


type GenerateQuizParams = {
  numberQuestions: number;
  focus: "general" | "tecnictal" | "theoretical";
  difficulty: "easy" | "medium" | "hard" | "expert";
  questionType: QuestionType;
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

  console.log("Using Google model - Embeddings");

  const model = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: config.model === Models.DeepSeekR1 ? process.env.GOOGLE_GEMINI_API : config.apiKey
  });

  return model;
};

const getModel = (config: Options) => {
  if (
    config.model === Models.Gemini15ProLatest || config.model === Models.GeminiFlash15
    || config.model === Models.Gemini20Flash || config.model === Models.Gemini25ProExp
  ) {
    const apiKey = config.isFree ? process.env.GOOGLE_GEMINI_API || "" : config.apiKey;
    const google = createGoogleGenerativeAI({ apiKey });
    const model = google(config.model);
    return model;
  }

  if (config.model === Models.DeepSeekR1) {
    console.log("Using DeekSeek");

    const model = ollama('deepseek-r1');
    return model;
  }

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
  const questionType = data.get("questionType") as GenerateQuizParams["questionType"];

  if (!pdfFile) {
    console.error("No file found in form data");
    return;
  }

  console.log("config", config);


  try {

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

    // Embeddings
    const embeddings = getModelEmbeddings(config.isFree ? defaultModelEmbeddings : config);

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

    const defaultModel = {
      model: Models.Gemini20Flash,
      apiKey: process.env.GOOGLE_GEMINI_API || ""
    };

    const model = config.isFree ? getModel(defaultModel) : getModel(config);

    console.log("Model");

    const { object } = await generateObject({
      model: model,
      schema: z.object({
        quiz: z.object({
          questions: z.array(z.object({
            question: z.string(),
            options: z.array(z.string()).describe('Cuatro opciones de respuesta. Estas deben ser diferentes y no debe tener la opción "Todas las anteriores"'),
            answer: z.array(z.string()).describe('Respuesta correcta. Puede haber más de una respuesta correcta, pero esto depende del tipo de pregunta'),
            explanation: z.string().default('').describe('Explicación de la respuesta del por qué es correcta')
          }))
        }),
        title: z.string().describe('Título del quiz')
      }),
      prompt: generateSystemPrompt({
        numberQuestions,
        focus,
        difficulty,
        instruction: instruction || "",
        docs: result,
        questionType,
        language: config.language || Languages.Spanish
      }),
      // eslint-disable-next-line camelcase
      experimental_telemetry: AISDKExporter.getSettings()
    });

    const updatedQuiz = {
      ...object.quiz,
      questions: object.quiz.questions.map((question) => ({
        ...question,
        type: questionType
      }))
    };

    return { quiz: updatedQuiz, title: object.title };
  } catch (error) {
    console.error("ERROR", error);

    throw new Error("Ha ocurrido un error generando el quiz");
  }
};

export const generateQuizBasedImage = async (
  data: FormData,
  images: string[],
  config: Options
) => {
  const instruction = data.get("question") as string | null;
  const numberQuestions = Number(data.get("numberQuestions"));
  const focus = data.get("focus") as GenerateQuizParams["focus"];
  const difficulty = data.get("difficulty") as GenerateQuizParams["difficulty"];
  const questionType = data.get("questionType") as GenerateQuizParams["questionType"];

  const defaultModel = {
    model: Models.Gemini15ProLatest,
    apiKey: process.env.GOOGLE_GEMINI_API || ""
  };

  const model = config.isFree ? getModel(defaultModel) : getModel(config);

  try {
    const { object } = await generateObject({
      model,
      temperature: 0.6,
      schema: z.object({
        quiz: z.object({
          questions: z.array(z.object({
            question: z.string(),
            options: z.array(z.string()).describe('Cuatro opciones de respuesta. Estas deben ser diferentes y no debe tener la opción "Todas las anteriores"'),
            answer: z.array(z.string()).describe('Respuesta correcta. Puede haber más de una respuesta correcta, pero esto depende del tipo de pregunta'),
            explanation: z.string().default('').describe('Explicación de la respuesta del por qué es correcta')
          }))
        }),
        title: z.string().describe('Título del quiz')
      }),
      system: generateSystemPromptImage({
        numberQuestions,
        focus,
        difficulty,
        instruction: instruction || "",
        questionType,
        language: config.language || Languages.Spanish
      }),
      output: 'object',
      messages: [
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: 'Genera un quiz basado en las imágenes suministradas'
            }
          ]
        },
        {
          role: 'user',
          content: images.map(image => ({
            type: 'image',
            image
          }))
        }
      ]
    });

    const updatedQuiz = {
      ...object.quiz,
      questions: object.quiz.questions.map((question) => ({
        ...question,
        type: questionType
      }))
    };

    return { quiz: updatedQuiz, title: object.title };
  } catch (error) {
    console.log("Error in actions", error);
    throw new Error("Ha ocurrido un error generando el quiz");
  }
};