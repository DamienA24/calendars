import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n";
import { Download, Printer } from "lucide-react";

export const generateMetadata = async ({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> => {
  const { t } = await useTranslation(lng);

  const metadataBase = new URL("https://www.calendohub.com"); // Remplacez par l'URL réelle de votre site
  const title = t("home_title");
  const description = t("home_description");
  const keywords = t("home_keywords");

  return {
    metadataBase,
    title,
    description,
    keywords,
    alternates: {
      canonical: "/",
      languages: {
        fr: "/fr",
        en: "/en",
        es: "/es",
        pt: "/pt",
      },
    },
  };
};

const Home = async ({ params: { lng } }: { params: { lng: string } }) => {
  const { t } = await useTranslation(lng);

  return (
    <main className="">
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="flex flex-col items-center px-4 md:px-6">
          <h1 className="text-4xl text-center font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t("presentation")}
          </h1>
          <Link href={`${lng}/${t("calendars_link")}`}>
            <Button className="mt-8 text-xl" size={"lg"}>
              {t("your_calendar")}
            </Button>
          </Link>
        </div>
      </section>
      <section className="w-full pb-12 md:pb-24 lg:pb-32">
        <div className="px-4 md:px-6">
          <div className="flex justify-around">
            <div className="flex flex-col items-center gap-4">
              <Download className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">{t("t_download")}</h3>
              <p className="text-muted-foreground">{t("download")} </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Printer className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">{t("t_print")}</h3>
              <p className="text-muted-foreground">{t("print")} </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
