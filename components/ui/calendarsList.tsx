"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { Translation } from "@/types/translation";

export default function CalendarsList({
  lng,
  translations,
}: {
  lng: string;
  translations: Array<Translation>;
}) {
  const currentYearRef = useRef<null | HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const endYear = 2050;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (v, i) => endYear - i
  );
  //const years = [currentYear - 1, currentYear, currentYear + 1];

  const getLocalizedUrl = (year: number, month: string) => {
    switch (lng) {
      case "en":
        return `/en/calendar-${year}-${month}`;
      case "es":
        return `/es/calendario-${month}-${year}`;
      case "pt":
        return `/pt/calendario-${month}-${year}`;
      case "fr":
      default:
        return `/fr/calendrier-${month}-${year}`;
    }
  };

  useEffect(() => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="sm:max-h-[600px] sm:overflow-y-auto">
      {years.map((year) => (
        <div key={year} className="mb-4">
          <h2 className="text-2xl font-bold">{year}</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            ref={year === currentYear ? currentYearRef : null}
          >
            {translations.map((obj) => {
              return (
                <Link
                  legacyBehavior
                  key={`${year}-${obj.normalizedMonth}`}
                  href={getLocalizedUrl(year, obj.normalizedMonth)}
                >
                  <a className="p-2 bg-primary text-white rounded hover:bg-secondary">
                    {obj.original}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
