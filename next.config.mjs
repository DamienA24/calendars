/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    const rewrites = [];
    const locales = ["fr", "en", "es", "pt"];
    const months = {
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

    const monthMapping = {
      fr: {
        janvier: "january",
        fevrier: "february",
        mars: "march",
        avril: "april",
        mai: "may",
        juin: "june",
        juillet: "july",
        aout: "august",
        septembre: "september",
        octobre: "october",
        novembre: "november",
        decembre: "december",
      },
      es: {
        enero: "january",
        febrero: "february",
        marzo: "march",
        abril: "april",
        mayo: "may",
        junio: "june",
        julio: "july",
        agosto: "august",
        septiembre: "september",
        octubre: "october",
        noviembre: "november",
        diciembre: "december",
      },
      pt: {
        janeiro: "january",
        fevereiro: "february",
        marco: "march",
        abril: "april",
        maio: "may",
        junho: "june",
        julho: "july",
        agosto: "august",
        setembro: "september",
        outubro: "october",
        novembro: "november",
        dezembro: "december",
      },
    };

    for (let year = 2023; year <= 2025; year++) {
      for (const locale of locales) {
        for (const month of months[locale]) {
          let source;
          let normalizedMonth;
          switch (locale) {
            case "en":
              source = `/${locale}/calendar-${year}-${month}`;
              normalizedMonth = month;
              break;
            case "es":
              source = `/${locale}/calendario-${month}-${year}`;
              normalizedMonth = monthMapping[locale][month];
              break;
            case "pt":
              source = `/${locale}/calendario-${month}-${year}`;
              normalizedMonth = monthMapping[locale][month];
              break;
            case "fr":
            default:
              source = `/${locale}/calendrier-${month}-${year}`;
              normalizedMonth = monthMapping[locale][month];
              break;
          }
          rewrites.push({
            source,
            destination: `/${locale}/calendar/${year}/${normalizedMonth}`,
            locale: false,
          });
        }
      }
    }
    return rewrites;
  },
};

export default nextConfig;
