import { z } from "zod";
import { QuestionTypeLanguage } from "./types";

const baseQuestionSchema = z.object({
  id: z.string().describe('ID único de la pregunta'),
  question: z.string().describe('Pregunta concreta y clara'),
  type: z.nativeEnum(QuestionTypeLanguage).describe('Tipo de pregunta'),
  explanation: z.string().describe('Explicación de la respuesta correcta')
});

const openEndedQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionTypeLanguage.OpenEnded),
  expectedAnswer: z.string().describe('Respuesta esperada para la pregunta abierta')
});

const multipleChoiceSingleQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionTypeLanguage.MultipleChoiceSingle),
  options: z.array(
    z.object({
      option: z.string().describe('Opción de respuesta'),
      isCorrect: z.boolean().describe('Indica si la opción es correcta')
    })
  ).min(3).max(4).describe('Opciones de respuesta (3-4 opciones)')
});

const multipleChoiceMultipleQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionTypeLanguage.MultipleChoiceMultiple),
  options: z.array(
    z.object({
      option: z.string().describe('Opción de respuesta'),
      isCorrect: z.boolean().describe('Indica si la opción es correcta')
    })
  ).min(3).max(4).describe('Opciones de respuesta (3-4 opciones)')
});

const wordOrderQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionTypeLanguage.WordOrder),
  words: z.array(z.string()).describe('Palabras desordenadas'),
  correctOrder: z.array(z.string()).describe('Orden correcto de las palabras')
});

const wordMeaningQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionTypeLanguage.WordMeaning),
  sentence: z.string().describe('Frase con la palabra en contexto'),
  highlightedWord: z.string().describe('Palabra destacada en la frase'),
  options: z.array(
    z.object({
      option: z.string().describe('Posible significado'),
      isCorrect: z.boolean().describe('Indica si es el significado correcto')
    })
  ).min(3).max(4).describe('Opciones de significado')
});

const wordMatchQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionTypeLanguage.WordMatch),
  pairs: z.array(
    z.object({
      word: z.string().describe('Palabra en el idioma original'),
      translation: z.string().describe('Traducción de la palabra')
    })
  ).min(4).max(6).describe('Pares de palabras para emparejar')
});

const readingComprehensionQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionTypeLanguage.ReadingComprehension),
  passage: z.string().describe('Texto para leer'),
  options: z.array(
    z.object({
      option: z.string().describe('Posible respuesta'),
      isCorrect: z.boolean().describe('Indica si la respuesta es correcta')
    })
  ).min(3).max(4).describe('Opciones de respuesta sobre el texto')
});

const languageQuestionSchema = z.discriminatedUnion('type', [
  openEndedQuestionSchema,
  multipleChoiceSingleQuestionSchema,
  multipleChoiceMultipleQuestionSchema,
  wordOrderQuestionSchema,
  wordMeaningQuestionSchema,
  wordMatchQuestionSchema,
  readingComprehensionQuestionSchema
]);

export const quizSchema = z.object({
  title: z.string().describe('Título del quiz'),
  questions: z.array(languageQuestionSchema).min(5).max(15).describe('Preguntas del quiz con variedad de tipos')
});