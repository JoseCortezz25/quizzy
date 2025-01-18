import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locals } from "@/i18n/request";
import "../globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizzy: AI Quiz Generator",
  description: `Quizzy utiliza inteligencia artificial para crear preguntas adecuadas para pruebas, exámenes o práctica general. 
  Esta herramienta puede transformar tu contenido en un quiz completo en segundos. 
  Simplemente sube tu material y deja que el generador de preguntas produzca una herramienta de evaluación personalizada.`,
  authors: {
    name: "josecortezz16",
    url: "@josecortezz16"
  },
  metadataBase: new URL("https://quiz-generator-seven.vercel.app/")
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS || "";
  if (!routing.locales.includes(locale as Locals)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <main>
            {children}
          </main>
          <Toaster richColors />
          <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
