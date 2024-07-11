import Link from "next/link";

import { monthNames } from "@/lib/utils";
import { useTranslation } from "@/app/i18n";

const Home = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation(lng);
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const getLocalizedUrl = (year: number, month: string) => {
    switch (lng) {
      case "en":
        return `/calendar-${year}-${t(`month.${month}`).toLowerCase()}`;
      case "es":
        return `/calendario-${t(`month.${month}`).toLowerCase()}-${year}`;
      case "pt":
        return `/calendario-${t(`month.${month}`).toLowerCase()}-${year}`;
      case "fr":
      default:
        return `/calendrier-${t(`month.${month}`).toLowerCase()}-${year}`;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"> {t("calendars")}</h1>
      {years.map((year) => (
        <div key={year} className="mb-4">
          <h2 className="text-2xl font-bold">{year}</h2>
          <div className="grid grid-cols-4 gap-2">
            {monthNames.map((month) => {
              return (
                <Link
                  legacyBehavior
                  key={`${year}-${month}`}
                  href={getLocalizedUrl(year, month)}
                >
                  <a className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    {t(`month.${month}`)}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
