"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/language-context";

/* ================= TYPES ================= */

interface HeroSlide {
  title: string;
  subtitle?: string;
  title_hi?: string;
  title_ar?: string;
  title_ru?: string;
  subtitle_hi?: string;
  subtitle_ar?: string;
  subtitle_ru?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
  active?: boolean;
  linkedProperty?: {
    _id: string;
    title: string;
    slug: string;
    developer?: {
      name: string;
      slug: string;
    };
  };
  [key: string]: any;
}


interface Community {
  _id: string;
  name: string;
  area: string;
}

interface HeroProps {
  slides: HeroSlide[];
  ctaText: string;
  ctaText_hi?: string;
  ctaText_ar?: string;
  ctaText_ru?: string;
  communities: Community[];
}

const goldenColor = "#C9A227";
const PLACEHOLDER_IMAGE = "/images/placeholder.png";

/* ================= COMPONENT ================= */

export default function Hero({
  slides = [],
  ctaText,
  ctaText_hi,
  ctaText_ar,
  ctaText_ru,
  communities = [],
}: HeroProps) {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useTranslation();

  const getSlideText = (slide: HeroSlide, field: string) => {
    if (lang === "en") return slide[field];
    return slide[`${field}_${lang}`] || slide[field];
  };

  const localizedCTA = lang === "en" ? ctaText
    : (lang === "hi" ? ctaText_hi : lang === "ar" ? ctaText_ar : ctaText_ru) || ctaText;

  /* ================= SAFE SLIDES ================= */

  const validSlides = slides.filter((s) => s?.image?.asset?.url);
  const activeSlides =
    validSlides.filter((s) => s.active) || validSlides;
  const slidesToUse =
    activeSlides.length > 0 ? activeSlides : validSlides;

  if (!slidesToUse || slidesToUse.length === 0) {
    return (
      <section className="h-[80vh] flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] transition-colors duration-300">
        <p className="font-body text-gray-500 dark:text-gray-400 text-lg">
          {t("hero.loading")}
        </p>
      </section>
    );
  }

  /* ================= STATE ================= */

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [buyType, setBuyType] = useState<"buy" | "rent">("buy");
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");


  /* ================= SLIDER ================= */

  const changeSlide = (newIndex: number) => {
    if (slidesToUse.length < 2) return;

    setPrevIndex(index);
    setIndex(newIndex);
  };





  useEffect(() => {
    if (slidesToUse.length < 2) return;

    const timer = setInterval(() => {
      setPrevIndex((prev) => prev);
      setIndex((prev) => (prev + 1) % slidesToUse.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slidesToUse]);




  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= FILTER ================= */

  const filtered = query.trim()
    ? communities.filter(
      (c) =>
        c.name?.toLowerCase().includes(query.toLowerCase()) ||
        c.area?.toLowerCase().includes(query.toLowerCase())
    )
    : communities;

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(
      `/properties?search=${encodeURIComponent(query)}&purpose=${buyType}`
    );

    setShowSuggestions(false);
  };

  /* ================= JSX ================= */

  return (
    <section className="relative h-[83vh] w-full text-white overflow-hidden font-body">
      {/* ================= IMAGE SLIDER ================= */}
      <div className="absolute inset-0">
        {slidesToUse.map((slide, i) => {
          const imageUrl =
            slide?.image?.asset?.url || PLACEHOLDER_IMAGE;

          return (
            <div
              key={i}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${i === index
                ? "translate-x-0 z-[2]"
                : i === prevIndex
                  ? "-translate-x-full z-[1]"
                  : "translate-x-full"
                }`}



            >
              <img
                src={imageUrl}
                alt={slide.title || "Hero Image"}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[2] pointer-events-none" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-30 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full">
          <h1 className="font-heading text-4xl md:text-6xl font-bold">
            {getSlideText(slidesToUse[index], "title")}
          </h1>

          {slidesToUse[index].subtitle && (
            <p className="font-body mt-4 text-gray-200 text-lg">
              {getSlideText(slidesToUse[index], "subtitle")}
            </p>
          )}

          <button
            onClick={() => {
              const developerSlug =
                slidesToUse[index]?.linkedProperty?.developer?.slug;

              if (developerSlug) {
                router.push(`/developers/${developerSlug}`);
              }
            }}
            className="font-body mt-8 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition"
          >
            {localizedCTA}
          </button>



          {/* ================= SEARCH ================= */}
          <div
            ref={searchRef}
            className="relative mt-10 w-full max-w-xl"
          >
            <div className="flex items-center bg-white dark:bg-[#1E293B] 
                            text-gray-900 dark:text-white 
                            rounded-xl shadow-xl overflow-hidden transition-colors duration-300">

              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t("hero.communityOrBuilding")}
                className="font-body flex-1 px-4 py-3 bg-transparent outline-none text-sm"
              />

              <button
                onClick={handleSearch}
                className="font-body px-6 py-3 text-white text-sm font-medium transition"
                style={{ backgroundColor: goldenColor }}
              >
                {t("hero.search")}
              </button>
            </div>

            {/* ================= SUGGESTIONS ================= */}
            {showSuggestions && filtered.length > 0 && (
              <div
                className="absolute left-0 top-full w-full 
             bg-white dark:bg-[#1E293B] 
             shadow-xl rounded-lg mt-2 
             z-50 
             max-h-[160px] 
             overflow-y-auto
             text-sm
             transition-colors duration-300"
              >



                {filtered.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => {
                      router.push(
                        `/properties?search=${encodeURIComponent(
                          c.name
                        )}&purpose=${buyType}`
                      );
                      setShowSuggestions(false);
                    }}
                    className="font-body px-4 py-3 cursor-pointer 
                               hover:bg-amber-50 
                               dark:hover:bg-white/10 transition"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">
                      {c.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {c.area}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

     

    </section>
  );
}