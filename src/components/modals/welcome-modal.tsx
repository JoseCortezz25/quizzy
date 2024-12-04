
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WelcomeModal = ({ open, onOpenChange }: WelcomeModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-[#0A0E12]">
        <DialogHeader>
          <DialogTitle className="text-2xl">¡Bienvenido a AI Quiz Generator!</DialogTitle>
          <DialogDescription className="pt-4">
            <p className="mb-4">
              Puedes usar la aplicación de forma gratuita para generar hasta 5 quizzes.
            </p>
            <p className="mb-4">
              Después de alcanzar este límite, necesitarás configurar tu propia API key
              de Google o OpenAI para continuar usando la aplicación.
            </p>
            <p>
              Puedes configurar tu API key en cualquier momento haciendo clic en el
              ícono de configuración ⚙️ en la barra superior.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};