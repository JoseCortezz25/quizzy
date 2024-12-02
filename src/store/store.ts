import { create } from 'zustand';

type PDFState = {
  uploadedPDF: File | null;
  setUploadedPDF: (pdf: File) => void;
};

const usePDF = create<PDFState>((set) => ({
  uploadedPDF: null,
  setUploadedPDF: (pdf: File) => set({ uploadedPDF: pdf })
}));

export {
  usePDF
};