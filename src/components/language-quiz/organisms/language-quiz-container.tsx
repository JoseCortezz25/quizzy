"use client";

import { useState } from "react";
import {
  LanguageQuestion,
  LanguageUserAnswer,
  QuestionTypeLanguage,
  OpenEndedQuestion,
  MultipleChoiceSingleQuestion,
  MultipleChoiceMultipleQuestion,
  WordOrderQuestion,
  WordMeaningQuestion,
  WordMatchQuestion,
  ReadingComprehensionQuestion
} from "@/lib/types";
import { OpenEndedExercise } from "../molecules/open-ended-exercise";
import { MultipleChoiceSingleExercise } from "../molecules/multiple-choice-single-exercise";
import { MultipleChoiceMultipleExercise } from "../molecules/multiple-choice-multiple-exercise";
import { WordOrderExercise } from "../molecules/word-order-exercise";
import { WordMeaningExercise } from "../molecules/word-meaning-exercise";
import { WordMatchExercise } from "../molecules/word-match-exercise";
import { ReadingComprehensionExercise } from "../molecules/reading-comprehension-exercise";
import { LanguageQuizResults } from "./language-quiz-results";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LanguageQuizContainerProps {
  questions: LanguageQuestion[];
  title: string;
  onComplete: (answers: LanguageUserAnswer[]) => void;
  onRetry?: () => void;
  onNewQuiz?: () => void;
}

