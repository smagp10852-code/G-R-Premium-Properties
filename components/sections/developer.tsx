"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/language-context";
import DeveloperCardClient from "@/components/sections/DeveloperCardClient";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Duplicate slides if less than 4 (so desktop can loop)
  const sliderData = useMemo(() => {
    if (!developers) return [];
    if (developers.length < 4) {
      return [...developers, ...developers];
    }
    return developers;
  }, [developers]);

  if (!mounted || !sliderData.length) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 relative">

        {/* ===== HEADING ===== */}
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

        {/* ===== SLIDER ===== */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {sliderData.map((dev, index) => (
            <SwiperSlide key={`${dev._id}-${index}`}>
              <DeveloperCardClient
                developer={dev}
                logoUrl={dev.logo}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===== VIEW ALL BUTTON ===== */}
        <div className="text-center mt-16">
          <Link
            href="/developers"
            className="inline-flex items-center gap-2 px-10 py-4 border-2 border-[#C9A227] text-[#C9A227] rounded-full hover:bg-[#C9A227] hover:text-black transition-all duration-300"
          >
            {t("developer.viewAllDevelopers")}
          </Link>
        </div>

      </div>
    </section>
  );
}