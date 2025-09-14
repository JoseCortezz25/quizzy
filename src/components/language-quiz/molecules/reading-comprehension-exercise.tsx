"use client";

import { useState } from "react";
import { ReadingComprehensionQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface ReadingComprehensionExerciseProps {
  question: ReadingComprehensionQuestion;
  onAnswer: (selectedOption: string) => void;
  showResult?: boolean;
  userAnswer?: string;
}

export const ReadingComprehensionExercise = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer
}: ReadingComprehensionExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userAnswer || null
  );

  const handleOptionClick = (option: string) => {
    if (showResult) return;

    setSelectedOption(option);
    onAnswer(option);
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
      <QuestionText>
        Lee el siguiente texto y responde la pregunta
      </QuestionText>

      {/* Reading passage */}
      <div className="p-5 border-l-2 border-brand-dark-600/30">
        <div className="prose prose-sm max-w-none">
          {question.passage.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-xl last:mb-0 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="pt-2">
        <h3 className="text-lg font-medium mb-4">{question.question}</h3>

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