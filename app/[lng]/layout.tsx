import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { dir } from "i18next";

import { languages } from "../i18n/settings";
import NavBar from "@/components/ui/navbar";
import { cn } from "@/lib/utils";

import "./globals.css";
import Footer from "@/components/ui/footer";

import { useTranslation, translationManually } from "@/app/i18n";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> => {
  const { t } = await translationManually(lng);

  const metadataBase = new URL("https://www.calendohub.com"); // Remplacez par l'URL réelle de votre site
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
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="196c8163-a52a-4546-aece-eacb5ee112dd"
          />
        )}
        <NavBar lng={lng} />
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  );
}
