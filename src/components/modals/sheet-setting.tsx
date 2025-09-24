import { SettingsIcon } from "lucide-react";
import Settings from "../settings";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useTranslations } from "next-intl";

interface SheetSettingsProps {
  [key: string]: unknown;
}

const SheetSettings = ({ ...props }: SheetSettingsProps) => {
  const t = useTranslations('PageInformation');

  return (
    <Sheet {...props}>
      <SheetTrigger>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="dark:hover:bg-brand-green-900 p-2"
        >
          <SettingsIcon className="size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sheet-settings">
        <SheetHeader className="text-start">
          <SheetTitle className="font-bold text-[19px]">{t('settings.title')}</SheetTitle>
          <SheetDescription className="text-[15px]">
            {t('settings.description')}
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-[85dvh] flex flex-col justify-between">
          <Settings />
          <p className="text-center text-muted-foreground text-[14px] mt-4">{t('settings.created')} {' '}
            <a href="https://github.com/JoseCortezz25" target="_blank" rel="noopener noreferrer">
              <strong>@JoseCortezz25</strong>
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>

  );
};

export default SheetSettings;