"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

const goldenColor = "#C9A227";

// "2026-09-05" -> "5th Sep. 2026"
function formatEventDate(dateStr?: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day}${suffix} ${month}. ${year}`;
}

interface UpdateData {
  _id: string;
  text: string;
  text_hi?: string;
  text_ar?: string;
  text_ru?: string;
  description?: string;
  description_hi?: string;
  description_ar?: string;
  description_ru?: string;
  points?: string[];
  location?: string;
  expiresAt?: string;
  mainImage?: { asset?: { url?: string } };
  url?: string;
  linkedProperty?: { slug?: string; title?: string } | null;
}

export default function UpdateDetailClient({ update }: { update: UpdateData }) {
  const { lang } = useTranslation();

  const getLocalized = (field: string) => {
    if (lang === "en") return (update as any)[field];
    return (update as any)[`${field}_${lang}`] || (update as any)[field];
  };

  const title = getLocalized("text");
  const description = getLocalized("description");
  const points = update.points || [];

  // Same priority as before: an internal linked property wins over a
  // plain custom URL for the CTA button target.
  const ctaHref = update.linkedProperty?.slug
    ? `/properties/${update.linkedProperty.slug}`
    : update.url || null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 font-body">
      <div className="bg-white dark:bg-[#1E293B] shadow-xl rounded-3xl p-10 border border-gray-100 dark:border-white/10">
        {/* Title */}
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>

        {/* Expiry / Location */}
        {(update.expiresAt || update.location) && (
          <div className="flex flex-wrap gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8">
            {update.expiresAt && (
              <span>⏳ Valid until {formatEventDate(update.expiresAt)}</span>
            )}
            {update.location && <span>📍 {update.location}</span>}
          </div>
        )}

        {/* Image */}
        {update.mainImage?.asset?.url && (
          <div className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl p-6 mb-10 flex justify-center">
            <img
              src={update.mainImage.asset.url}
              alt={title}
              className="max-h-[500px] w-auto object-contain"
            />
          </div>
        )}

        {/* Bullet Points */}
        {points.length > 0 && (
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-200 text-lg mb-8">
            {points.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        {/* Description */}
        {description && (
          <div className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line text-lg mb-10">
            {description}
          </div>
        )}

        {/* CTA buttons — internal/property link + WhatsApp, side by side */}
        <div className="flex flex-wrap gap-4">
          {ctaHref && (
            <Link
              href={ctaHref}
              className="inline-block font-body font-semibold text-black px-8 py-3 rounded-xl transition hover:opacity-90"
              style={{ backgroundColor: goldenColor }}
            >
              {update.linkedProperty?.title
                ? `View ${update.linkedProperty.title}`
                : "Learn More"}
            </Link>
          )}

          {/* ✅ Same WhatsApp pattern as the announcement detail page. */}
          <a
            href={`https://wa.me/971585964689?text=${encodeURIComponent(
              `Hi, I'm interested in: ${title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-semibold bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
          >
            📲 Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}