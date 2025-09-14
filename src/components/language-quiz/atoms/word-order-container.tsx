import { WordChip } from "./word-chip";

interface WordOrderContainerProps {
  orderedWords: string[];
  moveWordToAvailable: (word: string, index: number) => void;
  showResult: boolean;
  isCorrect: boolean;
}

export const WordOrderContainer = ({
  orderedWords,
  moveWordToAvailable,
  showResult,
  isCorrect
}: WordOrderContainerProps) => {
  const classNameSuccess = showResult && isCorrect ? "bg-green-500 border-green-500" : "";

  return (
    <div className="min-h-[60px] p-6 border-2 border-dashed border-brand-dark-600/30 rounded-lg">
      <div className="flex flex-wrap gap-2">
        {orderedWords.map((word, index) => (
          <WordChip
            key={`ordered-${index}`}
            onClick={() => moveWordToAvailable(word, index)}
            className={classNameSuccess}
          >
            {word}
          </WordChip>
        ))}
        {orderedWords.length === 0 && (
          <span className="text-gray-400 italic">Haz clic en las palabras para ordenarlas</span>
        )}
      </div>
    </div>
  );
};