import { Logo } from "./logo";

export const NavbarLanguage = () => {
  return (
    <header className="py-4 border-b border-gray-800/60">
      <div className="container mx-auto flex w-full px-8 justify-between sm:justify-between gap-3 sm:gap-0 sm:items-center">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-[10px] border border-gray-400 text-gray-400/50 border-gray-400/50 rounded-full px-3 py-1 font-bold">Language</span>
        </div>
      </div>
    </header>
  );
};
