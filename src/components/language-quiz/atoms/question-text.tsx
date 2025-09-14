import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface QuestionTextProps {
  children: ReactNode;
  className?: string;
}

export const QuestionText = ({ children, className }: QuestionTextProps) => {
  return (
    <h2 className={cn("text-lg md:text-xl font-semibold mb-4", className)}>
      {children}
    </h2>
  );
};