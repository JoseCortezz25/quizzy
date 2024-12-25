import { useState, Dispatch, SetStateAction, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { QuizNavbar } from '../quiz-navbar';
import { QuestionType, type QuizQuestion } from '@/lib/types';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  title: string;
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number, selectedOptions: string[]) => void;
  onNext: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<'upload' | 'generate' | 'intro' | 'quiz' | 'results'>>;
  onSkip: () => void;
}

type SelectedOptions = {
  index: number;
  option: string;
};

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
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions[]>([]);

  const isButtonEnabled = useMemo(() => {
    return selectedOptions.length === question.answer.length;
  }, [selectedOptions.length, question.answer.length]);

  const handleSelectAnswer = (index: number, option: string) => {
    if (question.type === QuestionType.MultipleChoice) {
      setSelectedOptions(prev => {
        const newSet = new Set(prev);
        const existingOption = Array.from(newSet).find(item => item.index === index);

        if (existingOption) {
          newSet.delete(existingOption);
          return Array.from(newSet);
        }

        newSet.add({ index, option });
        return Array.from(newSet);
      });
      return;
    }

    // Single choice
    setSelectedOptions([{ index, option }]);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOptions.every((option) => {
      return question.answer.includes(option.option);
    });

    const selectedOptionsText = selectedOptions.map((option) => option.option);

    // 1 for correct, 0 for incorrect
    onAnswer(isCorrect ? 1 : 0, selectedOptionsText);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
    } else {
      setStep('results');
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
          className="quiz-progressbar"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="question-item__title">{question.question}</h2>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(index, option)}
            className={cn(
              "question-item",
              selectedOptions.find((item) => item.index === index)
                ? "question-item__selected" : "question-item__default"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="question-item__index">
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
          disabled={!isButtonEnabled}
          className="btn-question"
        >
          Comprobar
        </Button>
      </div>
    </div>
  );
}