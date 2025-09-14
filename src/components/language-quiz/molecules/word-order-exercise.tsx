"use client";

import { useState, useCallback } from "react";
import { WordOrderQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { WordChip } from "../atoms/word-chip";
import { Button } from "@/components/ui/button";
import { WordOrderContainer } from "../atoms/word-order-container";

interface WordOrderExerciseProps {
  question: WordOrderQuestion;
  onAnswer: (orderedWords: string[]) => void;
  showResult?: boolean;
  userAnswer?: string[];
}

export const WordOrderExercise = ({
  question,
  onAnswer,
  showResult = false,
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
    if (showResult) return;

    const newAvailableWords = availableWords.filter(w => w !== word);
    const newOrderedWords = [...orderedWords, word];

    setAvailableWords(newAvailableWords);
    setOrderedWords(newOrderedWords);

    // Auto-submit when all words are ordered
    if (newOrderedWords.length === question.words.length) {
      onAnswer(newOrderedWords);
    }
  }, [showResult, availableWords, orderedWords, question.words.length, onAnswer]);

  const moveWordToAvailable = useCallback((word: string, index: number) => {
    if (showResult) return;

    const newOrderedWords = orderedWords.filter((_, i) => i !== index);
    const newAvailableWords = [...availableWords, word];

    setOrderedWords(newOrderedWords);
    setAvailableWords(newAvailableWords);

    // Auto-submit updated order
    onAnswer(newOrderedWords);
  }, [showResult, orderedWords, availableWords, onAnswer]);

  const handleReset = () => {
    const resetOrderedWords: string[] = [];
    const resetAvailableWords = [...question.words].sort(() => Math.random() - 0.5);

    setOrderedWords(resetOrderedWords);
    setAvailableWords(resetAvailableWords);

    // Auto-submit reset state
    onAnswer(resetOrderedWords);
  };

  const isCorrect = showResult &&
    orderedWords.length === question.correctOrder.length &&
    orderedWords.every((word, index) => word === question.correctOrder[index]);

  return (
    <div className="space-y-4">
      <QuestionText>
        {question.question}
        <span className="text-sm text-gray-500 block mt-1">
          Ordena las palabras para formar una frase correcta
        </span>
      </QuestionText>

      <div className="space-y-4">
        {/* Ordered words area */}
        <WordOrderContainer
          orderedWords={orderedWords}
          moveWordToAvailable={moveWordToAvailable}
          showResult={showResult}
          isCorrect={isCorrect}
        />

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

      {!showResult && (
        <div className="flex justify-end">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
          >
            Reiniciar
          </Button>
        </div>
      )}

      {showResult && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Orden correcto:</p>
          <p className="text-gray-700">{question.correctOrder.join(' ')}</p>
          {question.explanation && (
            <div className="mt-2">
              <p className="text-sm font-medium">Explicación:</p>
              <p className="text-gray-600 text-sm">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};