"use server";

import { generateObject } from 'ai';
import { z } from 'zod';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export type QuizInstruction = {
  numberQuestions: number;
  focus: "general" | "tecnictal" | "theoretical";
  difficulty: "easy" | "medium" | "hard" | "expert";
};

const generateSystemPrompt = ({ numberQuestions, focus, difficulty }: QuizInstruction) => {
  return `
  Actua como un profesor experto con bastantes años de experiencia en cualquier tema.
  Tu objetivo es crear un quiz con las siguientes características:
  - ${numberQuestions} preguntas
  - Enfocado en ${focus}
  - Dificultad ${difficulty}
  `;;
};

const googleModel = createGoogleGenerativeAI({
  apiKey: ""
});

type GenerateQuizParams = {
  numberQuestions: number;
  focus: "general" | "tecnictal" | "theoretical";
  difficulty: "easy" | "medium" | "hard" | "expert";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface GenerateQuiz {
  quiz: Quiz;
}

export const generateQuiz = async (
  numberQuestions: number,
  focus: GenerateQuizParams["focus"],
  difficulty: GenerateQuizParams["difficulty"]
): Promise<GenerateQuiz> => {
  const { object } = await generateObject({
    model: googleModel('gemini-1.5-pro'),
    schema: z.object({
      quiz: z.object({
        questions: z.array(z.object({
          question: z.string(),
          options: z.array(z.string()),
          answer: z.string()
        }))
      })
    }),
    prompt: generateSystemPrompt({ numberQuestions, focus, difficulty })
  });

  console.log("Generated quiz:", object);
  return object;
};