"use client";

import { useState } from "react";
import { OpenEndedQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";

interface OpenEndedExerciseProps {
  question: OpenEndedQuestion;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
  userAnswer?: string | string[];
}

export const OpenEndedExercise = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer
}: OpenEndedExerciseProps) => {
  const [answer, setAnswer] = useState(userAnswer || "");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);

    // Auto-submit when user stops typing (debounce effect)
    if (value.trim()) {
      onAnswer(value.trim());
    }
  };

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <div className="space-y-3">
        <input
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Escribe tu respuesta aquí..."
          disabled={showResult}
          className="w-full bg-brand-dark-600/30 rounded-xl p-4 hover:bg-brand-dark-600/60 transition-colors"
        />

        {showResult && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Respuesta esperada:</p>
            <p className="text-gray-700">{question.expectedAnswer}</p>
            {question.explanation && (
              <div className="mt-2">
                <p className="text-sm font-medium">Explicación:</p>
                <p className="text-gray-600 text-sm">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};