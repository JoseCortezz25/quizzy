import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MatchCardProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  matched?: boolean;
  type?: "word" | "translation";
  className?: string;
}

export const MatchCard = ({
  children,
  onClick,
  selected,
  matched,
  className
}: MatchCardProps) => {
  return (
    <button
      className={cn(
        "border-none flex flex-col gap-2 bg-brand-dark-600/30 rounded-xl p-4 hover:bg-brand-dark-600/60 transition-colors w-full text-start min-h-[42px]",
        selected && "border-brand-dark-600/90 bg-brand-dark-600/90",
        matched && "bg-brand-dark-600/90 border-brand-dark-600/90 cursor-not-allowed opacity-10",
        className
      )}
      onClick={!matched ? onClick : undefined}
    >
      {children}
    </button>
  );
};