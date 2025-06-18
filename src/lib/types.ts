export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export type QuizInstruction = {
  numberQuestions: number;
  focus: 'general' | 'tecnictal' | 'theoretical';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  questionType: QuestionType;
  instruction: string;
  docs?: string;
  language: Languages;
};

export interface QuizQuestion {
  question: string;
  options: string[];
  type: QuestionType;
  answer: string | string[];
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface GenerateQuiz {
  quiz: Quiz;
  title: string;
}

export interface GenerateLanguageQuiz {
  questions: {
    question: string;
    options: {
      option: string;
      isCorrect: boolean;
    }[];
    type: QuestionTypeLanguage;
    explanation: string;
  }[];
  title: string;
}

export enum Models {
  O1Preview = 'o1-preview',
  O1mini = 'o1-mini',
  GPT4o = 'gpt-4o',
  GPT4oMini = 'gpt-4o-mini',
  Gemini15ProLatest = 'gemini-1.5-pro-latest',
  GeminiFlash15 = 'gemini-1.5-flash-latest',
  DeepSeekR1 = 'deepseek-r1',
  Gemini25ProExp = 'gemini-2.5-pro-exp-03-25',
  Gemini20Flash = 'gemini-2.0-flash-001'
}

export interface Options {
  apiKey: string;
  model: Models;
  isFree?: boolean;
  language?: Languages;
}

export enum QuestionType {
  MultipleChoiceSingle = 'multiple-choice-single',
  MultipleChoice = 'multiple-choice',
  TrueOrFalse = 'true-or-false',
  OpenEnded = 'open-ended'
}

export enum QuestionTypeLanguage {
  ReadAndRespond = 'Read text and responde based on the text between 1 and 3 responses',
  Organize = 'Organize the words in the correct order',
  FillInTheBlank = 'Fill in the blank with the correct word',
  MultipleChoice = 'Contest the question with the correct answer',
  Match = 'Match the correct pair of words'
}

export type UserAnswer = {
  index: number;
  question: string;
  isCorrect: boolean;
  selectedOptions: string[];
};

export enum Languages {
  Spanish = 'Spanish',
  English = 'English'
}
