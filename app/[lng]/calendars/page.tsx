import CalendarsList from "@/components/ui/calendarsList";
import { monthNames, normalizeString } from "@/lib/utils";
import { useTranslation } from "@/app/i18n";
import { Translation } from "@/types/translation";
import { Metadata } from "next";

export const generateMetadata = async ({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> => {
  const { t } = await useTranslation(lng);

  const metadataBase = new URL("https://your-website.com"); // Remplacez par l'URL réelle de votre site
  const title = t("calendars_title");
  const description = t("calendars_description");
  const keywords = t("calendars_keywords");

  return {
    metadataBase,
    title,
    description,
    keywords,
    alternates: {
      canonical: "/calendars",
      languages: {
        fr: "/fr/calendars",
        en: "/en/calendars",
        es: "/es/calendars",
        pt: "/pt/calendars",
      },
    },
  };
};

const Calendars = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation(lng);

  const translations: Array<Translation> = monthNames.map((month) => {
    const translation = t(`month.${month}`);
    const normalizedMonth = normalizeString(translation.toLowerCase());

    return {
      normalizedMonth,
      original: translation,
    };
  });
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{t("calendars")}</h1>
      <p className="mb-4">{t("seo_paragraph")}</p>
      <CalendarsList lng={lng} translations={translations} />
    </div>
  );
};

export default Calendars;
