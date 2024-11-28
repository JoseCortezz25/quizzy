'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, CheckCircle, Sparkles, Target, Zap } from 'lucide-react';
import { Question } from '../../lib/types';

interface QuizGeneratorProps {
  onGenerate: (questions: Question[]) => void
}

const mockQuestions: Question[] = [
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Londres", "Berlín", "París", "Madrid"],
    correctAnswer: 2
  },
  {
    question: "¿En qué año comenzó la Segunda Guerra Mundial?",
    options: ["1939", "1940", "1941", "1942"],
    correctAnswer: 0
  },
  {
    question: "¿Quién pintó la Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswer: 1
  }
];

export default function QuizGenerator({ onGenerate }: QuizGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [focus, setFocus] = useState("general");
  const [difficulty, setDifficulty] = useState("medio");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate(mockQuestions.slice(0, numQuestions));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E12] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-[#00FF88]" />
            <span className="text-xl font-bold">AI Quiz Generator</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Configuración del Quiz</h1>
              <p className="text-gray-400">Personaliza tu quiz según tus necesidades</p>
            </div>

            <div className="bg-[#1A1F25] rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <Label htmlFor="num-questions">Número de preguntas (máx. 10)</Label>
                <Input
                  id="num-questions"
                  type="number"
                  min={1}
                  max={10}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="bg-[#272D36] border-0"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="focus">Enfoque del quiz</Label>
                <Select value={focus} onValueChange={setFocus}>
                  <SelectTrigger id="focus" className="bg-[#272D36] border-0">
                    <SelectValue placeholder="Selecciona un enfoque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="practico">Práctico</SelectItem>
                    <SelectItem value="teorico">Teórico</SelectItem>
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
              className="w-full bg-[#00FF88] text-black hover:bg-[#00FF88]/90 h-12 text-lg"
            >
              {isGenerating ? 'Generando preguntas...' : 'Generar Quiz'}
            </Button>
          </div>

          {/* Right Column - Preview and Features */}
          <div className="lg:pl-8">
            <div className="bg-[#1A1F25] rounded-lg p-8">
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

