import { z } from "zod";
import { QuestionTypeLanguage } from "./types";

export const quizSchema = z.object({
  title: z.string().describe('Título del quiz'),
  questions: z.array(z.object({
    question: z.string().describe('Pregunta concreta y clara'),
    options: z.array(
      z.object({
        option: z.string().describe('Opción de respuesta'),
        isCorrect: z.boolean().describe('Indica si la opción es correcta')
      })
    ).describe('Cuatro opciones de respuesta. Estas deben ser diferentes y no debe tener la opción "Todas las anteriores"'),
    type: z.nativeEnum(QuestionTypeLanguage).describe('Tipo de pregunta que puede ser'),
    explanation: z.string().default('').describe('Explicación del porqué la respuesta es correcta')
  }))
});