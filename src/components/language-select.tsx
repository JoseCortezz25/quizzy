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
          className="dark:hover:bg-brand-green-900 p-2 cursor-pointer"
        >
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-brand-green-950 border border-brand-green-950 rounded-lg">
        <Link href="/" locale="en">
          <DropdownMenuItem className="hover:!bg-brand-dark-800 cursor-pointer rounded-lg font-bold px-4 py-3">
            {t('header.english')}
          </DropdownMenuItem>
        </Link>
        <Link href="/" locale="es">
          <DropdownMenuItem className="hover:!bg-brand-dark-800 cursor-pointer rounded-lg font-bold px-4 py-3">
            {t('header.spanish')}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};