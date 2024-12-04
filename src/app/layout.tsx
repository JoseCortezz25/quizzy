import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Quiz Generator",
  description: "Genera quizzes con IA en segundos",
  metadataBase: new URL("https://quiz-generator-seven.vercel.app/")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main>
          {children}
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
