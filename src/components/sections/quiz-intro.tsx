import { Brain, Edit, MousePointer, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

interface QuizIntroProps {
  totalQuestions: number;
  onStart: () => void;
  quizMode: 'multiple-choice' | 'written' | 'drag-drop';
  onQuizModeChange: (mode: 'multiple-choice' | 'written' | 'drag-drop') => void;
}

export default function QuizIntro({
  totalQuestions,
  onStart,
  quizMode,
  onQuizModeChange
}: QuizIntroProps) {
  const t = useTranslations('QuizIntro');

  const quizModes = [
    {
      id: 'multiple-choice' as const,
      title: 'Opción Múltiple',
      description: 'Selecciona la respuesta correcta de las opciones',
      icon: CheckCircle
    },
    {
      id: 'written' as const,
      title: 'Respuesta Escrita',
      description: 'Escribe tu respuesta y obtén calificación',
      icon: Edit
    },
    {
      id: 'drag-drop' as const,
      title: 'Arrastrar y Soltar',
      description: 'Completa arrastrando las palabras correctas',
      icon: MousePointer
    }
  ];

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

      {/* Selector de modo de quiz */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">Selecciona el tipo de quiz:</h3>
        <div className="grid gap-3">
          {quizModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Card
                key={mode.id}
                className={`p-4 cursor-pointer transition-all border-2 ${quizMode === mode.id
                  ? 'bg-[#00FF88]/10 border-[#00FF88] text-white'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-300'
                  }`}
                onClick={() => onQuizModeChange(mode.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${quizMode === mode.id ? 'text-[#00FF88]' : 'text-gray-400'
                    }`} />
                  <div className="flex-1">
                    <h4 className="font-semibold">{mode.title}</h4>
                    <p className="text-sm text-gray-400">{mode.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${quizMode === mode.id
                    ? 'bg-[#00FF88] border-[#00FF88]'
                    : 'border-gray-400'
                    }`}>
                    {quizMode === mode.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
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

