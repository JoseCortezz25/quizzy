import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, Check, Brain } from 'lucide-react';

interface PDFUploaderProps {
  onUpload: () => void
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      setTimeout(() => {
        onUpload();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E12] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-[#00FF88]" />
            <span className="text-xl font-bold">AI Quiz Generator</span>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <span>
                  Created by <a href="http://" target="_blank" rel="noopener noreferrer" className="font-bold underline">@josecortezz25</a>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Genera quizzes inteligentes con IA en segundos
            </h1>
            <p className="text-xl text-gray-400">
              Sube tu PDF y deja que la IA cree un quiz personalizado para ti.
              Perfecto para todos los estudiantes que quieren estudiar de manera más eficiente.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#00FF88]" />
                <span>Preguntas generadas por IA</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#00FF88]" />
                <span>Adaptado a tu contenido</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#00FF88]" />
                <span>Resultados instantáneos</span>
              </li>
            </ul>
          </div>

          {/* Right column - PDF upload */}
          <div className="bg-[#1A1F25] rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#00FF88]/10 flex items-center justify-center mb-6">
              <FileUp className="w-10 h-10 text-[#00FF88]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Sube tu PDF</h2>
            <p className="text-gray-400 text-center mb-6">
              Arrastra y suelta tu archivo PDF aquí, o haz clic para seleccionar
            </p>
            {isUploaded ? (
              <div className="flex flex-col items-center">
                <Check className="w-16 h-16 text-[#00FF88] mb-4" />
                <p className="text-[#00FF88] font-semibold mb-4">Archivo subido con éxito</p>
                <Button
                  onClick={onUpload}
                  className="bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
                >
                  Generar Quiz
                </Button>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-[#00FF88]/50 transition-colors"
                  onClick={handleUpload}
                >
                  <p className="text-gray-400">
                    Haz clic para seleccionar un archivo
                  </p>
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full bg-[#00FF88] text-black hover:bg-[#00FF88]/90"
                >
                  {isUploading ? 'Subiendo...' : 'Subir PDF'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

