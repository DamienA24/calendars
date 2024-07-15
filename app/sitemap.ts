import { MetadataRoute } from "next";

const locales = ["en", "fr", "es", "pt"];
const baseUrl = "https://www.calendohub.com";

interface Months {
  [key: string]: string[];
}
const months: Months = {
  en: [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ],
  fr: [
    "janvier",
    "fevrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "decembre",
  ],
  es: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  pt: [
    "janeiro",
    "fevereiro",
    "marco",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ],
};

const getCalendarPaths = () => {
  const paths = [];
  for (let year = 1900; year <= 2050; year++) {
    for (const locale of locales) {
      for (const month of months[locale]) {
        let url;
        switch (locale) {
          case "en":
            url = `/en/calendar-${year}-${month}`;
            break;
          case "fr":
            url = `/fr/calendrier-${month}-${year}`;
            break;
          case "es":
            url = `/es/calendario-${month}-${year}`;
            break;
          case "pt":
            url = `/pt/calendario-${month}-${year}`;
            break;
        }
        paths.push({
          url: `${baseUrl}${url}`,
          lastModified: new Date().toISOString(),
        });
      }
    }
  }
  return paths;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const calendarPaths = getCalendarPaths();

  const staticPaths = [
    { url: `${baseUrl}/en`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/fr`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/es`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/pt`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/en/calendars`, lastModified: new Date().toISOString() },
    {
      url: `${baseUrl}/fr/calendriers`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/es/calendarios`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/pt/calendarios`,
      lastModified: new Date().toISOString(),
    },
  ];

  return [...staticPaths, ...calendarPaths];
}
