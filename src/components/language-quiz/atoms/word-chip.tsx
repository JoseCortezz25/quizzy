import { cn } from "@/lib/utils";
import { DragEvent, ReactNode } from "react";

interface WordChipProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  draggable?: boolean;
  onDragStart?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent) => void;
  onDragOver?: (e: DragEvent) => void;
  className?: string;
}

export const WordChip = ({
  children,
  onClick,
  selected,
  draggable = false,
  onDragStart,
  onDrop,
  onDragOver,
  className
}: WordChipProps) => {
  return (
    <button
      className={cn(
        "inline-block px-4 py-2 rounded-xl cursor-pointer transition-all bg-brand-dark-600/30 hover:bg-brand-dark-600/60",
        selected && "bg-brand-dark-600/90 border-brand-dark-600/90",
        draggable && "cursor-move",
        className
      )}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {children}
    </button>
  );
};