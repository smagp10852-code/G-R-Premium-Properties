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
  url?: string;
  expiresAt?: string;
  linkedProperty?: { slug?: string; title?: string; image?: string } | null;
}

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
      setLabel(days > 0 ? `${days}d ${hours}h left` : `${hours}h left`);
    };

    tick();
    const timer = setInterval(tick, 60_000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return label;
}

function UpdateCard({ item }: { item: UpdateItem }) {
  const { lang } = useTranslation();
  const countdown = useCountdownLabel(item.expiresAt);

  if (countdown === "Expired") return null;

  const localizedText =
    lang === "en" ? item.text : (item as any)[`text_${lang}`] || item.text;

  const href = item.linkedProperty?.slug
    ? `/properties/${item.linkedProperty.slug}`
    : item.url || "#";

  const image = item.linkedProperty?.image;

  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-[#0F172A]">
        {image ? (
          <img
            src={image}
            alt={item.linkedProperty?.title || "Update"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${goldenColor}30, #16161630)` }}
          >
            <span className="font-heading text-4xl" style={{ color: goldenColor }}>
              GR
            </span>
          </div>
        )}

        {countdown && (
          <span
            className="absolute top-3 right-3 font-body text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: goldenColor, color: "#000" }}
          >
            {countdown}
          </span>
        )}
      </div>

      <div className="p-5">
        {item.linkedProperty?.title && (
          <p
            className="font-body text-xs font-semibold uppercase tracking-wide mb-1"
            style={{ color: goldenColor }}
          >
            {item.linkedProperty.title}
          </p>
        )}
        <p className="font-body text-sm text-gray-800 dark:text-gray-100 leading-snug">
          {localizedText}
        </p>
        <span
          className="inline-block mt-3 font-body text-xs font-semibold uppercase tracking-wide group-hover:underline"
          style={{ color: goldenColor }}
        >
          Click Now →
        </span>
      </div>
    </Link>
  );
}

export default function UpdatesListClient({ updates }: { updates: UpdateItem[] }) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-body text-gray-500 dark:text-gray-400 text-lg">
          No active updates or offers right now — check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {updates.map((item) => (
        <UpdateCard key={item._id} item={item} />
      ))}
    </div>
  );
}