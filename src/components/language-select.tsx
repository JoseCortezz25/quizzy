import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export const LanguageSelect = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="dark:hover:bg-[#20352F] p-2 cursor-pointer"
        >
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#1A1F25] border border-[#1A1F25] rounded-lg">
        <DropdownMenuItem className="hover:!bg-[#0A0E12] cursor-pointer rounded-lg font-bold px-4 py-3">
          English
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:!bg-[#0A0E12] cursor-pointer rounded-lg font-bold px-4 py-3">
          Spanish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};