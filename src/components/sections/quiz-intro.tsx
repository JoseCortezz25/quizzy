import { Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

interface QuizIntroProps {
  totalQuestions: number
  onStart: () => void
}

export default function QuizIntro({ totalQuestions, onStart }: QuizIntroProps) {
  const t = useTranslations('QuizIntro');

  return (
    <div className="max-w-2xl mx-auto pt-20">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 flex items-center justify-center mb-6">
          <Brain className="w-8 h-8 text-[#00FF88]" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">{t('title')}</h1>
        <p className="text-gray-400 text-center">
          {t('description')}
        </p>
      </div>

      <div className="bg-[#1A1F25] rounded-lg p-6 mb-8">
        <ul className="space-y-3">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-[#00FF88] rounded-full mr-3"></span>
            <span>{t('features.0')}</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-[#00FF88] rounded-full mr-3"></span>
            <span>{t('features.1', { totalQuestions })}</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-[#00FF88] rounded-full mr-3"></span>
            <span>{t('features.2')}</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-[#00FF88] rounded-full mr-3"></span>
            <span>{t('features.3')}</span>
          </li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onStart}
          className="flex-1 bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
        >
          {t('startButton')}
        </Button>
      </div>
    </div>
  );
}

