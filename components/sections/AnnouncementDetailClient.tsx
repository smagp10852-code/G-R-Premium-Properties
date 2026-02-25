"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";
import T from "@/components/ui/T";

export default function AnnouncementDetailClient({
  announcement,
}: {
  announcement: any;
}) {
  const { lang } = useTranslation();

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  const title = getLocalized(announcement, "title");
  const description = getLocalized(announcement, "description");
  const city = getLocalized(announcement, "city");
  const points = getLocalized(announcement, "points") || [];

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="bg-white shadow-xl rounded-3xl p-10 border border-gray-100">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* Date & City */}
        <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-8">
          {announcement.eventDate && (
            <span>📅 {announcement.eventDate}</span>
          )}
          {city && <span>📍 {city}</span>}
        </div>

        {/* Sanity Image - FULL visible (no crop) */}
        {announcement.mainImage?.asset?.url && (
          <div className="w-full bg-gray-50 rounded-2xl p-6 mb-10 flex justify-center">
            <img
              src={announcement.mainImage.asset.url}
              alt={title}
              className="max-h-[500px] w-auto object-contain"
            />
          </div>
        )}

        {/* Bullet Points */}
        {points?.length > 0 && (
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg mb-8">
            {points.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        {/* Description */}
        {description && (
          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {description}
          </div>
        )}

        
      </div>
    </section>
  );
}
