import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Question } from '../../lib/types';

interface QuizResultsProps {
  questions: Question[]
  userAnswers: (number | null)[]
}

export default function QuizResults({ questions, userAnswers }: QuizResultsProps) {
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  return (
    <div className="max-w-4xl mx-auto pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
            <span className="text-[#00FF88]">AI</span>
          </div>
          <span className="text-gray-400">Curso de Agentes AI</span>
        </div>
        <span className="text-gray-400">
          Pregunta {questions.length} de {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-800 rounded mb-8">
        <div className="h-full w-full bg-gradient-to-r from-[#00FF88] via-[#00FF88] to-[#0066FF] rounded" />
      </div>

      {/* Questions list */}
      <div className="space-y-8">
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] === question.correctAnswer;
          return (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{index + 1}.</span>
                <h2 className="text-gray-300">{question.question}</h2>
              </div>
              <div className="flex items-center justify-between">
                <div className={`flex-1 p-4 rounded-lg ${isCorrect ? 'bg-[#1A1F25] border border-[#00FF88]/30' : 'bg-[#1A1F25] border border-red-500/30'
                  }`}>
                  <p className="text-gray-300">
                    {question.options[userAnswers[index] ?? 0]}
                  </p>
                </div>
                {isCorrect ? (
                  <div className="ml-4">
                    <Check className="w-6 h-6 text-[#00FF88]" />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="ml-4 border-gray-700 text-gray-400 hover:bg-gray-800"
                  >
                    Repasar
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          className="border-gray-700 text-gray-400 hover:bg-gray-800"
          onClick={() => window.location.reload()}
        >
          Repetir quiz
        </Button>
        <Button
          className="bg-white text-black hover:bg-gray-200"
        >
          Continuar aprendiendo
        </Button>
      </div>
    </div>
  );
}

