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

export interface WordPair {
  word: string;
  translation: string;
}

export interface LanguageQuestionBase {
  id: string;
  question: string;
  type: QuestionTypeLanguage;
  explanation: string;
}

export interface OpenEndedQuestion extends LanguageQuestionBase {
  type: QuestionTypeLanguage.OpenEnded;
  expectedAnswer: string;
}

export interface MultipleChoiceSingleQuestion extends LanguageQuestionBase {
  type: QuestionTypeLanguage.MultipleChoiceSingle;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
}

export interface MultipleChoiceMultipleQuestion extends LanguageQuestionBase {
  type: QuestionTypeLanguage.MultipleChoiceMultiple;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
}

export interface WordOrderQuestion extends LanguageQuestionBase {
  type: QuestionTypeLanguage.WordOrder;
  words: string[];
  correctOrder: string[];
}

export interface WordMeaningQuestion extends LanguageQuestionBase {
  type: QuestionTypeLanguage.WordMeaning;
  sentence: string;
  highlightedWord: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
}

export interface WordMatchQuestion extends LanguageQuestionBase {
  type: QuestionTypeLanguage.WordMatch;
  pairs: WordPair[];
}

export interface ReadingComprehensionQuestion extends LanguageQuestionBase {
  type: QuestionTypeLanguage.ReadingComprehension;
  passage: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
}

export type LanguageQuestion =
  | OpenEndedQuestion
  | MultipleChoiceSingleQuestion
  | MultipleChoiceMultipleQuestion
  | WordOrderQuestion
  | WordMeaningQuestion
  | WordMatchQuestion
  | ReadingComprehensionQuestion;

export interface GenerateLanguageQuiz {
  questions: LanguageQuestion[];
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
  Gemini25ProExp = 'gemini-2.5-pro',
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
  OpenEnded = 'open-ended',
  MultipleChoiceSingle = 'multiple-choice-single',
  MultipleChoiceMultiple = 'multiple-choice-multiple',
  WordOrder = 'word-order',
  WordMeaning = 'word-meaning',
  WordMatch = 'word-match',
  ReadingComprehension = 'reading-comprehension'
}

export type UserAnswer = {
  index: number;
  question: string;
  isCorrect: boolean;
  selectedOptions: string[];
};

export interface LanguageUserAnswerBase {
  questionId: string;
  type: QuestionTypeLanguage;
  isCorrect: boolean;
}

export interface OpenEndedAnswer extends LanguageUserAnswerBase {
  type: QuestionTypeLanguage.OpenEnded;
  answer: string;
}

export interface MultipleChoiceAnswer extends LanguageUserAnswerBase {
  type:
    | QuestionTypeLanguage.MultipleChoiceSingle
    | QuestionTypeLanguage.MultipleChoiceMultiple;
  selectedOptions: string[];
}

export interface WordOrderAnswer extends LanguageUserAnswerBase {
  type: QuestionTypeLanguage.WordOrder;
  orderedWords: string[];
}

export interface WordMeaningAnswer extends LanguageUserAnswerBase {
  type: QuestionTypeLanguage.WordMeaning;
  selectedOption: string;
}

export interface WordMatchAnswer extends LanguageUserAnswerBase {
  type: QuestionTypeLanguage.WordMatch;
  matches: { word: string; translation: string }[];
}

export interface ReadingComprehensionAnswer extends LanguageUserAnswerBase {
  type: QuestionTypeLanguage.ReadingComprehension;
  selectedOption: string;
}

export type LanguageUserAnswer =
  | OpenEndedAnswer
  | MultipleChoiceAnswer
  | WordOrderAnswer
  | WordMeaningAnswer
  | WordMatchAnswer
  | ReadingComprehensionAnswer;

export enum Languages {
  Spanish = 'Spanish',
  English = 'English'
}
