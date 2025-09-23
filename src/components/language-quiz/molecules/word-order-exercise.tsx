"use client";

import { useState, useCallback } from "react";
import { WordOrderQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { WordChip } from "../atoms/word-chip";

interface WordOrderExerciseProps {
  question: WordOrderQuestion;
  onAnswer: (orderedWords: string[]) => void;
  userAnswer?: string[];
}

export const WordOrderExercise = ({
  question,
  onAnswer,
  userAnswer
}: WordOrderExerciseProps) => {
  const [orderedWords, setOrderedWords] = useState<string[]>(
    userAnswer || []
  );
  const [availableWords, setAvailableWords] = useState<string[]>(
    userAnswer ?
      question.words.filter(word => !userAnswer.includes(word)) :
      [...question.words].sort(() => Math.random() - 0.5)
  );

  const moveWordToOrder = useCallback((word: string) => {
    const newAvailableWords = availableWords.filter(w => w !== word);
    const newOrderedWords = [...orderedWords, word];

    setAvailableWords(newAvailableWords);
    setOrderedWords(newOrderedWords);

    if (newOrderedWords.length === question.words.length) {
      onAnswer(newOrderedWords);
    }
  }, [availableWords, orderedWords, question.words.length, onAnswer]);

  const moveWordToAvailable = useCallback((word: string, index: number) => {
    const newOrderedWords = orderedWords.filter((_, i) => i !== index);
    const newAvailableWords = [...availableWords, word];

    setOrderedWords(newOrderedWords);
    setAvailableWords(newAvailableWords);

    onAnswer(newOrderedWords);
  }, [orderedWords, availableWords, onAnswer]);

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <div className="space-y-4">
        {/* Ordered words area */}
        <div className="min-h-[50px] p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {orderedWords.map((word, index) => (
              <WordChip
                key={`ordered-${index}`}
                onClick={() => moveWordToAvailable(word, index)}
              >
                {word}
              </WordChip>
            ))}
            {orderedWords.length === 0 && (
              <p className="text-gray-500 text-sm">Arrastra las palabras aquí para ordenarlas</p>
            )}
          </div>
        </div>

        {/* Available words */}
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <WordChip
              key={`available-${index}`}
              onClick={() => moveWordToOrder(word)}
            >
              {word}
            </WordChip>
          ))}
        </div>
      </div>
    </div>
  );
};