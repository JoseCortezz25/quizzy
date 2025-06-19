'use client';
import { useEffect, useState } from 'react';
import { ThemeProvider } from "next-themes";
import PDFUploader from '@/components/sections/pdf-uploader';
import QuizGenerator from '@/components/sections/quiz-generator';
import QuizQuestion from '@/components/sections/quiz-question';
import QuizResults from '@/components/sections/quiz-results';
import QuizIntro from '@/components/sections/quiz-intro';
import { GenerateQuiz, QuizQuestion as QuizQuestions, UserAnswer } from '@/lib/types';
import { WelcomeModal } from '@/components/modals/welcome-modal';
import { Navbar } from '@/components/navbar';
import { ErrorModal } from '@/components/modals/error-modal';
import WrittenAnswerQuiz from '@/components/sections/written-answer-quiz';
import DragDropQuiz from '@/components/sections/drag-drop-quiz';



export default function QuizApp() {
  const [step, setStep] = useState<'upload' | 'generate' | 'intro' | 'quiz' | 'results'>('upload');
  const [questions, setQuestions] = useState<QuizQuestions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [title, setTitle] = useState<string>('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [quizCount, setQuizCount] = useState(0);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [quizMode, setQuizMode] = useState<'multiple-choice' | 'written' | 'drag-drop'>('multiple-choice');


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
    setUserAnswers(generatedQuestions.quiz.questions.map((question, index) => ({
      index: index,
      question: question.question,
      selectedOptions: [],
      isCorrect: false
    })));
    setStep('intro');

    const newCount = quizCount + 1;
    setQuizCount(newCount);
    localStorage.setItem('quizCount', newCount.toString());
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setStep('quiz');
  };

  const handleQuestionAnswer = (isCorrect: number, selectedOptions: string[]) => {
    const newUserAnswers = [...userAnswers];

    const currentQuestion = newUserAnswers[currentQuestionIndex];
    currentQuestion.isCorrect = !!isCorrect;
    currentQuestion.selectedOptions = selectedOptions;

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

  const renderQuizComponent = () => {
    switch (quizMode) {
      case 'written':
        return (
          <WrittenAnswerQuiz
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswer={(answer: string, isCorrect: boolean) => handleQuestionAnswer(isCorrect ? 1 : 0, [answer])}
            onNext={() => {/* lógica para siguiente pregunta */ }}
            onPrevious={() => {/* lógica para pregunta anterior */ }}
            title={title}
          />
        );
      case 'drag-drop':
        return (
          <DragDropQuiz
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswer={(isCorrect: boolean, selectedWords: string[]) => handleQuestionAnswer(isCorrect ? 1 : 0, selectedWords)}
            onNext={() => {/* lógica para siguiente pregunta */ }}
            onPrevious={() => {/* lógica para pregunta anterior */ }}
            title={title}
          />
        );
      default:
        return (
          <QuizQuestion
            title={title}
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleQuestionAnswer}
            onNext={handleNextQuestion}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setStep={setStep}
            onSkip={handleSkipQuestion}
          />
        );
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <div className="min-h-screen w-full bg-[#0A0E12] text-white">
        <Navbar quizCount={quizCount} />
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
              quizMode={quizMode}
              onQuizModeChange={setQuizMode}
            />
          )}
          {step === 'quiz' && renderQuizComponent()}
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



