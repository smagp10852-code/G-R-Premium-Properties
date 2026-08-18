"use client";

import { useTranslation } from "@/lib/language-context";
import DeveloperCardClient from "@/components/sections/DeveloperCardClient";

interface Developer {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  shortDescription?: string;
  shortDescription_hi?: string;
  shortDescription_ar?: string;
  shortDescription_ru?: string;
}

interface Props {
  developers: Developer[];
}

export default function DeveloperSection({ developers }: Props) {
  const { t } = useTranslation();

  if (!developers?.length) return null;

  // Duplicated once so the CSS animation can loop seamlessly (scrolls
  // exactly -50% then jumps back to 0, which lands on an identical copy —
  // no visible seam/jump).
  const marqueeItems = [...developers, ...developers];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300 font-body">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADING */}
        <div className="text-center mb-14">
          <span className="font-body text-[#C9A227] text-sm font-semibold tracking-[0.2em] uppercase">
            {t("developer.developers")}
          </span>

          <h2 className="font-heading text-4xl text-gray-900 dark:text-white mt-3">
            {t("developer.trustedDevelopers")}
          </h2>

          <p className="font-body mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {t("developer.description")}
          </p>
        </div>
      </div>

      {/* AUTO-SCROLLING STRIP — constrained to the SAME max-w-7xl container
          as every other section on the page (not full-bleed edge-to-edge).
          overflow-hidden lives on this inner wrapper so cards visually
          scroll off at the container's own edges, matching the width of
          "Trusted Developers" heading above it. */}
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="marquee-track flex gap-4 sm:gap-6 w-max">
          {marqueeItems.map((dev, index) => (
            <div key={`${dev._id}-${index}`} className="w-[150px] sm:w-[220px] lg:w-[280px] flex-shrink-0">
              <DeveloperCardClient developer={dev} logoUrl={dev.logo} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}