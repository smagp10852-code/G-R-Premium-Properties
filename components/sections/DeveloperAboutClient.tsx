"use client";

import { useTranslation } from "@/lib/language-context";

export default function DeveloperAboutClient({
  developer,
}: {
  developer: any;
}) {
  const { t, lang } = useTranslation();

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">
          {t("developerDetail.about")} {developer.name}
        </h2>

        <p className="text-gray-600 leading-relaxed max-w-4xl">
          {getLocalized(developer, "about")}
        </p>
      </div>
    </section>
  );
}
