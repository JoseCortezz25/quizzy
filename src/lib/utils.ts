import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QuestionType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dictionaryQuestionType = (questionType: QuestionType) => {
  switch (questionType) {
    case QuestionType.TrueOrFalse:
      return "Verdadero o Falso";
    case QuestionType.MultipleChoiceSingle:
      return "Selección múltiple con una sola respuesta";
    case QuestionType.MultipleChoice:
      return "Selección múltiple con múltiples respuestas";
    default:
      return "Verdadero o Falso";
  }
};