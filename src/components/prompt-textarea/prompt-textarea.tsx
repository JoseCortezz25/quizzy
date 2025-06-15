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
      <PromptInputTextarea placeholder="Ask me anything..." />
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
            className="h-8 w-8"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Square className="size-5 fill-current" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
