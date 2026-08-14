"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

  // Homepage shows only the top 4 — full list lives on /developers
  const displayDevelopers = developers.slice(0, 4);

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300 font-body">
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== HEADING ===== */}
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

        {/* ===== STATIC GRID ===== */}
        {/* 2 columns on mobile/tablet (all 4 cards, 2x2), 3 columns from lg
            (1024px) up. The 4th card is hidden exactly at lg so laptop/iPad
            Pro get a clean single row of 3 instead of an orphan 4th card
            wrapping alone to a second row — same pattern as the properties
            grid on this homepage. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayDevelopers.map((dev, index) => (
            <motion.div
              key={dev._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={index === 3 ? "lg:hidden" : ""}
            >
              <DeveloperCardClient developer={dev} logoUrl={dev.logo} />
            </motion.div>
          ))}
        </div>

        {/* ===== VIEW ALL BUTTON ===== */}
        <div className="text-center mt-16">
          <Link
            href="/developers"
            className="font-body inline-flex items-center gap-2 px-10 py-4 border-2 border-[#C9A227] text-[#C9A227] rounded-full hover:bg-[#C9A227] hover:text-black transition-all duration-300"
          >
            {t("developer.viewAllDevelopers")}
          </Link>
        </div>
      </div>
    </section>
  );
}