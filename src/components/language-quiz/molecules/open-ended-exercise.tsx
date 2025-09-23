"use client";

import { useState } from "react";
import { OpenEndedQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";

interface OpenEndedExerciseProps {
  question: OpenEndedQuestion;
  onAnswer: (answer: string) => void;
  userAnswer?: string;
}

export const OpenEndedExercise = ({
  question,
  onAnswer,
  userAnswer
}: OpenEndedExerciseProps) => {
  const [answer, setAnswer] = useState(userAnswer || "");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);

    if (value.trim()) {
      onAnswer(value.trim());
    }
  };

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <input
        value={answer}
        onChange={handleAnswerChange}
        placeholder={question.placeholder || "Escribe tu respuesta aquí..."}
        className="w-full bg-brand-dark-600/30 rounded-xl p-4 hover:bg-brand-dark-600/60 transition-colors"
      />
    </div>
  );
};