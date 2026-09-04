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
}

interface HeroOfferPanelProps {
  updates: UpdateItem[];
  // Smaller, tighter version — used on mobile below the search bar so it
  // doesn't push the rest of the hero content down too much.
  compact?: boolean;
}

// "2d 4h left" style — only used once an item is inside its final 3 days.
function useCountdownLabel(expiresAt?: string) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setLabel("Expired");
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

  return label;
}

function UpdateRow({ item, compact }: { item: UpdateItem; compact?: boolean }) {
  const { lang } = useTranslation();
  const countdown = useCountdownLabel(item.expiresAt);

  if (countdown === "Expired") return null;
  if (!item.slug) return null; // no detail page to open — skip rendering

  const localizedText =
    lang === "en" ? item.text : (item as any)[`text_${lang}`] || item.text;

  // ✅ Every update now opens its own detail page, same as announcements.
  const href = `/updates/${item.slug}`;

  return (
    <Link
      href={href}
      className={`group flex items-start gap-2 border-b border-white/10 last:border-b-0 hover:pl-1 transition-all duration-200 ${
        compact ? "py-1.5" : "py-2.5 gap-2.5"
      }`}
    >
      <span
        className={`rounded-full shrink-0 ${compact ? "mt-1 h-1 w-1" : "mt-1.5 h-1.5 w-1.5"}`}
        style={{ backgroundColor: goldenColor }}
      />
      <span className="flex-1 min-w-0">
        <span
          className={`font-body text-white/90 group-hover:text-white leading-snug line-clamp-1 ${
            compact ? "text-xs" : "text-sm line-clamp-2"
          }`}
        >
          {localizedText}
        </span>
        <span
          className={`block font-body font-semibold uppercase tracking-wide group-hover:underline ${
            compact ? "text-[10px] mt-0.5" : "text-[11px] mt-1"
          }`}
          style={{ color: goldenColor }}
        >
          Click Now
        </span>
      </span>
      {countdown && (
        <span
          className={`shrink-0 font-body font-semibold rounded-full whitespace-nowrap ${
            compact ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-1"
          }`}
          style={{ backgroundColor: `${goldenColor}26`, color: goldenColor }}
        >
          {countdown}
        </span>
      )}
    </Link>
  );
}

// ✅ No absolute positioning — plain block-level card. Hero.tsx places it
// inside the right column of a 2-column grid (desktop) or below the search
// bar in `compact` mode (mobile).
export default function HeroOfferPanel({ updates, compact = false }: HeroOfferPanelProps) {
  if (!updates || updates.length === 0) return null;

  // Hero box only ever shows a max of 3 rows, no matter how many active
  // updates exist in Sanity (2, 5, 10...). The parent query fetches up to
  // 4 — if a 4th item came back, that's the signal there are more than 3
  // total, so "View All" appears; otherwise it's hidden.
  const visibleUpdates = updates.slice(0, 3);
  const hasMore = updates.length > 3;

  return (
    <div
      className="w-full rounded-2xl overflow-hidden
                 bg-white/10 backdrop-blur-md border border-white/15 shadow-2xl"
    >
      <div
        className={`border-b ${compact ? "px-3 pt-2.5 pb-1.5" : "px-5 pt-4 pb-3"}`}
        style={{ borderColor: `${goldenColor}40` }}
      >
        <h3
          className={`font-heading font-bold tracking-wide ${compact ? "text-sm" : "text-lg"}`}
          style={{ color: goldenColor }}
        >
          Latest Update
        </h3>
      </div>

      <div className={compact ? "px-3" : "px-5"}>
        {visibleUpdates.map((item) => (
          <UpdateRow key={item._id} item={item} compact={compact} />
        ))}
      </div>

      {/* ✅ Only shown when there are more than 3 active updates total —
          points to the /updates listing page (see app/updates/page.tsx). */}
      {hasMore && (
        <Link
          href="/updates"
          className={`block text-center font-body font-semibold uppercase tracking-wide
                     text-black transition hover:opacity-90 ${
                       compact ? "text-[10px] py-1.5" : "text-xs py-3"
                     }`}
          style={{ backgroundColor: goldenColor }}
        >
          View All
        </Link>
      )}
    </div>
  );
}