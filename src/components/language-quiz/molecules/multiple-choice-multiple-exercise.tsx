"use client";

import { useState } from "react";
import { MultipleChoiceMultipleQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface MultipleChoiceMultipleExerciseProps {
  question: MultipleChoiceMultipleQuestion;
  onAnswer: (selectedOptions: string[]) => void;
  showResult?: boolean;
  userAnswer?: string[];
}

export const MultipleChoiceMultipleExercise = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer
}: MultipleChoiceMultipleExerciseProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    userAnswer || []
  );

  const handleOptionClick = (option: string) => {
    if (showResult) return;

    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);

    // Auto-submit whenever user selects/deselects options
    onAnswer(newSelectedOptions);
  };

  const getOptionStatus = (option: string) => {
    const isCorrect = question.options.find(opt => opt.option === option)?.isCorrect;
    const isSelected = selectedOptions.includes(option);

    if (!showResult) {
      return {
        selected: isSelected,
        correct: false,
        incorrect: false
      };
    }

    return {
      selected: isSelected,
      correct: isCorrect && isSelected,
      incorrect: (isSelected && !isCorrect) || (!isSelected && isCorrect)
    };
  };

  return (
    <div className="space-y-4">
      <QuestionText>
        {question.question}
        <span className="text-sm text-gray-500 block mt-1">
          Selecciona todas las respuestas correctas
        </span>
      </QuestionText>

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