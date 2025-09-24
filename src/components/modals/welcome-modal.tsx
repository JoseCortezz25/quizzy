
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useTranslations } from 'next-intl';

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WelcomeModal = ({ open, onOpenChange }: WelcomeModalProps) => {
  const t = useTranslations('HomePage');

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-brand-dark-800 !rounded-2xl p-0 overflow-hidden border-none" hasCloseButton={false}>
        <button className="bg-brand-dark-800 p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="w-full h-full">
          <img src="/images/welcome.png" alt="Welcome Modal" className="w-full h-full object-cover" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl px-6">
            {t('modal.title')}
          </DialogTitle>
          <DialogDescription className="px-6 pb-6">
            <p className="mb-4">
              {t('modal.freeUseInfo')}
            </p>
            <p className="mb-4">
              {t('modal.apiKeyRequirement')}
            </p>
            <p>
              {t('modal.apiKeySetupInfo')}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};