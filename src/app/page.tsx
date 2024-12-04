'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from "next-themes";
import PDFUploader from '@/components/sections/pdf-uploader';
import QuizGenerator from '@/components/sections/quiz-generator';
import QuizQuestion from '@/components/sections/quiz-question';
import QuizResults from '@/components/sections/quiz-results';
import QuizIntro from '@/components/sections/quiz-intro';
import { GenerateQuiz, QuizQuestion as QuizQuestions } from '@/lib/types';
import { WelcomeModal } from '@/components/modals/welcome-modal';
import { Navbar } from '@/components/navbar';
import { ErrorModal } from '@/components/modals/error-modal';

export default function QuizApp() {
  const [step, setStep] = useState<'upload' | 'generate' | 'intro' | 'quiz' | 'results'>('upload');
  const [questions, setQuestions] = useState<QuizQuestions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [title, setTitle] = useState<string>('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [quizCount, setQuizCount] = useState(0);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    const firstVisit = !localStorage.getItem('welcomeShown');
    if (firstVisit) {
      setShowWelcomeModal(true);
      localStorage.setItem('welcomeShown', 'true');
    }
    const storedCount = localStorage.getItem('quizCount');
    setQuizCount(storedCount ? parseInt(storedCount) : 0);
    setApiKey(localStorage.getItem('apiKey'));
  }, []);

  const handlePDFUpload = () => {
    setStep('generate');
  };

  const handleQuizGenerated = (generatedQuestions: GenerateQuiz) => {
    if (quizCount >= 5 && !apiKey) {
      setErrorModalOpen(true);
      return;
    }

    setQuestions(generatedQuestions.quiz.questions);
    setTitle(generatedQuestions.title);
    setUserAnswers(new Array(generatedQuestions.quiz.questions.length).fill(null));
    setStep('intro');

    const newCount = quizCount + 1;
    setQuizCount(newCount);
    localStorage.setItem('quizCount', newCount.toString());
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0); // Reset current question index
    setUserAnswers(new Array(questions.length).fill(null)); // Reset user answers
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

  const handleOpenSettings = () => {
    // Implement settings modal logic here
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <div className="min-h-screen w-full bg-[#0A0E12] text-white">
        <Navbar quizCount={quizCount} onOpenSettings={handleOpenSettings} />
        <WelcomeModal
          open={showWelcomeModal}
          onOpenChange={setShowWelcomeModal}
        />

        <ErrorModal
          open={errorModalOpen}
          onOpenChange={setErrorModalOpen}
          setStep={setStep}
        />

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
              title={title}
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
          {step === 'results' && (
            <QuizResults
              title={title}
              questions={questions}
              userAnswers={userAnswers}
              setStep={setStep}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}