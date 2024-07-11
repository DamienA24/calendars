import Link from "next/link";

import { monthNames, normalizeString } from "@/lib/utils";
import { useTranslation } from "@/app/i18n";

interface MonthLinksProps {
  currentYear: string;
  currentMonth: string;
  lng: string;
}

export default async function MonthLinks({
  currentYear,
  currentMonth,
  lng,
}: MonthLinksProps) {
  const { t } = await useTranslation(lng);

  const getLocalizedUrl = (year: string, month: string) => {
    console.log("month: ", month);
    switch (lng) {
      case "en":
        return `/calendar-${year}-${month}`;
      case "es":
        return `/calendario-${month}-${year}`;
      case "pt":
        return `/calendario-${month}-${year}`;
      case "fr":
      default:
        return `/calendrier-${month}-${year}`;
    }
  };
  const translateMonth = (month: string) => {
    const translation = t(`month.${month}`);
    const normalizedMonth = normalizeString(translation.toLowerCase());
    return normalizedMonth;
  };
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Autres mois de {currentYear}</h2>
      <div className="grid grid-cols-4 gap-2">
        {monthNames.map((month) => {
          const normalizedMonth = translateMonth(month);

          return (
            <Link
              key={month}
              href={getLocalizedUrl(currentYear, normalizedMonth)}
              className={`p-2 text-center rounded ${
                month === currentMonth
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {t(`month.${month}`)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
