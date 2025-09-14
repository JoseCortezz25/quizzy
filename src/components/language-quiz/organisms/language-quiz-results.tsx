"use client";

import { Check, Sparkles, X, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { LanguageQuestion, LanguageUserAnswer, MultipleChoiceMultipleQuestion, MultipleChoiceSingleQuestion, OpenEndedQuestion, QuestionTypeLanguage, ReadingComprehensionQuestion, WordMatchQuestion, WordMeaningQuestion, WordOrderQuestion } from '@/lib/types';
import JSConfetti from 'js-confetti';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LanguageQuizResultsProps {
  questions: LanguageQuestion[];
  userAnswers: LanguageUserAnswer[];
  title: string;
  onRetry: () => void;
  onNewQuiz: () => void;
}

export const LanguageQuizResults = ({
  questions,
  userAnswers,
  title,
  onRetry,
  onNewQuiz
}: LanguageQuizResultsProps) => {
  const rightAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
  const percentage = ((rightAnswers / questions.length) * 100).toFixed(1);

  const canvas = document.querySelector('#language-quiz-results') as HTMLCanvasElement;
  const jsConfetti = new JSConfetti({ canvas });

  const showConfetti = () => {
    jsConfetti.addConfetti({
      emojis: ['🎉', '🎊', '🎈', '🥳', '👏', '🌟', '✨']
    });
  };

  const shareOnTwitter = () => {
    const url = 'https://twitter.com/intent/tweet';
    const text = `¡He completado un quiz de idiomas con ${percentage}% de aciertos! 🎉🎉🎉

Obtuve ${rightAnswers} respuestas correctas de ${questions.length} preguntas en "${title}".

#QuizzyLanguage #AprendizajeDeIdiomas`;

    const hashtags = 'quizzy,languages';
    const via = 'josecortezz16';
    const twitterUrl = `${url}?text=${encodeURIComponent(text)}&hashtags=${hashtags}&via=${via}`;
    window.open(twitterUrl, '_blank');
  };

  // const getPerformanceMessage = () => {
  //   const score = parseFloat(percentage);
  //   if (score >= 90) return { message: "¡Excelente! 🌟", color: "text-green-500" };
  //   if (score >= 80) return { message: "¡Muy bien! 👏", color: "text-green-400" };
  //   if (score >= 70) return { message: "¡Buen trabajo! 👍", color: "text-yellow-500" };
  //   if (score >= 60) return { message: "Puedes mejorar 💪", color: "text-orange-500" };
  //   return { message: "Sigue practicando 📚", color: "text-red-500" };
  // };

  const getExerciseTypeLabel = (type: QuestionTypeLanguage) => {
    switch (type) {
      case QuestionTypeLanguage.OpenEnded:
        return "Pregunta Abierta";
      case QuestionTypeLanguage.MultipleChoiceSingle:
        return "Opción Múltiple";
      case QuestionTypeLanguage.MultipleChoiceMultiple:
        return "Selección Múltiple";
      case QuestionTypeLanguage.WordOrder:
        return "Ordenar Palabras";
      case QuestionTypeLanguage.WordMeaning:
        return "Significado de Palabra";
      case QuestionTypeLanguage.WordMatch:
        return "Emparejar Palabras";
      case QuestionTypeLanguage.ReadingComprehension:
        return "Comprensión Lectora";
      default:
        return "Ejercicio";
    }
  };

  const renderUserAnswer = (question: LanguageQuestion, userAnswer: LanguageUserAnswer) => {
    switch (userAnswer.type) {
      case QuestionTypeLanguage.OpenEnded:
        if ('answer' in userAnswer) {
          return (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Tu respuesta:</p>
              <p className="text-gray-300">{userAnswer.answer}</p>
              <p className="text-sm text-gray-500">Respuesta esperada:</p>
              <p className="text-green-400">{(question as OpenEndedQuestion).expectedAnswer}</p>
            </div>
          );
        }
        break;

      case QuestionTypeLanguage.MultipleChoiceSingle:
      case QuestionTypeLanguage.MultipleChoiceMultiple:
        if ('selectedOptions' in userAnswer) {
          const correctOptions = (question as MultipleChoiceSingleQuestion | MultipleChoiceMultipleQuestion).options.filter((opt: { option: string; isCorrect: boolean }) => opt.isCorrect).map((opt: { option: string; isCorrect: boolean }) => opt.option);
          return (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Tus respuestas:</p>
              <div className="space-y-1">
                {userAnswer.selectedOptions.map((option, idx) => (
                  <p key={idx} className={cn(
                    "text-sm px-2 py-1 rounded",
                    correctOptions.includes(option) ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
                  )}>
                    {option}
                  </p>
                ))}
              </div>
              {!userAnswer.isCorrect && (
                <div>
                  <p className="text-sm text-gray-500 mt-2">Respuestas correctas:</p>
                  <div className="space-y-1">
                    {correctOptions.map((option, idx) => (
                      <p key={idx} className="text-sm px-2 py-1 rounded bg-green-900 text-green-200">
                        {option}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }
        break;

      case QuestionTypeLanguage.WordOrder:
        if ('orderedWords' in userAnswer) {
          const correctOrder = (question as WordOrderQuestion).correctOrder;
          return (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Tu orden:</p>
              <p className="text-gray-300">{userAnswer.orderedWords.join(' ')}</p>
              {!userAnswer.isCorrect && (
                <>
                  <p className="text-sm text-gray-500">Orden correcto:</p>
                  <p className="text-green-400">{correctOrder.join(' ')}</p>
                </>
              )}
            </div>
          );
        }
        break;

      case QuestionTypeLanguage.WordMeaning:
      case QuestionTypeLanguage.ReadingComprehension:
        if ('selectedOption' in userAnswer) {
          const correctOption = (question as WordMeaningQuestion | ReadingComprehensionQuestion).options.find((opt: { option: string; isCorrect: boolean }) => opt.isCorrect)?.option;
          return (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Tu respuesta:</p>
              <p className={cn(
                "px-2 py-1 rounded text-sm",
                userAnswer.isCorrect ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
              )}>
                {userAnswer.selectedOption}
              </p>
              {!userAnswer.isCorrect && (
                <>
                  <p className="text-sm text-gray-500">Respuesta correcta:</p>
                  <p className="px-2 py-1 rounded text-sm bg-green-900 text-green-200">
                    {correctOption}
                  </p>
                </>
              )}
            </div>
          );
        }
        break;

      case QuestionTypeLanguage.WordMatch:
        if ('matches' in userAnswer) {
          const correctPairs = (question as WordMatchQuestion).pairs;
          return (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Tus emparejamientos:</p>
              <div className="grid grid-cols-1 gap-1">
                {userAnswer.matches.map((match, idx) => {
                  const isCorrect = correctPairs.some((pair: { word: string; translation: string }) => pair.word === match.word && pair.translation === match.translation);
                  return (
                    <p key={idx} className={cn(
                      "text-sm px-2 py-1 rounded",
                      isCorrect ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
                    )}>
                      {match.word} → {match.translation}
                    </p>
                  );
                })}
              </div>
              {!userAnswer.isCorrect && (
                <>
                  <p className="text-sm text-gray-500 mt-2">Emparejamientos correctos:</p>
                  <div className="grid grid-cols-1 gap-1">
                    {correctPairs.map((pair: { word: string; translation: string }, idx: number) => (
                      <p key={idx} className="text-sm px-2 py-1 rounded bg-green-900 text-green-200">
                        {pair.word} → {pair.translation}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        }
        break;
    }

    return <p className="text-gray-400">Respuesta no disponible</p>;
  };

  useEffect(() => {
    if (parseFloat(percentage) >= 80) {
      showConfetti();
    }
  }, []);

  // const performanceMessage = getPerformanceMessage();

  return (
    <div className="max-w-4xl mx-auto pt-4 mb-14 sm:mb-0" id="language-quiz-results">
      {/* Header */}
      {/* <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-200 mb-2">
          Resultados del Quiz
        </h1>
        <h2 className="text-xl text-gray-300">{title}</h2>
      </div> */}

      {/* Performance Summary */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-gray-300">
          Resultados del Quiz
        </h1>
        <p className="text-gray-400 mt-2">
          Aquí puedes ver tus respuestas y los resultados del cuestionario.
        </p>

        <div className="flex justify-between">
          <div className="flex flex-col items-start mt-4">
            <span className="text-gray-300 text-[2.5rem] md:text-[4rem] md:tracking-[-5px] font-extrabold">
              {rightAnswers} / {questions.length}
            </span>
            <span className="text-gray-400">Respuestas correctas</span>
          </div>

          <div className="flex flex-col items-start mt-4">
            <span className="text-gray-300 text-[2.5rem] md:text-[4rem] font-extrabold">
              {percentage}%
            </span>
            <span className="text-gray-400">Porcentaje de respuestas correctas</span>
          </div>
        </div>

      </div>


      {/* Exercise Type Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Rendimiento por Tipo de Ejercicio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(QuestionTypeLanguage).map(type => {
            const questionsOfType = questions.filter(q => q.type === type);
            const correctOfType = userAnswers.filter(a => a.type === type && a.isCorrect).length;

            if (questionsOfType.length === 0) return null;

            return (
              <div key={type} className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  {getExerciseTypeLabel(type)}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-200">
                    {correctOfType}/{questionsOfType.length}
                  </span>
                  <span className="text-sm text-gray-400">
                    {questionsOfType.length > 0 ? Math.round((correctOfType / questionsOfType.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-200">Revisión Detallada</h3>

        {questions.map((question, index) => {
          const userAnswer = userAnswers.find(a => a.questionId === question.id);
          if (!userAnswer) return null;

          const isCorrect = userAnswer.isCorrect;

          return (
            <div key={question.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">
                      {getExerciseTypeLabel(question.type)}
                    </span>
                  </div>
                  <h4 className="text-gray-200 font-medium mb-3">{question.question}</h4>

                  {/* Show additional context for specific question types */}
                  {question.type === QuestionTypeLanguage.WordMeaning && 'sentence' in question && (
                    <div className="mb-3 p-3 bg-blue-900/20 rounded border border-blue-800">
                      <p className="text-blue-200">{(question as WordMeaningQuestion).sentence}</p>
                    </div>
                  )}

                  {question.type === QuestionTypeLanguage.ReadingComprehension && 'passage' in question && (
                    <div className="mb-3 p-3 bg-blue-900/20 rounded border border-blue-800">
                      <p className="text-blue-200 text-sm">{(question as ReadingComprehensionQuestion).passage}</p>
                    </div>
                  )}
                </div>

                <div className="ml-4">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </div>

              {renderUserAnswer(question, userAnswer)}

              {!isCorrect && question.explanation && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Ver explicación
                  </summary>
                  <div className="mt-2 p-3 bg-gray-700 rounded border border-gray-600">
                    <p className="text-gray-300 text-sm">{question.explanation}</p>
                  </div>
                </details>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={onRetry}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Intentar de Nuevo
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={shareOnTwitter}
          >
            Compartir Resultados
          </Button>
        </div>

        <Button
          className="bg-brand-green-600 text-white hover:bg-brand-green-700"
          onClick={onNewQuiz}
        >
          Crear Nuevo Quiz
        </Button>
      </div>
    </div>
  );
};