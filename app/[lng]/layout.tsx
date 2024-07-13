import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dir } from "i18next";

import { languages } from "../i18n/settings";
import NavBar from "@/components/ui/navbar";
import { cn } from "@/lib/utils";

import "./globals.css";
import Footer from "@/components/ui/footer";

import { useTranslation } from "@/app/i18n";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> => {
  const { t } = await useTranslation(lng);

  const metadataBase = new URL("https://your-website.com"); // Remplacez par l'URL réelle de votre site
  const title = t("calendars_titles");
  const description = t("home_description");
  const keywords = t("home_keywords");

  return {
    metadataBase,
    title,
    description,
    keywords,
  };
};
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export default function RootLayout({
  children,
  params: { lng },
}: RootLayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        className={cn(
          "min-h-screen flex flex-col justify-between",
          inter.className
        )}
      >
        <NavBar lng={lng} />
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  );
}
