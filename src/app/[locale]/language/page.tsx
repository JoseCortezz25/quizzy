"use client";

import { PromptTextarea } from "@/components/prompt-textarea/prompt-textarea";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)]">
      <div className="max-w-[768px] w-full mx-auto h-full flex flex-col justify-center gap-[40px]">
        <div className="w-full mb-4 space-y-2">
          <span className="text-sm text-brand-green-600 font-bold">
            By Quizzy
          </span>
          <h1 className="text-4xl font-bold">¿Qué quieres aprender hoy?</h1>
        </div>

        <div>
          <PromptTextarea />
        </div>
      </div>
    </div>
  );
};

export default Page;