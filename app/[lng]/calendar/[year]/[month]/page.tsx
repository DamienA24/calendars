import { Metadata } from "next";

import { getMonthNumber, normalizeString } from "@/lib/utils";
import { CalendarPageProps } from "@/types/calendar";
import MonthLinks from "@/components/ui/monthLinks";
import Calendar from "@/components/ui/calendar";
import { useTranslation } from "@/app/i18n";

export async function generateMetadata({
  params,
}: CalendarPageProps): Promise<Metadata> {
  const { t } = await useTranslation(params.lng);
  const decodedMonth = decodeURIComponent(params.month);
  const normalizedMonth = normalizeString(decodedMonth.toLowerCase());

  return {
    title: `${t("seo_title", {
      month: t(`month.${normalizedMonth}`),
      year: params.year,
    })}`,
    description: `${t("seo_description", {
      month: t(`month.${normalizedMonth}`),
      year: params.year,
    })}`,
  };
}

export default async function CalendarPage({ params }: CalendarPageProps) {
  const { year, month, lng } = params;
  const { t } = await useTranslation(lng);
  const decodedMonth = decodeURIComponent(month);
  const normalizedMonth = normalizeString(decodedMonth.toLowerCase());
  const monthNumber = getMonthNumber(normalizedMonth);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {t("calendar_for")} {t(`month.${month}`)} {params.year}
      </h1>
      <p className="mb-4">
        {t("seo_description", {
          month: t(`month.${normalizedMonth}`),
          year,
        })}
      </p>

      <Calendar
        year={parseInt(year)}
        month={month}
        monthNumber={monthNumber - 1}
        lng={lng}
      />
      <MonthLinks currentYear={year} currentMonth={normalizedMonth} lng={lng} />
      <h2 className="text-2xl font-bold mt-8 mb-2">
        {t("seo_why_use", { month: t(`month.${normalizedMonth}`), year })}
      </h2>
      <ul className="mb-4">
        <li>
          {t("seo_easy_planning", {
            month: t(`month.${normalizedMonth}`),
            year,
          })}
        </li>
        <li>
          {t("seo_download_easy", {
            month: t(`month.${normalizedMonth}`),
            year,
          })}
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">
        {t("seo_features", { month: t(`month.${normalizedMonth}`), year })}
      </h2>
      <ul className="mb-4">
        <li>
          {t("seo_clarity", { month: t(`month.${normalizedMonth}`), year })}
        </li>
        <li>
          {t("seo_elegant_design", {
            month: t(`month.${normalizedMonth}`),
            year,
          })}
        </li>
        <li>
          {t("seo_practical", { month: t(`month.${normalizedMonth}`), year })}
        </li>
      </ul>
    </div>
  );
}
