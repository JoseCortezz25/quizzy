"use client";

import { useState, useCallback } from "react";
import { WordMatchQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { MatchCard } from "../atoms/match-card";
import { Button } from "@/components/ui/button";

interface WordMatchExerciseProps {
  question: WordMatchQuestion;
  onAnswer: (matches: { word: string; translation: string }[]) => void;
  showResult?: boolean;
  userAnswer?: { word: string; translation: string }[];
}

export const WordMatchExercise = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer
}: WordMatchExerciseProps) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ word: string; translation: string }[]>(
    userAnswer || []
  );

  const words = question.pairs.map(pair => pair.word);

  // Shuffle translations only once when component mounts
  const [translations] = useState(() =>
    question.pairs.map(pair => pair.translation).sort(() => Math.random() - 0.5)
  );

  const handleWordClick = useCallback((word: string) => {
    if (showResult || matches.some(match => match.word === word)) return;

    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
      if (selectedTranslation) {
        // Make a match
        const newMatch = { word, translation: selectedTranslation };
        const newMatches = [...matches, newMatch];
        setMatches(newMatches);
        setSelectedWord(null);
        setSelectedTranslation(null);

        // Auto-submit when all pairs are matched
        if (newMatches.length === question.pairs.length) {
          onAnswer(newMatches);
        } else {
          // Also submit partial matches for tracking
          onAnswer(newMatches);
        }
      }
    }
  }, [selectedWord, selectedTranslation, matches, showResult, question.pairs.length, onAnswer]);

  const handleTranslationClick = useCallback((translation: string) => {
    if (showResult || matches.some(match => match.translation === translation)) return;

    if (selectedTranslation === translation) {
      setSelectedTranslation(null);
    } else {
      setSelectedTranslation(translation);
      if (selectedWord) {
        // Make a match
        const newMatch = { word: selectedWord, translation };
        const newMatches = [...matches, newMatch];
        setMatches(newMatches);
        setSelectedWord(null);
        setSelectedTranslation(null);

        // Auto-submit when all pairs are matched
        if (newMatches.length === question.pairs.length) {
          onAnswer(newMatches);
        } else {
          // Also submit partial matches for tracking
          onAnswer(newMatches);
        }
      }
    }
  }, [selectedWord, selectedTranslation, matches, showResult, question.pairs.length, onAnswer]);

  const handleReset = () => {
    const resetMatches: { word: string; translation: string }[] = [];
    setMatches(resetMatches);
    setSelectedWord(null);
    setSelectedTranslation(null);

    // Auto-submit reset state
    onAnswer(resetMatches);
  };

  const isWordMatched = (word: string) => matches.some(match => match.word === word);
  const isTranslationMatched = (translation: string) => matches.some(match => match.translation === translation);

  // const getMatchStatus = (word: string, translation: string) => {
  //   if (!showResult) return { correct: false, incorrect: false };

  //   const userMatch = matches.find(m => m.word === word && m.translation === translation);
  //   const correctMatch = question.pairs.find(p => p.word === word && p.translation === translation);

  //   return {
  //     correct: !!userMatch && !!correctMatch,
  //     incorrect: !!userMatch && !correctMatch
  //   };
  // };

  return (
    <div className="space-y-4">
      <QuestionText>
        {question.question}
        <span className="text-sm text-gray-500 block mt-1">
          Empareja cada palabra con su traducción correcta
        </span>
      </QuestionText>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Words column */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-center">Palabras</h3>
          <div className="space-y-2">
            {words.map((word, index) => {
              const matched = isWordMatched(word);
              return (
                <MatchCard
                  key={index}
                  type="word"
                  onClick={() => handleWordClick(word)}
                  selected={selectedWord === word}
                  matched={matched}
                >
                  {word}
                </MatchCard>
              );
            })}
          </div>
        </div>

        {/* Translations column */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-center">Traducciones</h3>
          <div className="space-y-2">
            {translations.map((translation, index) => {
              const matched = isTranslationMatched(translation);

              return (
                <MatchCard
                  key={index}
                  type="translation"
                  onClick={() => handleTranslationClick(translation)}
                  selected={selectedTranslation === translation}
                  matched={matched}
                >
                  {translation}
                </MatchCard>
              );
            })}
          </div>
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

      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Explicación:</p>
          <p className="text-gray-600 text-sm">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};