'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Sparkles, Target, Zap } from 'lucide-react';
import { GenerateQuiz, Languages, Models, Options, QuestionType } from '@/lib/types';
import { generateQuiz, generateQuizBasedImage } from '@/actions/generate-quiz';
import { FileType, usePDF } from '@/stores/store';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { dictionaryQuestionType, cn, compressImage } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

interface QuizGeneratorProps {
  onGenerate: (questions: GenerateQuiz) => void
}

export default function QuizGenerator({ onGenerate }: QuizGeneratorProps) {
  const t = useTranslations('QuizConfig');
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [focus, setFocus] = useState<"general" | "tecnictal" | "theoretical">("general");
  const [difficulty, setDifficulty] = useState("medio");
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MultipleChoiceSingle);
  const [pdfContent, setPdfContent] = useState("");
  const { uploadedFiles, typeFile } = usePDF();
  const [pdfContentError, setPdfContentError] = useState("");
  const locale = useLocale();

  const validatePdfContent = () => {
    if (!pdfContent.trim()) {
      setPdfContentError(t('topicsPlaceholder'));
      return false;
    }
    setPdfContentError("");
    return true;
  };

  const handleQuizGeneration = (generateFunction: Promise<GenerateQuiz | undefined>) => {
    generateFunction
      .then((questions: GenerateQuiz | undefined) => {
        if (questions) {
          onGenerate(questions);
          toast.success(t('generateButton'));
        } else {
          toast.error(t('errorGeneratingQuiz'));
          console.error('Failed to generate questions');
        }
      })
      .catch((err) => {
        toast.error(t('errorGeneratingQuiz'));
        console.error('Error generating quiz:', err);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const handleGenerate = async () => {
    if (!validatePdfContent()) return;

    if (uploadedFiles.length > 0) {
      const formData = new FormData();
      if (typeFile === FileType.PDF) {
        formData.append('file', uploadedFiles[0]);
      }
      formData.append('question', pdfContent);
      formData.append('numberQuestions', numQuestions.toString());
      formData.append('focus', focus);
      formData.append('difficulty', difficulty);
      formData.append('questionType', questionType);

      const quizCount = typeof window !== 'undefined' ? parseInt(localStorage.getItem('quizCount') || '0') : 0;
      const hasApiKey = !!localStorage.getItem('apiKey');
      const currentModel = localStorage.getItem('model') as Models;
      const isFree = currentModel === Models.DeepSeekR1 ? hasApiKey : (quizCount < 5 || hasApiKey);

      const config: Options = {
        apiKey: window.localStorage.getItem('apiKey') || '',
        model: currentModel,
        isFree,
        language: locale === 'en' ? Languages.English : Languages.Spanish
      };


      console.log("Config", config);


      setIsGenerating(true);

      if (typeFile === FileType.IMAGE) {
        try {
          const compressedImages = await Promise.all(
            uploadedFiles.map(file => compressImage(file))
          );

          const base64Images = await Promise.all(
            compressedImages.map(blob => {
              return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
            })
          );

          handleQuizGeneration(generateQuizBasedImage(formData, base64Images, config));
        } catch (error) {
          toast.error(t('errorProcessingImage'));
          setIsGenerating(false);
          console.error('Error processing images:', error);
        }
      } else {
        handleQuizGeneration(generateQuiz(formData, config));
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark-800 text-white">
      <div className="max-w-7xl mx-auto sm:px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
              <p className="text-gray-400">{t('description')}</p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="pdf-content">
                {t('topicsQuestion')}
              </Label>
              <Textarea
                id="pdf-content"
                placeholder={t('topicsPlaceholder')}
                value={pdfContent}
                onChange={(e) => {
                  setPdfContent(e.target.value);
                  if (pdfContentError) setPdfContentError("");
                }}
                className={cn(
                  "bg-brand-dark-600 text-white border-0 min-h-[100px] max-h-[210px] placeholder:text-white/60",
                  pdfContentError && "border-2 border-red-500"
                )}
              />
              {pdfContentError && (
                <p className="text-sm text-red-500">{pdfContentError}</p>
              )}
            </div>
            <div className="bg-brand-green-950 rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <Label>{t('questionCount')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[3, 5, 10, 15].map((num) => (
                    <div
                      key={num}
                      className={cn(
                        "cursor-pointer rounded-lg p-4 text-center transition-colors font-bold",
                        numQuestions === num
                          ? "bg-brand-green-600 text-black"
                          : "bg-brand-dark-600 hover:bg-brand-dark-600/80"
                      )}
                      onClick={() => setNumQuestions(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="question-type">{t('questionType')}</Label>
                <Select
                  value={questionType}
                  onValueChange={(value: string) => setQuestionType(value as QuestionType)}
                >
                  <SelectTrigger id="question-type" className="bg-brand-dark-600 border-0">
                    <SelectValue placeholder={t('options.selectQuestionType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={QuestionType.MultipleChoiceSingle}>
                      {t('options.questionTypeOption')}
                    </SelectItem>
                    <SelectItem value={QuestionType.MultipleChoice}>
                      {t('options.multipleChoice')}
                    </SelectItem>
                    <SelectItem value={QuestionType.TrueOrFalse}>
                      {t('options.trueOrFalse')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="focus">{t('quizFocus')}</Label>
                <Select
                  value={focus}
                  onValueChange={(value: string) => setFocus(value as "general" | "tecnictal" | "theoretical")
                  }>
                  <SelectTrigger id="focus" className="bg-brand-dark-600 border-0">
                    <SelectValue placeholder={t('options.selectFocus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">{t('options.general')}</SelectItem>
                    <SelectItem value="tecnictal">{t('options.technical')}</SelectItem>
                    <SelectItem value="theoretical">{t('options.theoretical')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="difficulty">{t('options.selectDifficulty')}</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty" className="bg-brand-dark-600 border-0">
                    <SelectValue placeholder={t('options.selectDifficulty')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facil">{t('options.easy')}</SelectItem>
                    <SelectItem value="medio">{t('options.medium')}</SelectItem>
                    <SelectItem value="dificil">{t('options.hard')}</SelectItem>
                    <SelectItem value="experto">{t('options.expert')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full"
              variant="primary"
            >
              {isGenerating ? t('generatingQuestions') : t('generateButton')}
            </Button>
          </div>

          {/* Right Column - Preview and Features */}
          <div className="lg:pl-8">
            <div className="bg-brand-green-950 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-brand-green-600" />
                <h2 className="text-xl font-bold">{t('aiFeatures.title')}</h2>
              </div>

              <div className="space-y-6 mb-8">
                <h3 className="text-lg font-semibold">{t('aiFeatures.characteristics')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-green-600 mt-1" />
                    <div>
                      <p className="font-medium">{t('aiFeatures.intelligentQuestions.title')}</p>
                      <p className="text-sm text-gray-400">{t('aiFeatures.intelligentQuestions.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-brand-green-600 mt-1" />
                    <div>
                      <p className="font-medium">{t('aiFeatures.adaptability.title')}</p>
                      <p className="text-sm text-gray-400">{t('aiFeatures.adaptability.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-brand-green-600 mt-1" />
                    <div>
                      <p className="font-medium">{t('aiFeatures.personalizedApproach.title')}</p>
                      <p className="text-sm text-gray-400">{t('aiFeatures.personalizedApproach.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">{t('preview.title')}</h3>
                <div className="bg-brand-dark-600 rounded-lg p-4 space-y-4">
                  <p className="font-medium">{t('preview.currentConfig')}</p>
                  <ul className="list-disc list-inside text-sm text-gray-400">
                    <li>{t('preview.questionCount')}: {numQuestions}</li>
                    <li>{t('preview.focus')}: {focus}</li>
                    <li>{t('preview.difficulty')}: {difficulty}</li>
                    <li>{t('preview.questionType')}: {dictionaryQuestionType(questionType)}</li>
                  </ul>
                  <p className="text-sm text-gray-400">
                    {t('preview.summary')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

