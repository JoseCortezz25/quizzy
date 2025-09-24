"use client";
import { LanguageSelect } from "./language-select";
import { useTranslations } from "next-intl";
import SheetSettings from "./modals/sheet-setting";
import { Logo } from "./navbar/logo";

interface NavbarProps {
  quizCount: number;
}

export const Navbar = ({ quizCount }: NavbarProps) => {
  const t = useTranslations('PageInformation');

  return (
    <header className="py-4 border-b border-gray-800/60">
      <div className="container mx-auto flex w-full px-8 justify-between sm:justify-between gap-3 sm:gap-0 sm:items-center">
        <nav className="flex flex-col min-[540px]w-[30%] sm:w-auto sm:flex-row sm:items-center gap-2">
          <Logo />
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
