"use client";

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea
} from "@/components/ui/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Square } from "lucide-react";
import { useState } from "react";
import { Select } from "@/components/prompt-textarea/select";
import { generateLanguageQuiz } from "@/actions/generate-language-quiz";
import { GenerateLanguageQuiz, Languages, Models, Options } from "@/lib/types";
import { toast } from "sonner";

interface LanguageQuizGeneratorProps {
  onQuizGenerated: (quiz: GenerateLanguageQuiz) => void;
}

export function LanguageQuizGenerator({ onQuizGenerated }: LanguageQuizGeneratorProps) {
  const [input, setInput] = useState("");
  const [level, setLevel] = useState("b1");
  const [difficulty, setDifficulty] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.error("Por favor, describe qué quieres aprender");
      return;
    }

    setIsLoading(true);

    try {
      const config: Options = {
        model: Models.Gemini20Flash,
        apiKey: process.env.GOOGLE_GEMINI_API || "",
        isFree: true,
        language: Languages.Spanish
      };


      const quiz = await generateLanguageQuiz(
        input.trim(),
        level,
        Languages.Spanish, // Could be made configurable
        config
      );

      if (quiz) {
        onQuizGenerated(quiz);
        toast.success("¡Quiz generado exitosamente!");
      } else {
        toast.error("No se pudo generar el quiz. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("Error al generar el quiz. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const handleLevelChange = (selectedLevel: string) => {
    setLevel(selectedLevel);
  };

  const handleDifficultyChange = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
  };

  const levels = [
    { label: "A1 - Principiante", value: "a1" },
    { label: "A2 - Básico", value: "a2" },
    { label: "B1 - Intermedio", value: "b1" },
    { label: "B2 - Intermedio Alto", value: "b2" },
    { label: "C1 - Avanzado", value: "c1" },
    { label: "C2 - Dominio", value: "c2" }
  ];

  const difficulties = [
    { label: "Fácil", value: "easy" },
    { label: "Medio", value: "medium" },
    { label: "Difícil", value: "hard" }
  ];

  return (
    <PromptInput
      value={input}
      onValueChange={handleValueChange}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className="w-full max-w-(--breakpoint-md) rounded-2xl p-2 bg-brand-dark-600/20 border-none"
    >
      <PromptInputTextarea
        disableAutosize={true}
        placeholder="Define el tema, palabras clave y nivel de dificultad para tu quiz personalizado..."
        className="min-h-[80px]"
      />

      <PromptInputActions className="justify-end pt-2">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Select
              options={levels}
              placeholder="Nivel CEFR"
              value={level}
              onChange={handleLevelChange}
            />

            <Select
              options={difficulties}
              placeholder="Dificultad"
              value={difficulty}
              onChange={handleDifficultyChange}
            />
          </div>
        </div>
        <PromptInputAction tooltip={isLoading ? "Generando quiz..." : "Generar quiz"}>
          <Button
            variant="primary"
            size="icon"
            className="h-9 w-9 min-w-9 min-h-9"
            onClick={handleSubmit}
            disabled={!input.trim()}
          >
            {isLoading ? (
              <Square className="size-7 fill-current" />
            ) : (
              <ArrowUp className="size-7" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}