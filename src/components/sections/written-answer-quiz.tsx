"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check, X, ArrowRight } from 'lucide-react';
import { QuizNavbar } from '../quiz-navbar';
import { type QuizQuestion } from '@/lib/types';

interface WrittenAnswerQuizProps {
    questions: QuizQuestion[];
    currentQuestionIndex: number;
    onAnswer: (answer: string, isCorrect: boolean) => void;
    onNext: () => void;
    onPrevious: () => void;
    title: string;
}

export default function WrittenAnswerQuiz({
    questions,
    currentQuestionIndex,
    onAnswer,
    onNext,
    onPrevious,
    title
}: WrittenAnswerQuizProps) {
    const [userAnswer, setUserAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);


    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        setUserAnswer('');
        setIsAnswered(false);
        setIsCorrect(false);
    }, [currentQuestionIndex]);

    const checkAnswer = () => {
        const correctAnswers = Array.isArray(currentQuestion.answer)
            ? currentQuestion.answer.map(ans => ans.toLowerCase().trim())
            : [currentQuestion.answer.toLowerCase().trim()];
        const userAnswerClean = userAnswer.toLowerCase().trim();


        const isAnswerCorrect = correctAnswers.some(correct =>
            correct === userAnswerClean ||
            userAnswerClean.includes(correct) ||
            correct.includes(userAnswerClean)
        );

        setIsCorrect(isAnswerCorrect);
        setIsAnswered(true);
        onAnswer(userAnswer, isAnswerCorrect);
    };

    const handleNext = () => {
        onNext();
    };

    const handlePrevious = () => {
        onPrevious();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <QuizNavbar
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                title={title}
            />

            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto p-8 bg-gray-800 border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-white">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4">
                        <Input
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Escribe tu respuesta aquí..."
                            disabled={isAnswered}
                            className="text-lg p-4 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            onKeyPress={(e) => e.key === 'Enter' && !isAnswered && userAnswer.trim() && checkAnswer()}
                        />

                        {!isAnswered ? (
                            <Button
                                onClick={checkAnswer}
                                disabled={!userAnswer.trim()}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                Verificar Respuesta
                            </Button>
                        ) : (
                            <div className="space-y-4">
                                <div className={`p-4 rounded-lg flex items-center gap-3 ${isCorrect ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'
                                    }`}>
                                    {isCorrect ? (
                                        <Check className="w-6 h-6 text-green-400" />
                                    ) : (
                                        <X className="w-6 h-6 text-red-400" />
                                    )}
                                    <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                        {isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
                                    </span>
                                </div>

                                {!isCorrect && (
                                    <div className="p-4 bg-gray-700 rounded-lg">
                                        <p className="text-gray-300 mb-2">Respuesta correcta:</p>
                                        <p className="text-white font-semibold">
                                            {Array.isArray(currentQuestion.answer)
                                                ? currentQuestion.answer.join(', ')
                                                : currentQuestion.answer}
                                        </p>
                                    </div>
                                )}

                                {currentQuestion.explanation && (
                                    <div className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                                        <p className="text-blue-300 mb-2">Explicación:</p>
                                        <p className="text-gray-200">{currentQuestion.explanation}</p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    {currentQuestionIndex > 0 && (
                                        <Button
                                            onClick={handlePrevious}
                                            variant="outline"
                                            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                                        >
                                            Anterior
                                        </Button>
                                    )}
                                    <Button
                                        onClick={handleNext}
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                        {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}