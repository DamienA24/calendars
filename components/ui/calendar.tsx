import { CalendarProps } from "@/types/calendar";
import { useTranslation } from "@/app/i18n";
import CalendarClient from "./calendarClient";

const Calendar: React.FC<CalendarProps> = async ({
  year,
  monthNumber,
  lng,
  month,
}) => {
  const { t } = await useTranslation(lng);

  const translations = {
    month: t(`month.${month}`),
    print: t("print"),
    download: t("download"),
    daysOfWeek: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].map((day) => t(`day.${day}`)),
    daysOfWeekShort: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
      (day) => t(`day.${day}`)
    ),
    calendar_for: t("calendar_for"),
    calendar_description: t("calendar_description", {
      month: t(`month.${month}`),
      year,
    }),
    calendar: t("calendar"),
    seo_why_use: t("seo_why_use", { month: t(`month.${month}`), year }),
    seo_easy_planning: t("seo_easy_planning", {
      month: t(`month.${month}`),
      year,
    }),
    seo_download_easy: t("seo_download_easy", {
      month: t(`month.${month}`),
      year,
    }),
    seo_various_formats: t("seo_various_formats", {
      month: t(`month.${month}`),
      year,
    }),
    seo_features: t("seo_features", {
      month: t(`month.${month}`),
      year,
    }),
    seo_clarity: t("seo_clarity", { month: t(`month.${month}`), year }),
    seo_elegant_design: t("seo_elegant_design", {
      month: t(`month.${month}`),
      year,
    }),
    seo_practical: t("seo_practical", {
      month: t(`month.${month}`),
      year,
    }),
    seo_how_to_use: t("seo_how_to_use", {
      month: t(`month.${month}`),
      year,
    }),
    seo_other_months: t("seo_other_months", { year }),
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <CalendarClient
        year={year}
        month={month}
        monthNumber={monthNumber}
        translations={translations}
      />
    </div>
  );
};

export default Calendar;
