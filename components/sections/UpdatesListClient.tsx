"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

const goldenColor = "#C9A227";

interface UpdateItem {
  _id: string;
  text: string;
  text_hi?: string;
  text_ar?: string;
  text_ru?: string;
  slug?: string;
  expiresAt?: string;
  image?: string;
}

function useCountdownLabel(expiresAt?: string) {
  const [label, setLabel] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setExpired(true);
        setLabel(null);
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const threeDays = 3 * 86400000;
      if (diff > threeDays) {
        setLabel(null);
        return;
      }
      setLabel(days > 0 ? `${days}d ${hours}h left` : `${hours}h left`);
    };

    tick();
    const timer = setInterval(tick, 60_000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return { label, expired };
}

function UpdateCard({ item }: { item: UpdateItem }) {
  const { lang } = useTranslation();
  const { label: countdown, expired } = useCountdownLabel(item.expiresAt);

  // Extra client-side safety net — even though the GROQ query already
  // filters out expired items server-side, this hides one instantly if it
  // crosses the line while the tab is open (no full page refresh needed).
  if (expired) return null;
  if (!item.slug) return null; // no detail page to open — skip rendering

  const localizedText =
    lang === "en" ? item.text : (item as any)[`text_${lang}`] || item.text;

  // ✅ Every update opens its own detail page, same as announcements.
  const href = `/updates/${item.slug}`;

  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden bg-white dark:bg-[#1E293B]
                 border border-gray-100 dark:border-white/10 shadow-md hover:shadow-xl
                 transition-all duration-300"
    >
      {/* Image / fallback */}
      <div className="relative h-44 w-full overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={localizedText}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse at top right, #3a3a3a 0%, #161616 60%, #0a0a0a 100%)",
            }}
          />
        )}

        {countdown && (
          <span
            className="absolute top-3 right-3 font-body font-semibold text-[11px] px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${goldenColor}E6`, color: "#000" }}
          >
            {countdown}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-body text-gray-900 dark:text-white text-base leading-snug line-clamp-3">
          {localizedText}
        </p>

        <span
          className="inline-block mt-4 font-body font-semibold text-xs uppercase tracking-wide group-hover:underline"
          style={{ color: goldenColor }}
        >
          Click Now →
        </span>
      </div>
    </Link>
  );
}

const PAGE_SIZE = 6;

export default function UpdatesListClient({ updates }: { updates: UpdateItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-body text-gray-500 dark:text-gray-400 text-base">
          No active updates right now — check back soon.
        </p>
      </div>
    );
  }

  const visibleUpdates = updates.slice(0, visibleCount);
  const hasMore = visibleCount < updates.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleUpdates.map((item) => (
          <UpdateCard key={item._id} item={item} />
        ))}
      </div>

      {/* ✅ Only shown while more items remain beyond what's currently
          visible — disappears once every update has been revealed. */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="font-body font-semibold uppercase tracking-wide text-sm px-8 py-3 rounded-xl
                       text-black transition hover:opacity-90"
            style={{ backgroundColor: goldenColor }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}