import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizzy: AI Quiz Generator",
  description: "Genera quizzes con IA en segundos",
  authors: {
    name: "josecortezz16",
    url: "@josecortezz16"
  },
  metadataBase: new URL("https://quiz-generator-seven.vercel.app/")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || "";

  return (
    <html lang="es">
      <body className={inter.className}>
        <main>
          {children}
        </main>
        <Toaster richColors />
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />
      </body>
    </html>
  );
}
