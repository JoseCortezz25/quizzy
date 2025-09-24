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
import { Select } from "./select";


export function PromptTextarea() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const levels = [
    { label: "A1", value: "a1" },
    { label: "A2", value: "a2" },
    { label: "B1", value: "b1" },
    { label: "B2", value: "b2" }
  ];

  const difficulties = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" }
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
      
      <PromptInputActions className="justify-end pt-2 ">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Select
              options={levels}
              placeholder="Nivel"
              onChange={() => { }}
            />

            <Select
              options={difficulties}
              placeholder="Dificultad"
              onChange={() => { }}
            />
          </div>
        </div>
        <PromptInputAction tooltip={isLoading ? "Stop generation" : "Send message"}>
          <Button
            variant="primary"
            size="icon"
            className="h-9 w-9 min-w-9 min-h-9"
            onClick={handleSubmit}
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
