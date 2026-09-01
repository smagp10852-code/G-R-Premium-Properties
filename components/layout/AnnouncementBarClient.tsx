"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/language-context";

// "2026-09-27" -> "27th Sep. 2026"
// Same suffix logic as AnnouncementDetailClient, but includes the year
// since the requested banner format needs it: "🗓️ 27th Sep. 2026"
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

export default function AnnouncementBarClient({
  announcements,
}: {
  announcements: any[];
}) {
  const { lang, t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);

  if (!announcements?.length || dismissed) return null;

  // Bar shows the single latest/first announcement (matches the current
  // single-row banner in the screenshot). If you actually need to rotate
  // through multiple announcements, say so and I'll add a marquee/rotator.
  const announcement = announcements[0];

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  const title = getLocalized(announcement, "title");
  const venue = getLocalized(announcement, "venue");
  const formattedDate = formatEventDate(announcement.eventDate);
  const slug = announcement.slug?.current || announcement.slug;

  return (
    <div className="w-full bg-[#D4A843] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        <p className="flex-1 min-w-0 truncate text-sm sm:text-base font-medium">
          🔥 Join {title}
          {formattedDate && <span>, 🗓️ {formattedDate}</span>}
          {venue && <span>, 📍 {venue}</span>}
        </p>

        <div className="flex items-center gap-3 flex-shrink-0">
          {slug && (
            <Link
              href={`/announcement/${slug}`}
              className="px-4 py-1.5 rounded-md bg-black text-white text-xs sm:text-sm font-semibold whitespace-nowrap hover:opacity-90 transition"
            >
              View Details
            </Link>
          )}

          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setDismissed(true)}
            className="text-black/70 hover:text-black text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}