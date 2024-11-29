'use client';

import { useState } from 'react';
import { ThemeProvider } from "next-themes";
import PDFUploader from '@/components/sections/pdf-uploader';
import QuizGenerator from '@/components/sections/quiz-generator';
import QuizQuestion from '@/components/sections/quiz-question';
import QuizResults from '@/components/sections/quiz-results';
import { Question } from '../lib/types';
import QuizIntro from '@/components/sections/quiz-intro';

export default function QuizApp() {
  const [step, setStep] = useState<'upload' | 'generate' | 'intro' | 'quiz' | 'results'>('upload');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  const handlePDFUpload = () => {
    setStep('generate');
  };

  const handleQuizGenerated = (generatedQuestions: Question[]) => {
    setQuestions(generatedQuestions);
    setUserAnswers(new Array(generatedQuestions.length).fill(null));
    setStep('intro');
  };

  const handleStartQuiz = () => {
    setStep('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('results');
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <div className="min-h-screen w-fill bg-[#0A0E12] text-white">
        <div className="container mx-auto">
          {step === 'upload' && <PDFUploader onUpload={handlePDFUpload} />}
          {step === 'generate' && <QuizGenerator onGenerate={handleQuizGenerated} />}
          {step === 'intro' && (
            <QuizIntro
              totalQuestions={questions.length}
              onStart={handleStartQuiz}
            />
          )}
          {step === 'quiz' && (
            <QuizQuestion
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              userAnswer={userAnswers[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              setStep={setStep}
              onSkip={handleSkipQuestion}
            />
          )}
          {step === 'results' && <QuizResults questions={questions} userAnswers={userAnswers} />}
        </div>
      </div>
    </ThemeProvider>
  );
}

