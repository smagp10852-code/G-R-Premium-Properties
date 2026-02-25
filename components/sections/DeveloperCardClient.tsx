"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

interface Developer {
  _id: string;
  name: string;
  shortDescription?: string;
  slug: string;
  logo?: any;
  [key: string]: any;
}

export default function DeveloperCardClient({
  developer,
  logoUrl,
}: {
  developer: Developer;
  logoUrl?: string;
}) {
  const { t, lang } = useTranslation();

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition duration-300">
      <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={developer.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            {t("developersPage.noImage")}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {developer.name}
        </h3>

        {getLocalized(developer, "shortDescription") && (
          <p className="text-sm text-gray-700 mt-3 line-clamp-3">
            {getLocalized(developer, "shortDescription")}
          </p>
        )}

        <Link
          href={`/developers/${developer.slug}`}
          className="inline-flex items-center mt-5 text-[#C9A227] font-medium hover:underline"
        >
          {t("developersPage.viewProjects")}
        </Link>
      </div>
    </div>
  );
}
