import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const LanguageSelect = () => {
  const t = useTranslations('PageInformation');

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
        <Link href="/" locale="en">
          <DropdownMenuItem className="hover:!bg-[#0A0E12] cursor-pointer rounded-lg font-bold px-4 py-3">
            {t('header.english')}
          </DropdownMenuItem>
        </Link>
        <Link href="/" locale="es">
          <DropdownMenuItem className="hover:!bg-[#0A0E12] cursor-pointer rounded-lg font-bold px-4 py-3">
            {t('header.spanish')}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};