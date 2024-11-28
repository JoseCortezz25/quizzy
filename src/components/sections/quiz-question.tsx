import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { Question } from '../../lib/types';

interface QuizQuestionProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  userAnswer: number | null
  onAnswer: (answerIndex: number) => void
  onNext: () => void
  onSkip: () => void
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setStep: React.Dispatch<React.SetStateAction<'quiz' | 'results'>>;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswer,
  onNext,
  onSkip,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setStep
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
    <div className="max-w-4xl mx-auto pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
            {/* <Brain className="w-4 h-4 text-[#00FF88]" /> */}
          </div>
          <span className="text-gray-400">Curso de Agentes AI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">
            Pregunta {questionNumber} de {totalQuestions}
          </span>
          <button className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-800 rounded mb-16">
        <div
          className="h-full bg-gradient-to-r from-[#00FF88] to-[#00FF88]/50 rounded"
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
              <span className="w-8 h-8 rounded-lg bg-[#272D36] flex items-center justify-center">
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
          variant="outline"
          onClick={onSkip}
          className="border-gray-700 text-gray-400 hover:bg-gray-800"
        >
          Saltar pregunta
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
        >
          Comprobar
        </Button>
      </div>
    </div>
  );
}

