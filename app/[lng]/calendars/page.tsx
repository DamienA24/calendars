import CalendarsList from "@/components/ui/calendarsList";
import { monthNames, normalizeString } from "@/lib/utils";
import { useTranslation } from "@/app/i18n";
import { Translation } from "@/types/translation";

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
