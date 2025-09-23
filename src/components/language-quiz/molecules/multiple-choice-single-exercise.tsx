"use client";

import { useState } from "react";
import { MultipleChoiceSingleQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface MultipleChoiceSingleExerciseProps {
  question: MultipleChoiceSingleQuestion;
  onAnswer: (selectedOptions: string[]) => void;
  userAnswer?: string[];
}

export const MultipleChoiceSingleExercise = ({
  question,
  onAnswer,
  userAnswer
}: MultipleChoiceSingleExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userAnswer?.[0] || null
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onAnswer([option]);
  };

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            onClick={() => handleOptionClick(option.option)}
            selected={selectedOption === option.option}
          >
            {option.option}
          </OptionButton>
        ))}
      </div>
    </div>
  );
};