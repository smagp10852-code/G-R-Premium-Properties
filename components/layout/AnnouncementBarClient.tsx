"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

interface Announcement {
  title: string;
  [key: string]: any;
}

// Turns Sanity's raw date ("2026-09-05") into "5th Sep." — day with an
// ordinal suffix + abbreviated month with a trailing period.
function formatEventDate(dateStr?: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // fallback if unparsable

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleString("en-US", { month: "short" }); // "Sep"

  return `${day}${suffix} ${month}.`;
}

export default function AnnouncementBarClient({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const { t, lang } = useTranslation();

  if (!announcements.length) return null;

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    const localized = item[`${field}_${lang}`];
    return localized || item[field];
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#D4AF37] text-black text-sm py-2 z-[2000] overflow-hidden font-body">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {announcements.map((item: any, index: number) => (
            <span
              key={index}
              className="mx-8 inline-flex items-center gap-4"
            >
              📅 {formatEventDate(item.eventDate)} – {getLocalized(item, "city")} 🔥{" "}
              {getLocalized(item, "title")}
              {item.slug && (
                <Link
                  href={`/announcement/${item.slug}`}
                  className="font-body bg-black text-white px-3 py-1 rounded text-xs font-semibold"
                >
                  {t("announcement.viewDetails")}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}