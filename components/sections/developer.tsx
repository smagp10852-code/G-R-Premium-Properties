"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

/* ================= TYPES ================= */

interface Developer {
  _id: string;
  name: string;
  shortDescription?: string;
  slug?: {
    current: string;
  };
  heroImage?: {
    asset?: {
      url?: string;
    };
  };
}

/* ================= ANIMATION ================= */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const PLACEHOLDER = "/images/placeholder.jpg";

/* ================= COMPONENT ================= */

export default function DeveloperSection({
  developers,
}: {
  developers: Developer[];
}) {
  const { t, lang } = useTranslation();

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  if (!developers?.length) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-14">
          <span className="text-[#C9A227] text-sm font-semibold tracking-[0.2em] uppercase">
            {t("developer.developers")}
          </span>

          <h2 className="text-4xl font-serif text-gray-900 dark:text-white mt-3">
            {t("developer.trustedDevelopers")}
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {t("developer.description")}
          </p>
        </div>

        {/* GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {developers.map((dev) => {
            const imageUrl = dev.heroImage?.asset?.url || PLACEHOLDER;

            return (
              <motion.div
                key={dev._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="
                  bg-white 
                  dark:bg-[#111827]
                  rounded-2xl 
                  shadow-lg 
                  hover:shadow-2xl 
                  transition 
                  overflow-hidden 
                  flex 
                  flex-col
                "
              >
                {/* IMAGE */}
                <div className="relative w-full h-56">
                  <Image
                    src={imageUrl}
                    alt={dev.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {dev.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-3 flex-1">
                    {getLocalized(dev, "shortDescription") ||
                      t("developer.defaultDescription")}
                  </p>

                  <Link
                    href={`/developers/${dev.slug?.current || ""}`}
                    className="
                      mt-6 
                      inline-block 
                      text-center 
                      bg-[#C9A227] 
                      text-black 
                      font-medium 
                      py-3 
                      rounded-lg 
                      hover:bg-[#b8961f] 
                      transition
                    "
                  >
                    {t("developer.viewProjects")}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-16">
          <Link
            href="/developers"
            className="
              inline-flex 
              items-center 
              gap-2 
              px-10 
              py-4 
              border-2 
              border-[#C9A227] 
              text-[#C9A227] 
              rounded-full 
              hover:bg-[#C9A227] 
              hover:text-black 
              transition-all 
              duration-300
            "
          >
            {t("developer.viewAllDevelopers")}
          </Link>
        </div>

      </div>
    </section>
  );
}
