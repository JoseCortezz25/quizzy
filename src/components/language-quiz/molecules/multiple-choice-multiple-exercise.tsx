"use client";

import { useState } from "react";
import { MultipleChoiceMultipleQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface MultipleChoiceMultipleExerciseProps {
  question: MultipleChoiceMultipleQuestion;
  onAnswer: (selectedOptions: string[]) => void;
  userAnswer?: string[];
}

export const MultipleChoiceMultipleExercise = ({
  question,
  onAnswer,
  userAnswer
}: MultipleChoiceMultipleExerciseProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    userAnswer || []
  );

  const handleOptionClick = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
    onAnswer(newSelectedOptions);
  };

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            onClick={() => handleOptionClick(option.option)}
            selected={selectedOptions.includes(option.option)}
          >
            {option.option}
          </OptionButton>
        ))}
      </div>
    </div>
  );
};