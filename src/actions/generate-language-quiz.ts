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

  console.log('userRequest', userRequest);
  console.log('level', level);
  console.log('language', language);
  console.log('config', config);

  const systemPrompt = generateSystemPromptLanguage(
    userRequest,
    level,
    language
  );

  const defaultModel = {
    model: Models.Gemini25ProExp,
    apiKey: process.env.GOOGLE_GEMINI_API || ''
  };

  console.log('defaultModel', defaultModel);
  const model = config.isFree ? getModel(defaultModel) : getModel(config);

  console.log('model', model);

  const { object } = await generateObject({
    model: model,
    prompt:
      'Genera un quiz educativo variado y dinamico con diferentes tipos de ejercicios para maximizar el aprendizaje del usuario. Especificamente para el nivel de idioma: ' +
      level +
      ' y el idioma: ' +
      language +
      ' y el tema: ' +
      userRequest,
    schema: quizSchema,
    system: systemPrompt
  });

  return {
    questions: object.questions,
    title: object.title
  };
};
