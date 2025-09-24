'use server';

import { generateSystemPromptLanguage } from '@/lib/ai/prompts';
import { quizSchema } from '@/lib/schemas';
import { GenerateLanguageQuiz, Models, Options } from '@/lib/types';
import { getModel } from '@/lib/utils';
import { generateObject } from 'ai';

export const generateLanguageQuiz = async (
  userRequest: string,
  level: string,
  language: string,
  config: Options
): Promise<GenerateLanguageQuiz | undefined> => {
  if (!userRequest || !level || !language) {
    throw new Error('Missing required parameters');
  }

  if (config.model === Models.O1Preview || config.model === Models.O1mini) {
    throw new Error('This model is not supported for this action');
  }

  const systemPrompt = generateSystemPromptLanguage(
    userRequest,
    level,
    language
  );

  const defaultModel = {
    model: Models.Gemini25ProExp,
    apiKey: process.env.GOOGLE_GEMINI_API || ''
  };

  const model = config.isFree ? getModel(defaultModel) : getModel(config);

  const { object } = await generateObject({
    model: model,
    prompt: `Genera un quiz educativo variado y dinamico con diferentes tipos de ejercicios para maximizar el aprendizaje del usuario. 
    Especificamente para el nivel de idioma: ${level} y el idioma: ${language} y el tema: ${userRequest}.
    El quiz debe estar en ${language}. Todas las preguntas y respuestas deben estar en ${language}.`,
    schema: quizSchema,
    system: systemPrompt
  });

  return {
    questions: object.questions,
    title: object.title
  };
};
