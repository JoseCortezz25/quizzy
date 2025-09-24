"use client";

import { useState, useCallback } from "react";
import { WordMatchQuestion } from "@/lib/types";
import { QuestionText } from "../atoms/question-text";
import { MatchCard } from "../atoms/match-card";

interface WordMatchExerciseProps {
  question: WordMatchQuestion;
  onAnswer: (matches: { word: string; translation: string }[]) => void;
  userAnswer?: { word: string; translation: string }[];
}

export const WordMatchExercise = ({
  question,
  onAnswer,
  userAnswer
}: WordMatchExerciseProps) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ word: string; translation: string }[]>(
    userAnswer || []
  );

  const words = question.pairs.map(pair => pair.word);

  const [translations] = useState(() =>
    question.pairs.map(pair => pair.translation).sort(() => Math.random() - 0.5)
  );

  const handleWordClick = useCallback((word: string) => {
    if (matches.some(match => match.word === word)) return;

    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
      if (selectedTranslation) {
        const newMatch = { word, translation: selectedTranslation };
        const newMatches = [...matches, newMatch];
        setMatches(newMatches);
        setSelectedWord(null);
        setSelectedTranslation(null);

        onAnswer(newMatches);
      }
    }
  }, [selectedWord, selectedTranslation, matches, question.pairs.length, onAnswer]);

  const handleTranslationClick = useCallback((translation: string) => {
    if (matches.some(match => match.translation === translation)) return;

    if (selectedTranslation === translation) {
      setSelectedTranslation(null);
    } else {
      setSelectedTranslation(translation);
      if (selectedWord) {
        const newMatch = { word: selectedWord, translation };
        const newMatches = [...matches, newMatch];
        setMatches(newMatches);
        setSelectedWord(null);
        setSelectedTranslation(null);

        onAnswer(newMatches);
      }
    }
  }, [selectedWord, selectedTranslation, matches, question.pairs.length, onAnswer]);

  const isWordMatched = (word: string) => matches.some(match => match.word === word);
  const isTranslationMatched = (translation: string) => matches.some(match => match.translation === translation);

  return (
    <div className="space-y-4">
      <QuestionText>{question.question}</QuestionText>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
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

        <div>
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
    </div>
  );
};