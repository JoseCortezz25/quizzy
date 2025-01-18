"use client";
import { Check, Sparkles, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { QuizNavbar } from '../quiz-navbar';
import { QuestionType, type QuizQuestion, type UserAnswer } from '@/lib/types';
import JSConfetti from 'js-confetti';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface QuizResultsProps {
  questions: QuizQuestion[];
  userAnswers: UserAnswer[];
  title: string;
  setStep: Dispatch<SetStateAction<'upload' | 'generate' | 'intro' | 'quiz' | 'results'>>;
}

export default function QuizResults({
  questions,
  userAnswers,
  title,
  setStep
}: QuizResultsProps) {
  const t = useTranslations('QuizResults');
  const checkAnswer = (userAnswer: UserAnswer) => {
    return userAnswer.isCorrect;
  };

  const rightAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
  const percentage = ((rightAnswers / questions.length) * 100).toFixed(1);
  const canvas = document.querySelector('#page-results') as HTMLCanvasElement;
  const jsConfetti = new JSConfetti({ canvas });

  const showConfetti = () => {
    jsConfetti.addConfetti({
      emojis: ['🎉', '🎊', '🎈', '🥳', '👏']
    });
  };

  const shareOnTwitter = () => {
    const url = 'https://twitter.com/intent/tweet';
    const text = `¡He obtenido un ${percentage} porciento en el quiz "${title}"! 🎉🎉🎉 \n\n
    He tenido ${rightAnswers} respuestas correctas de ${questions.length} preguntas.\n\n`;
    const hashtags = 'quizzy';
    const via = 'josecortezz16';
    const twitterUrl = `${url}?text=${text}&hashtags=${hashtags}&via=${via}`;
    window.open(twitterUrl, '_blank');
  };

  useEffect(() => {
    if (parseFloat(percentage) >= 80) {
      showConfetti();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-4 mb-14 sm:mb-0" id="page-results">
      {/* Header */}
      <QuizNavbar
        title={title}
        questionNumber={questions.length}
        totalQuestions={questions.length}
      />

      {/* Progress bar */}
      <div className="h-1 bg-gray-800 rounded mb-8">
        <div className="quiz-progressbar " />
      </div>

      {/* Summary */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-gray-300">
          {t('title')}
        </h1>
        <p className="text-gray-400 mt-2">
          {t('description')}
        </p>

        <div className="flex justify-between">
          <div className="flex flex-col items-start mt-4">
            <span className="text-gray-300 text-[2.5rem] md:text-[4rem] md:tracking-[-5px] font-extrabold">
              {rightAnswers} / {questions.length}
            </span>
            <span className="text-gray-400">{t('score.correct')}</span>
          </div>

          <div className="flex flex-col items-start mt-4">
            <span className="text-gray-300 text-[2.5rem] md:text-[4rem] font-extrabold">
              {percentage}%
            </span>
            <span className="text-gray-400">{t('score.percentage')}</span>
          </div>
        </div>

      </div>

      {/* Questions list */}
      <div className="space-y-8">
        {questions.map((question, index) => {
          const isCorrect = checkAnswer(userAnswers[index]);
          const selectedOptions = userAnswers[index].selectedOptions;

          return (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{index + 1}.</span>
                <h2 className="text-gray-300">{question.question}</h2>
              </div>
              <div className="flex items-center justify-between">
                <div className={cn(
                  "result-item",
                  isCorrect ? 'result-item__correct' : 'result-item__wrong'
                )}>
                  {question.type !== QuestionType.OpenEnded && (
                    <div className="space-y-2">
                      {selectedOptions.map(option => (
                        <p className="text-gray-300" key={option}>
                          {option}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {isCorrect ? (
                  <div className="ml-4">
                    <Check className="w-6 h-6 text-[#00FF88]" />
                  </div>
                ) : (
                  <div className="ml-4">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                )}
              </div>
              {!isCorrect && (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="hover:bg-[#1A1F25]"
                    onClick={() => {
                      const explanationElement = document.getElementById(`explanation-${index}`);
                      if (explanationElement) {
                        explanationElement.style.display = explanationElement.style.display === 'none' ? 'block' : 'none';
                      }
                    }}
                  >
                    {t('actions.why')}
                    <Sparkles className="w-6 h-6 ml-2 text-white" />
                  </Button>

                  <div id={`explanation-${index}`} className="border border-[#1A1F25] rounded-lg p-[20px]" style={{ display: 'none' }}>
                    {question.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between mt-8 flex-col gap-4 sm:gap-0 sm:flex-row pb-16">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-400 hover:bg-gray-800"
            onClick={() => setStep('intro')}
          >
            {t('actions.retry')}
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-400 hover:bg-gray-800"
            onClick={shareOnTwitter}
          >
            {t('actions.share')}
          </Button>
        </div>

        <Button
          className="bg-white text-black hover:bg-gray-200"
          onClick={() => setStep('generate')}
        >
          {t('actions.generate')}
        </Button>
      </div>
    </div >
  );
}

