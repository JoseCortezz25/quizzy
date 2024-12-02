export interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

export type QuizInstruction = {
  numberQuestions: number;
  focus: "general" | "tecnictal" | "theoretical";
  difficulty: "easy" | "medium" | "hard" | "expert";
  instruction: string;
  docs: string;
};

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
  title: string;
}