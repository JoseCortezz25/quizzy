'use client';

import { useState } from 'react';
import { Suggestion } from '@/components/prompt-textarea/suggestion';
import { LanguageQuizGenerator } from '@/components/language-quiz/organisms/language-quiz-generator';
import { LanguageQuizContainer } from '@/components/language-quiz/organisms/language-quiz-container';
import { GenerateLanguageQuiz, LanguageUserAnswer } from '@/lib/types';

const Page = () => {
  const [currentQuiz, setCurrentQuiz] = useState<GenerateLanguageQuiz | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quizResults, setQuizResults] = useState<LanguageUserAnswer[] | null>(null);

  const suggestions = [
    {
      prompt:
        'Crea un quiz sobre los phrasal verbs más comunes del inglés en el nivel B1',
      description: 'Quiz sobre los phrasal verbs'
    },
    {
      prompt: 'Crea un quiz sobre el vocabulario necesario para pedir un café',
      description: 'Quiz sobre el vocabulario para pedir un café'
    },
    {
      prompt:
        'Crea un quiz sobre el pasado simple del inglés en el nivel B1, con el vocabulario necesario para alquilar un libro en una biblioteca',
      description: 'Quiz sobre el pasado simple'
    },
    {
      prompt: 'Crea un quiz sobre conjugación de verbos en presente en español nivel A2',
      description: 'Quiz sobre conjugación de verbos'
    },
    {
      prompt: 'Crea un quiz sobre vocabulario de comida en francés para nivel A1',
      description: 'Quiz sobre vocabulario de comida'
    }
  ];

  const handleQuizGenerated = (quiz: GenerateLanguageQuiz) => {
    setCurrentQuiz(quiz);
    setQuizResults(null);
  };

  const handleQuizComplete = (answers: LanguageUserAnswer[]) => {
    setQuizResults(answers);
  };

  const handleRetryQuiz = () => {
    setQuizResults(null);
  };

  const handleCreateNewQuiz = () => {
    setCurrentQuiz(null);
    setQuizResults(null);
  };

  const handleSuggestionClick = (prompt: string) => {
    console.log('Suggestion clicked:', prompt);
  };

  // Show quiz interface if a quiz is generated
  if (currentQuiz) {
    return (
      <div className="min-h-[calc(100vh-65px)] px-6 xl:px-0 py-6">
        <div className="max-w-4xl mx-auto">
          <LanguageQuizContainer
            questions={currentQuiz.questions}
            title={currentQuiz.title}
            onComplete={handleQuizComplete}
            onRetry={handleRetryQuiz}
            onNewQuiz={handleCreateNewQuiz}
          />
        </div>
      </div>
    );
  }

  // Show main generator interface
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] px-6 xl:px-0">
      <div className="max-w-[768px] w-full mx-auto h-full flex flex-col justify-center gap-[40px]">
        <div className="w-full mb-4 space-y-2">
          <span className="text-sm text-brand-green-600 font-bold">
            Aprende idiomas con Quizzy
          </span>
          <h1 className="text-4xl md:text-[36px] font-bold">¿Qué quieres aprender hoy?</h1>
          <p className="text-gray-200/60">
            Crea quizzes personalizados con diferentes tipos de ejercicios: preguntas abiertas,
            opción múltiple, ordenar palabras, emparejar traducciones y más.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <LanguageQuizGenerator onQuizGenerated={handleQuizGenerated} />

          <div className="flex flex-wrap gap-2">
            {suggestions.map(suggestion => (
              <Suggestion
                key={suggestion.prompt}
                onClick={() => handleSuggestionClick(suggestion.prompt)}
                {...suggestion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
