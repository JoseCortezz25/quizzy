import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button } from "@/components/ui/button";
import { QuizNavbar } from '../quiz-navbar';
import type { QuizQuestion } from '@/lib/types';

interface QuizQuestionProps {
  title: string;
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: number | null;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<'upload' | 'generate' | 'intro' | 'quiz' | 'results'>>;
  onSkip: () => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setStep,
  title
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      onAnswer(selectedAnswer);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setStep('results');
      }
    }
  };

  const options = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <QuizNavbar
        title={title}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
      />

      {/* Progress bar */}
      <div className="h-1 bg-gray-800 rounded mb-16">
        <div
          className="h-full bg-gradient-to-r from-[#00FF88] via-[#00FF88] to-[#0066FF] rounded"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="text-3xl font-bold mb-12">{question.question}</h2>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(index)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${selectedAnswer === index
              ? 'bg-[#00FF88]/20 border-2 border-[#00FF88]'
              : 'bg-[#1A1F25] border-2 border-transparent hover:border-[#00FF88]/50'
              }`}
          >
            <div className="flex items-center gap-4">
              <span className="size- min-w-8 min-h-8 rounded-lg bg-[#272D36] flex items-center justify-center">
                {options[index]}
              </span>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90 w-full sm:w-auto"
        >
          Comprobar
        </Button>
      </div>
    </div>
  );
}