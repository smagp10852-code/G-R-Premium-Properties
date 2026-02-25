"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

interface Announcement {
  title: string;
  [key: string]: any;
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
    <div className="fixed top-0 left-0 w-full bg-[#D4AF37] text-black text-sm py-2 z-[2000] overflow-hidden">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {announcements.map((item: any, index: number) => (
            <span
              key={index}
              className="mx-8 inline-flex items-center gap-4"
            >
              📅 {item.eventDate} – {getLocalized(item, "city")} 🔥{" "}
              {getLocalized(item, "title")}
              {item.slug && (
                <Link
                  href={`/announcement/${item.slug}`}
                  className="bg-black text-white px-3 py-1 rounded text-xs font-semibold"
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
