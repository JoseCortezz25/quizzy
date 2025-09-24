import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Models, Options, QuestionType } from './types';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { ollama } from 'ollama-ai-provider';
import { createOpenAI } from '@ai-sdk/openai';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dictionaryQuestionType = (questionType: QuestionType) => {
  switch (questionType) {
    case QuestionType.TrueOrFalse:
      return 'Verdadero o Falso';
    case QuestionType.MultipleChoiceSingle:
      return 'Selección múltiple con una sola respuesta';
    case QuestionType.MultipleChoice:
      return 'Selección múltiple con múltiples respuestas';
    default:
      return 'Verdadero o Falso';
  }
};

export const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          0.7
        );
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getModel = (config: Options) => {
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
    const model = ollama('deepseek-r1');
    return model;
  }

  const openai = createOpenAI({ apiKey: config.apiKey });
  const model = openai(`${config.model}`);
  return model;
};
