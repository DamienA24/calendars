import Link from "next/link";
import { useTranslation } from "@/app/i18n";

export default async function NavBar({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);
  return (
    <header className="bg-background px-4 lg:px-6 h-14 flex items-center border-b">
      <Link href={`/${lng}`} prefetch={false} legacyBehavior>
        <a className="flex items-center">
          <CalendarIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">{t("calendars")}</span>
        </a>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href={`/${lng}`} prefetch={false} legacyBehavior>
          <a className="text-sm font-medium hover:underline underline-offset-4">
            {t("home")}
          </a>
        </Link>
        <Link href={`/${lng}/calendars`} prefetch={false} legacyBehavior>
          <a className="text-sm font-medium hover:underline underline-offset-4">
            {t("calendars")}
          </a>
        </Link>
        {/*  <Link href="#" prefetch={false} legacyBehavior>
          <a className="text-sm font-medium hover:underline underline-offset-4">
            {t("contact")}
          </a>
        </Link> */}
      </nav>
    </header>
  );
}

function CalendarIcon(props: React.SVGAttributes<SVGSVGElement>) {
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
