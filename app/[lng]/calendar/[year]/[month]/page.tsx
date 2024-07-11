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
    title: `${t("calendars")} ${normalizedMonth} ${params.year}`,
    description: `${t("calendar_for")} ${normalizedMonth} ${params.year}`,
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
        {t("calendars")} {t(`month.${month}`)} {params.year}
      </h1>
      <Calendar
        year={parseInt(year)}
        month={month}
        monthNumber={monthNumber - 1}
        lng={lng}
      />
      <MonthLinks currentYear={year} currentMonth={normalizedMonth} lng={lng} />
    </div>
  );
}
