"use client";

import { useState } from "react";
import { WordMeaningQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { OptionButton } from "../atoms/option-button";

interface WordMeaningExerciseProps {
  question: WordMeaningQuestion;
  onAnswer: (selectedOption: string) => void;
  showResult?: boolean;
  userAnswer?: string;
}

export const WordMeaningExercise = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer
}: WordMeaningExerciseProps) => {
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
      <QuestionText>
        {question.question}
        <span className="text-sm text-gray-500 block mt-1">
          ¿Qué significa la palabra destacada en el contexto de esta frase?
        </span>
      </QuestionText>

      <div className="p-4 border-l-2 border-brand-dark-600/30">
        <p className="text-xl leading-relaxed">
          {highlightWord(question.sentence, question.highlightedWord)}
        </p>
      </div>

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