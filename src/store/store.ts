import { create } from 'zustand';

export enum FileType {
  PDF = 'pdf',
  IMAGE = 'image'
}

type PDFState = {
  uploadedFiles: File[];
  typeFile: string;
  setUploadedFiles: (files: File[]) => void;
  setTypeFile: (type: FileType) => void;
};

const usePDF = create<PDFState>(set => ({
  uploadedFiles: [],
  typeFile: FileType.PDF,
  setUploadedFiles: (files: File[]) => set({ uploadedFiles: files }),
  setTypeFile: (type: FileType) => set({ typeFile: type })
}));

export { usePDF };
