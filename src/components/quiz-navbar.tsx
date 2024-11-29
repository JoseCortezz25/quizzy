import { Brain } from 'lucide-react';

interface QuizNavbarProps {
  questionNumber: number
  totalQuestions: number
}

export const QuizNavbar = ({ questionNumber, totalQuestions }: QuizNavbarProps) => {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
          <Brain className="w-4 h-4 text-[#00FF88]" />
        </div>
        <span className="text-gray-400">Curso de Agentes AI</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400">
          Pregunta {questionNumber} de {totalQuestions}
        </span>
      </div>
    </header>
  );
};
