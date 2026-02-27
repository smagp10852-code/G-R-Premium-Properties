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
    <section className="py-20 bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {t("developerDetail.about")} {developer.name}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl text-base md:text-lg">
          {getLocalized(developer, "about")}
        </p>

      </div>
    </section>
  );
}