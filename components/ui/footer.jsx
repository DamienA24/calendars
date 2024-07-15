import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

import { languages } from "../../app/i18n/settings";
import { useTranslation } from "@/app/i18n";

export default async function Footer({ lng }) {
  const { t } = await useTranslation(lng);

  return (
    <footer className="bg-muted p-6  w-full">
      <div className="flex flex-col md:flex-row justify-between text-base font-medium	">
        <Link href={`/${lng}`}>
          <div className="flex items-center mb-5 sm:mb-0">
            <CalendarIcon className="h-6 w-6" />
            {t("calendars")}
          </div>
        </Link>

        <div className="flex flex-col mb-5 sm:mb-0">
          <Link href="https://www.calendohub.com/sitemap.xml" prefetch={false}>
            Sitemap
          </Link>
        </div>
        <div>
          <Trans i18nKey="languageSwitcher" t={t}>
            Switch from <strong>{{ lng }}</strong> to:{" "}
          </Trans>
          {languages
            .filter((l) => lng !== l)
            .map((l, index) => {
              return (
                <span key={l}>
                  {index > 0 && " / "}
                  <Link href={`/${l}`}>{l}</Link>
                </span>
              );
            })}
        </div>
      </div>
    </footer>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
