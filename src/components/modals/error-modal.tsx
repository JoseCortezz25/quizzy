import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setStep: Dispatch<SetStateAction<'upload' | 'generate' | 'intro' | 'quiz' | 'results'>>;
}

export const ErrorModal = ({ open, onOpenChange, setStep }: ErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Has alcanzado el límite de quizzes gratuitos
          </DialogTitle>
          <DialogDescription className="pt-4">
            <p className="mb-4">
              Por favor, configura tu API key para continuar.
            </p>
            <Button
              onClick={() => {
                onOpenChange(false);
                setStep('upload');
              }}
            >
              Regresar al Home
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};