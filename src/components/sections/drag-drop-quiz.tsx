"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizNavbar } from '../quiz-navbar';
import { type QuizQuestion } from '@/lib/types';

interface DragDropQuizProps {
    questions: QuizQuestion[];
    currentQuestionIndex: number;
    onAnswer: (isCorrect: boolean, selectedWords: string[]) => void;
    onNext: () => void;
    onPrevious: () => void;
    title: string;
}

interface WordBank {
    id: string;
    word: string;
    isCorrect: boolean;
    isUsed: boolean;
}

export default function DragDropQuiz({
    questions,
    currentQuestionIndex,
    onAnswer,
    onNext,
    onPrevious,
    title
}: DragDropQuizProps) {
    const [wordBank, setWordBank] = useState<WordBank[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [draggedWord, setDraggedWord] = useState<string | null>(null);

    const currentQuestion = questions[currentQuestionIndex];


    useEffect(() => {
        const correctWords = Array.isArray(currentQuestion.answer) ? currentQuestion.answer : [currentQuestion.answer];
        const allOptions = currentQuestion.options;
        const incorrectWords = allOptions.filter(option => !correctWords.includes(option));


        const extraWords = ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no'];
        const shuffledExtras = extraWords.sort(() => 0.5 - Math.random()).slice(0, 2);

        const allWords = [...correctWords, ...incorrectWords, ...shuffledExtras];
        const shuffledWords = allWords.sort(() => 0.5 - Math.random());

        const bankWords: WordBank[] = shuffledWords.map((word, index) => ({
            id: `word-${index}`,
            word,
            isCorrect: correctWords.includes(word),
            isUsed: false
        }));

        setWordBank(bankWords);
        setSelectedWords([]);
        setIsAnswered(false);
        setIsCorrect(false);
    }, [currentQuestion]);

    const handleDragStart = (e: React.DragEvent, word: string) => {
        setDraggedWord(word);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedWord && !selectedWords.includes(draggedWord)) {
            setSelectedWords(prev => [...prev, draggedWord]);
            setWordBank(prev => prev.map(word =>
                word.word === draggedWord ? { ...word, isUsed: true } : word
            ));
        }
        setDraggedWord(null);
    };

    const handleWordClick = (word: string) => {
        if (!isAnswered && !selectedWords.includes(word)) {
            setSelectedWords(prev => [...prev, word]);
            setWordBank(prev => prev.map(w =>
                w.word === word ? { ...w, isUsed: true } : w
            ));
        }
    };

    const removeWord = (wordToRemove: string) => {
        if (!isAnswered) {
            setSelectedWords(prev => prev.filter(word => word !== wordToRemove));
            setWordBank(prev => prev.map(word =>
                word.word === wordToRemove ? { ...word, isUsed: false } : word
            ));
        }
    };

    const checkAnswer = () => {
        const correctAnswers = currentQuestion.answer;
        const isAnswerCorrect = selectedWords.length === correctAnswers.length &&
            selectedWords.every(word => correctAnswers.includes(word));

        setIsCorrect(isAnswerCorrect);
        setIsAnswered(true);
        onAnswer(isAnswerCorrect, selectedWords);
    };

    const resetAnswer = () => {
        setSelectedWords([]);
        setWordBank(prev => prev.map(word => ({ ...word, isUsed: false })));
    };

    const handleNext = () => {
        setSelectedWords([]);
        setIsAnswered(false);
        setIsCorrect(false);
        onNext();
    };

    const handlePrevious = () => {
        setSelectedWords([]);
        setIsAnswered(false);
        setIsCorrect(false);
        onPrevious();
    };


    const questionParts = currentQuestion.question.split('_____');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <QuizNavbar
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                title={title}
            />

            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-4xl mx-auto p-8 bg-gray-800 border-gray-700">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-white">
                            Completa la oración arrastrando las palabras correctas:
                        </h2>

                        <div className="text-lg p-6 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 min-h-[80px] flex items-center">
                            <div className="flex flex-wrap items-center gap-2">
                                {questionParts.map((part, index) => (
                                    <span key={index} className="text-gray-200">
                                        {part}
                                        {index < questionParts.length - 1 && (
                                            <span
                                                className="inline-block min-w-[100px] min-h-[40px] mx-2 p-2 bg-gray-600 border-2 border-dashed border-gray-500 rounded text-center"
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop}
                                            >
                                                {selectedWords[index] && (
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded cursor-pointer ${isAnswered
                                                            ? (currentQuestion.answer.includes(selectedWords[index])
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-red-600 text-white')
                                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                                            }`}
                                                        onClick={() => removeWord(selectedWords[index])}
                                                    >
                                                        {selectedWords[index]}
                                                    </span>
                                                )}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-white">Palabras disponibles:</h3>
                        <div className="flex flex-wrap gap-3 p-4 bg-gray-700 rounded-lg min-h-[80px]">
                            {wordBank.filter(word => !word.isUsed).map((word) => (
                                <span
                                    key={word.id}
                                    draggable={!isAnswered}
                                    onDragStart={(e) => handleDragStart(e, word.word)}
                                    onClick={() => handleWordClick(word.word)}
                                    className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${isAnswered
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                                        }`}
                                >
                                    {word.word}
                                </span>
                            ))}
                        </div>
                    </div>


                    <div className="space-y-4">
                        {!isAnswered ? (
                            <div className="flex gap-3">
                                <Button
                                    onClick={resetAnswer}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Reiniciar
                                </Button>
                                <Button
                                    onClick={checkAnswer}
                                    disabled={selectedWords.length === 0}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    Verificar Respuesta
                                </Button>
                            </div>
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
                                        <p className="text-white font-semibold">{Array.isArray(currentQuestion.answer) ? currentQuestion.answer.join(', ') : currentQuestion.answer}</p>
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
                                            className="flex-1"
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