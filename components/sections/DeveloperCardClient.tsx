"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

interface Developer {
  _id: string;
  name: string;
  shortDescription?: string;
  shortDescription_hi?: string;
  shortDescription_ar?: string;
  shortDescription_ru?: string;
  slug: any; // string or { current: string }
  logo?: string;
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

  /* ================= LOCALIZED TEXT ================= */
  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  /* ================= SAFE SLUG ================= */
  const slugValue =
    typeof developer.slug === "string"
      ? developer.slug
      : developer.slug?.current;

  return (
    <div className="group rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">

      {/* ================= IMAGE SECTION ================= */}
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center p-6">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={developer.name}
            width={500}
            height={300}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">
            {t("developersPage.noImage")}
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6 flex flex-col flex-1">

        <h3 className="text-xl font-semibold text-gray-900">
          {developer.name}
        </h3>

        {getLocalized(developer, "shortDescription") && (
          <p className="text-sm text-gray-700 mt-3 line-clamp-3 flex-1">
            {getLocalized(developer, "shortDescription")}
          </p>
        )}

        {slugValue && (
          <Link
            href={`/developers/${slugValue}`}
            className="mt-5 inline-flex items-center text-[#C9A227] font-medium hover:underline"
          >
            {t("developersPage.viewProjects")} 
          </Link>
        )}

      </div>
    </div>
  );
}