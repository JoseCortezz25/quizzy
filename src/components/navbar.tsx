"use client";
import { Brain } from "lucide-react";
import SheetSettings from "./modals/sheet-setting";
import { LanguageSelect } from "./language-select";
import { useTranslations } from "next-intl";

interface NavbarProps {
  quizCount: number;
}

export const Navbar = ({ quizCount }: NavbarProps) => {
  const t = useTranslations('PageInformation');

  return (
    <header className="py-6 border-b border-gray-800">
      <div className="container mx-auto flex w-full px-6 sm:px-4 justify-between sm:justify-between gap-3 sm:gap-0 sm:items-center">
        <nav className="flex flex-col min-[540px]w-[30%] sm:w-auto sm:flex-row sm:items-center gap-2">
          <span className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-[#00FF88]" />
            <span className="text-xl font-bold">Quizzy</span>
          </span>
          {!globalThis?.localStorage?.getItem("apiKey") && (
            <span className="text-sm text-gray-400">
              ({quizCount}/5) {t('header.count')}
            </span>
          )}
        </nav>
        <nav className="flex items-center gap-4 w-[30%] min-[540px]:w-[20%] justify-end sm:w-auto">
          <LanguageSelect />
          <SheetSettings />
        </nav>
      </div>
    </header>
  );
};
