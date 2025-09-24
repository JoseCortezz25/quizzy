interface SuggestionProps {
  description: string;
  prompt: string;
  onClick: (prompt: string) => void;
}

export const Suggestion = ({ prompt, description, onClick }: SuggestionProps) => {
  return (
    <button
      className="flex flex-col gap-2 bg-brand-dark-600/30 rounded-2xl p-4 hover:bg-brand-dark-600/50 transition-colors"
      onClick={() => onClick(prompt)}
    >
      <p className="text-xs md:text-sm text-brand-dark-400 font-semibold">{description}</p>
    </button>
  );
};
