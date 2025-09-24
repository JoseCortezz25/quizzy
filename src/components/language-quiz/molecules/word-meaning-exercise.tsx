"use client";

import { useState } from "react";
import { WordMeaningQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface WordMeaningExerciseProps {
  question: WordMeaningQuestion;
  onAnswer: (selectedOption: string) => void;
  userAnswer?: string;
}

export const WordMeaningExercise = ({
  question,
  onAnswer,
  userAnswer
}: WordMeaningExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    userAnswer || null
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  const highlightWord = (sentence: string, word: string) => {
    const regex = new RegExp(`(${word})`, 'gi');
    const parts = sentence.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-brand-green-600/20 font-semibold px-1 rounded">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <div className="p-4 border-l-2 border-brand-dark-600/30">
        <p className="text-xl leading-relaxed">
          {highlightWord(question.sentence, question.highlightedWord)}
        </p>
      </div>

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