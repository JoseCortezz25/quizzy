"use client";

import { useState } from "react";
import { ReadingComprehensionQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface ReadingComprehensionExerciseProps {
  question: ReadingComprehensionQuestion;
  onAnswer: (selectedOption: string) => void;
  userAnswer?: string;
}

export const ReadingComprehensionExercise = ({
  question,
  onAnswer,
  userAnswer
}: ReadingComprehensionExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userAnswer || null
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  return (
    <div className="space-y-4">
      <div className="p-5 border-l-2 border-brand-dark-600/30">
        <div className="prose prose-sm max-w-none">
          {question.passage.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-xl last:mb-0 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <QuestionText>{question.question}</QuestionText>

        <div className="space-y-3 mt-4">
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
    </div>
  );
};