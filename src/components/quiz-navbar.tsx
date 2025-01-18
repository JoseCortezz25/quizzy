import { Brain } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface QuizNavbarProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
}

export const QuizNavbar = ({
  questionNumber,
  totalQuestions,
  title
}: QuizNavbarProps) => {
  const t = useTranslations('QuizResults');

  return (
    <header className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between py-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
          <Brain className="size-4 min-w-4 min-h-4 text-[#00FF88]" />
        </div>
        <span className="text-gray-400">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400">
          {t('score.questionCountStart')} {questionNumber} {t('score.questionCountMiddle')} {totalQuestions}
        </span>
      </div>
    </header>
  );
};
