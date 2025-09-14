import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface OptionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  className?: string;
}

export const OptionButton = ({
  children,
  onClick,
  selected,
  correct,
  incorrect,
  disabled,
  className
}: OptionButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-white hover:text-white border-none flex flex-col gap-2 bg-brand-dark-600/30 rounded-xl p-4 hover:bg-brand-dark-600/60 transition-colors w-full text-start min-h-[42px]",
        selected && "border-brand-dark-600/90 bg-brand-dark-600/90",
        correct && "border-green-500 bg-green-50",
        incorrect && "border-red-500 bg-red-50",
        className
      )}
    >
      {children}
    </Button>
  );
};