"use client";

import { useState } from "react";
import { MultipleChoiceSingleQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface MultipleChoiceSingleExerciseProps {
  question: MultipleChoiceSingleQuestion;
  onAnswer: (selectedOptions: string[]) => void;
  showResult?: boolean;
  userAnswer?: string[];
}

export const MultipleChoiceSingleExercise = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer
}: MultipleChoiceSingleExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userAnswer?.[0] || null
  );

  const handleOptionClick = (option: string) => {
    if (showResult) return;

    setSelectedOption(option);
    onAnswer([option]);
  };

  const getOptionStatus = (option: string) => {
    const isCorrect = question.options.find(opt => opt.option === option)?.isCorrect;

    if (!showResult) {
      return {
        selected: selectedOption === option,
        correct: false,
        incorrect: false
      };
    }

    return {
      selected: selectedOption === option,
      correct: isCorrect,
      incorrect: selectedOption === option && !isCorrect
    };
  };

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const status = getOptionStatus(option.option);

          return (
            <OptionButton
              key={index}
              onClick={() => handleOptionClick(option.option)}
              selected={status.selected}
              correct={status.correct}
              incorrect={status.incorrect}
              disabled={showResult}
            >
              {option.option}
            </OptionButton>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Explicación:</p>
          <p className="text-gray-600 text-sm">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};