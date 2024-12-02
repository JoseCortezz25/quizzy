import { ChangeEvent, DragEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, Check, File } from 'lucide-react';
import { Navbar } from '../navbar';
import { usePDF } from '@/store/store';

interface PDFUploaderProps {
  onUpload: () => void
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { setUploadedPDF } = usePDF();

  const handleUpload = () => {
    const fileInput = document.getElementById('fileInput');

    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
      setFileName(file.name);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      uploadFile(file);
      setFileName(file.name);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const uploadFile = (file: File | undefined) => {
    setIsUploading(true);
    if (file) {
      setUploadedPDF(file);
      setTimeout(() => {
        setIsUploading(false);
        setIsUploaded(true);
        setTimeout(() => {
          onUpload();
        }, 1000);
      }, 2000);
    }
    // Simulate file upload
    // setTimeout(() => {
    //   setIsUploading(false);
    //   setIsUploaded(true);
    //   setTimeout(() => {
    //     onUpload();
    //   }, 1000);
    // }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E12] text-white flex flex-col">
      {/* Header */}
      <Navbar />

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
              <div
                className="space-y-4 w-full"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div
                  id="uploadArea"
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-[#00FF88]/50 transition-colors"
                  onClick={handleUpload}
                >
                  {fileName ? (
                    <div className="flex gap-4">
                      <File className="size-10 text-[#00FF88] mb-2" />
                      <p className="text-gray-400 text-start">{fileName}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      Haz clic para seleccionar un archivo
                    </p>
                  )}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
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