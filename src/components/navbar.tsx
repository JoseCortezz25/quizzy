import { Brain } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="py-6 border-b border-gray-800">
      <div className="container mx-auto flex w-full px-0 sm:px-4 justify-start sm:justify-between gap-3 sm:gap-0 sm:items-center flex-col sm:flex-row">
        <nav className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-[#00FF88]" />
          <span className="text-xl font-bold">AI Quiz Generator</span>
        </nav>
        <nav>
          <ul className="flex gap-6">
            <li>
              <span>
                Created by <a href="https://github.com/JoseCortezz25" target="_blank" rel="noopener noreferrer" className="font-bold underline">@josecortezz25</a>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
