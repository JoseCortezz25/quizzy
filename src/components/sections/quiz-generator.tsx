'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Sparkles, Target, Zap } from 'lucide-react';
import { GenerateQuiz, Models, Options, QuestionType } from '@/lib/types';
import { generateQuiz } from '@/actions/generate-quiz';
import { usePDF } from '@/store/store';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { dictionaryQuestionType, cn } from '@/lib/utils';

interface QuizGeneratorProps {
  onGenerate: (questions: GenerateQuiz) => void
}

export default function QuizGenerator({ onGenerate }: QuizGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [focus, setFocus] = useState<"general" | "tecnictal" | "theoretical">("general");
  const [difficulty, setDifficulty] = useState("medio");
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MultipleChoiceSingle);
  const [pdfContent, setPdfContent] = useState("");
  const { uploadedPDF, typeFile } = usePDF();
  const [pdfContentError, setPdfContentError] = useState("");

  const validatePdfContent = () => {
    if (!pdfContent.trim()) {
      setPdfContentError("Por favor, especifica los temas para generar las preguntas");
      return false;
    }
    setPdfContentError("");
    return true;
  };

  const handleGenerate = async () => {
    if (!validatePdfContent()) return;

    if (uploadedPDF) {
      const formData = new FormData();
      formData.append('file', uploadedPDF);
      formData.append('question', pdfContent);
      formData.append('numberQuestions', numQuestions.toString());
      formData.append('focus', focus);
      formData.append('difficulty', difficulty);
      formData.append('questionType', questionType);

      const quizCount = typeof window !== 'undefined' ? parseInt(localStorage.getItem('quizCount') || '0') : 0;
      const isFree = quizCount < 5 || !!localStorage.getItem('apiKey');

      const config: Options = {
        apiKey: window.localStorage.getItem('apiKey') || '',
        model: window.localStorage.getItem('model') as Models,
        isFree
      };

      setIsGenerating(true);
      generateQuiz(formData, config)
        .then((questions: GenerateQuiz | undefined) => {
          if (questions) {
            onGenerate(questions);
            setIsGenerating(false);
            toast.success('Se ha generado el quiz correctamente');
          } else {
            toast.error('Error generando el quiz');
            console.error('Failed to generate questions');
          }
        })
        .catch((err) => {
          setIsGenerating(false);
          toast.error('Error generando el quiz');
          console.error('Error generating quiz:', err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E12] text-white">
      <div className="max-w-7xl mx-auto sm:px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Configuración del Quiz</h1>
              <p className="text-gray-400">Personaliza tu quiz según tus necesidades</p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="pdf-content">
                ¿Sobre qué temas quieres que se generen las preguntas?
              </Label>
              <Textarea
                id="pdf-content"
                placeholder="Escribe que temas quieres que se generen las preguntas con base en el contenido del PDF"
                value={pdfContent}
                onChange={(e) => {
                  setPdfContent(e.target.value);
                  if (pdfContentError) setPdfContentError("");
                }}
                className={cn(
                  "bg-[#272D36] text-white border-0 min-h-[100px] max-h-[210px] placeholder:text-white/60",
                  pdfContentError && "border-2 border-red-500"
                )}
              />
              {pdfContentError && (
                <p className="text-sm text-red-500">{pdfContentError}</p>
              )}
            </div>
            <div className="bg-[#1A1F25] rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <Label>Número de preguntas</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[3, 5, 10, 15].map((num) => (
                    <div
                      key={num}
                      className={cn(
                        "cursor-pointer rounded-lg p-4 text-center transition-colors font-bold",
                        numQuestions === num
                          ? "bg-[#00FF88] text-black"
                          : "bg-[#272D36] hover:bg-[#272D36]/80"
                      )}
                      onClick={() => setNumQuestions(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="question-type">Tipo de pregunta</Label>
                <Select
                  value={questionType}
                  onValueChange={(value: string) => setQuestionType(value as QuestionType)}
                >
                  <SelectTrigger id="question-type" className="bg-[#272D36] border-0">
                    <SelectValue placeholder="Selecciona el tipo de pregunta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={QuestionType.MultipleChoiceSingle}>
                      Opción multiple con una sola respuesta
                    </SelectItem>
                    <SelectItem value={QuestionType.MultipleChoice}>
                      Opción multiple con múltiples respuestas
                    </SelectItem>
                    <SelectItem value={QuestionType.TrueOrFalse}>
                      Verdadero o Falso
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="focus">Enfoque del quiz</Label>
                <Select
                  value={focus}
                  onValueChange={(value: string) => setFocus(value as "general" | "tecnictal" | "theoretical")
                  }>
                  <SelectTrigger id="focus" className="bg-[#272D36] border-0">
                    <SelectValue placeholder="Selecciona un enfoque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="tecnictal">Técnico</SelectItem>
                    <SelectItem value="theoretical">Teórico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label htmlFor="difficulty">Nivel de dificultad</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty" className="bg-[#272D36] border-0">
                    <SelectValue placeholder="Selecciona la dificultad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facil">Fácil</SelectItem>
                    <SelectItem value="medio">Medio</SelectItem>
                    <SelectItem value="dificil">Difícil</SelectItem>
                    <SelectItem value="experto">Experto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
            >
              {isGenerating ? 'Generando preguntas...' : 'Generar Quiz'}
            </Button>
          </div>

          {/* Right Column - Preview and Features */}
          <div className="lg:pl-8">
            <div className="bg-[#1A1F25] rounded-lg p-8">
              {typeFile}
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[#00FF88]" />
                <h2 className="text-xl font-bold">Quiz Personalizado con IA</h2>
              </div>

              <div className="space-y-6 mb-8">
                <h3 className="text-lg font-semibold">Características de la IA:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00FF88] mt-1" />
                    <div>
                      <p className="font-medium">Generación de preguntas inteligente</p>
                      <p className="text-sm text-gray-400">Nuestra IA crea preguntas únicas basadas en el contenido proporcionado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#00FF88] mt-1" />
                    <div>
                      <p className="font-medium">Adaptabilidad al nivel de dificultad</p>
                      <p className="text-sm text-gray-400">Las preguntas se ajustan automáticamente según el nivel seleccionado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[#00FF88] mt-1" />
                    <div>
                      <p className="font-medium">Enfoque personalizado</p>
                      <p className="text-sm text-gray-400">Genera preguntas específicas según el enfoque elegido</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Vista previa del quiz:</h3>
                <div className="bg-[#272D36] rounded-lg p-4 space-y-4">
                  <p className="font-medium">Configuración actual:</p>
                  <ul className="list-disc list-inside text-sm text-gray-400">
                    <li>Número de preguntas: {numQuestions}</li>
                    <li>Enfoque: {focus}</li>
                    <li>Dificultad: {difficulty}</li>
                    <li>Tipo de pregunta: {dictionaryQuestionType(questionType)}</li>
                  </ul>
                  <p className="text-sm text-gray-400">
                    Basado en esta configuración, la IA generará un quiz personalizado
                    con preguntas {difficulty}s enfocadas en temas {focus}es.
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

