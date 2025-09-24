import { Brain } from "lucide-react";

export const Logo = () => {
  return (
    <span className="flex items-center gap-2">
      <Brain className="w-8 h-8 text-brand-green-600" />
      <span className="text-xl font-bold">Quizzy</span>
    </span>
  );
};