export const LanguageQuizContainer = ({
  questions,
  title,
  onComplete,
  onRetry,
  onNewQuiz
}: LanguageQuizContainerProps) => {
  // Helpers de tipos para estrechar uniones en tiempo de ejecución
  const isStringArray = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every(v => typeof v === "string");

  const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

  const isWordMatchArray = (
    value: unknown
  ): value is { word: string; translation: string }[] =>
    Array.isArray(value) &&
    value.every(v =>
      isRecord(v) && typeof v.word === "string" && typeof v.translation === "string"
    );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<LanguageUserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (
    answer: string | string[] | { word: string; translation: string }[]
  ) => {
    const newAnswer: LanguageUserAnswer = {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      isCorrect: checkAnswer(currentQuestion, answer),
      ...getAnswerByType(currentQuestion.type, answer)
    } as LanguageUserAnswer;

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, newAnswer];
    });
  };

  const checkAnswer = (
    question: LanguageQuestion,
    answer: string | string[] | { word: string; translation: string }[]
  ): boolean => {
    switch (question.type) {
      case QuestionTypeLanguage.OpenEnded:
        const openQ = question as OpenEndedQuestion;
        return (
          typeof answer === "string" &&
          answer.toLowerCase().trim() === openQ.expectedAnswer.toLowerCase().trim()
        );

      case QuestionTypeLanguage.MultipleChoiceSingle:
        const singleQ = question as MultipleChoiceSingleQuestion;
        const correctSingle = singleQ.options.find(opt => opt.isCorrect)?.option;
        return isStringArray(answer) && answer[0] === correctSingle;

      case QuestionTypeLanguage.MultipleChoiceMultiple:
        const multiQ = question as MultipleChoiceMultipleQuestion;
        const correctMultiple = multiQ.options.filter(opt => opt.isCorrect).map(opt => opt.option);
        return (
          isStringArray(answer) &&
          answer.length === correctMultiple.length &&
          answer.every(ans => correctMultiple.includes(ans))
        );

      case QuestionTypeLanguage.WordOrder:
        const orderQ = question as WordOrderQuestion;
        return isStringArray(answer) && JSON.stringify(answer) === JSON.stringify(orderQ.correctOrder);

      case QuestionTypeLanguage.WordMeaning:
        const meaningQ = question as WordMeaningQuestion;
        const correctMeaning = meaningQ.options.find(opt => opt.isCorrect)?.option;
        return typeof answer === "string" && answer === correctMeaning;

      case QuestionTypeLanguage.WordMatch:
        const matchQ = question as WordMatchQuestion;
        if (!isWordMatchArray(answer)) return false;
        if (answer.length !== matchQ.pairs.length) return false;
        // Comprobar que cada par de respuesta coincide exactamente con un par esperado (sin importar el orden)
        const allMatched = matchQ.pairs.every(pair =>
          answer.some(match => match.word === pair.word && match.translation === pair.translation)
        );
        // Además, asegurarse que no hay pares extra en la respuesta
        const noExtra = answer.every(match =>
          matchQ.pairs.some(pair => pair.word === match.word && pair.translation === match.translation)
        );
        return allMatched && noExtra;

      case QuestionTypeLanguage.ReadingComprehension:
        const readingQ = question as ReadingComprehensionQuestion;
        const correctReading = readingQ.options.find(opt => opt.isCorrect)?.option;
        return typeof answer === "string" && answer === correctReading;

      default:
        return false;
    }
  };

  const getAnswerByType = (
    type: QuestionTypeLanguage,
    answer: string | string[] | { word: string; translation: string }[]
  ) => {
    switch (type) {
      case QuestionTypeLanguage.OpenEnded:
        return { answer: typeof answer === "string" ? answer : "" };
      case QuestionTypeLanguage.MultipleChoiceSingle:
      case QuestionTypeLanguage.MultipleChoiceMultiple:
        return { selectedOptions: isStringArray(answer) ? answer : typeof answer === "string" ? [answer] : [] };
      case QuestionTypeLanguage.WordOrder:
        return { orderedWords: isStringArray(answer) ? answer : [] };
      case QuestionTypeLanguage.WordMeaning:
      case QuestionTypeLanguage.ReadingComprehension:
        return { selectedOption: typeof answer === "string" ? answer : "" };
      case QuestionTypeLanguage.WordMatch:
        return {
          matches: isWordMatchArray(answer)
            ? answer
            : []
        };
      default:
        return {};
    }
  };

  const renderQuestion = () => {
    const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

    switch (currentQuestion.type) {
      case QuestionTypeLanguage.OpenEnded:
        return (
          <OpenEndedExercise
            question={currentQuestion as OpenEndedQuestion}
            onAnswer={handleAnswer}
            userAnswer={currentAnswer?.type === QuestionTypeLanguage.OpenEnded ? currentAnswer.answer : undefined}
          />
        );

      case QuestionTypeLanguage.MultipleChoiceSingle:
        return (
          <MultipleChoiceSingleExercise
            question={currentQuestion as MultipleChoiceSingleQuestion}
            onAnswer={handleAnswer}
            userAnswer={currentAnswer?.type === QuestionTypeLanguage.MultipleChoiceSingle ? currentAnswer.selectedOptions : undefined}
          />
        );

      case QuestionTypeLanguage.MultipleChoiceMultiple:
        return (
          <MultipleChoiceMultipleExercise
            question={currentQuestion as MultipleChoiceMultipleQuestion}
            onAnswer={handleAnswer}
            userAnswer={currentAnswer?.type === QuestionTypeLanguage.MultipleChoiceMultiple ? currentAnswer.selectedOptions : undefined}
          />
        );

      case QuestionTypeLanguage.WordOrder:
        return (
          <WordOrderExercise
            question={currentQuestion as WordOrderQuestion}
            onAnswer={handleAnswer}
            userAnswer={currentAnswer?.type === QuestionTypeLanguage.WordOrder ? currentAnswer.orderedWords : undefined}
          />
        );

      case QuestionTypeLanguage.WordMeaning:
        return (
          <WordMeaningExercise
            question={currentQuestion as WordMeaningQuestion}
            onAnswer={handleAnswer}
            userAnswer={currentAnswer?.type === QuestionTypeLanguage.WordMeaning ? currentAnswer.selectedOption : undefined}
          />
        );

      case QuestionTypeLanguage.WordMatch:
        return (
          <WordMatchExercise
            question={currentQuestion as WordMatchQuestion}
            onAnswer={(matches) => handleAnswer(matches)}
            userAnswer={currentAnswer?.type === QuestionTypeLanguage.WordMatch ? currentAnswer.matches : undefined}
          />
        );

      case QuestionTypeLanguage.ReadingComprehension:
        return (
          <ReadingComprehensionExercise
            question={currentQuestion as ReadingComprehensionQuestion}
            onAnswer={handleAnswer}
            userAnswer={currentAnswer?.type === QuestionTypeLanguage.ReadingComprehension ? currentAnswer.selectedOption : undefined}
          />
        );

      default:
        return <div>Tipo de pregunta no soportado</div>;
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    onComplete(answers);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    if (onRetry) onRetry();
  };

  const handleNewQuiz = () => {
    if (onNewQuiz) onNewQuiz();
  };

  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
  const canProceed = !!currentAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Show results view
  if (showResults) {
    return (
      <LanguageQuizResults
        questions={questions}
        userAnswers={answers}
        title={title}
        onRetry={handleRetry}
        onNewQuiz={handleNewQuiz}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto mx:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="mb-8">
        {renderQuestion()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex gap-2">
          {!showResults && !isLastQuestion && (
            <Button
              onClick={goToNextQuestion}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}

          {!showResults && isLastQuestion && (
            <Button
              onClick={handleFinishQuiz}
              disabled={answers.length !== questions.length}
              className="flex items-center gap-2"
            >
              Finalizar Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};