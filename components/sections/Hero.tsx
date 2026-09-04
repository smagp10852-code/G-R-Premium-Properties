"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/language-context";
import HeroOfferPanel from "./HeroOfferPanel";

/* ================= TYPES ================= */

interface HeroSlide {
  mediaType?: "image" | "video";
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
  video?: {
    asset?: {
      _id?: string;
      url?: string;
      mimeType?: string;
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

// Matches the item shape returned by `latestUpdatesQuery` in lib/sanity.queries.ts
interface UpdateItem {
  _id: string;
  text: string;
  text_hi?: string;
  text_ar?: string;
  text_ru?: string;
  url?: string;
  expiresAt?: string;
  linkedProperty?: { slug?: string } | null;
}

interface HeroProps {
  slides: HeroSlide[];
  ctaText: string;
  ctaText_hi?: string;
  ctaText_ar?: string;
  ctaText_ru?: string;
  communities: Community[];
  // Optional — "Latest Update" / limited-offer box. Desktop: right column
  // of the hero. Mobile: compact version below the search bar. Pass [] or
  // omit if there are no latestUpdate docs in Sanity yet; nothing renders.
  updates?: UpdateItem[];
}

const goldenColor = "#C9A227";

// Used only as a last-resort CSS fallback — never an <img src>, so there is
// zero risk of a broken-image icon showing on mobile if a slide has no
// image/poster set in Sanity.
const FALLBACK_GRADIENT =
  "bg-[radial-gradient(ellipse_at_top_right,_#3a3a3a_0%,_#161616_60%,_#0a0a0a_100%)]";

// Old slides with no mediaType saved -> treat as "image" (backward compatible)
const getSlideMediaType = (slide: HeroSlide): "image" | "video" =>
  slide.mediaType === "video" ? "video" : "image";

const slideHasValidMedia = (slide: HeroSlide) => {
  const type = getSlideMediaType(slide);
  if (type === "video") return !!slide?.video?.asset?.url;
  return !!slide?.image?.asset?.url;
};

/* ================= COMPONENT ================= */

export default function Hero({
  slides = [],
  ctaText,
  ctaText_hi,
  ctaText_ar,
  ctaText_ru,
  communities = [],
  updates = [],
}: HeroProps) {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useTranslation();

  const getSlideText = (slide: HeroSlide, field: string) => {
    if (lang === "en") return slide[field];
    return slide[`${field}_${lang}`] || slide[field];
  };

  const localizedCTA =
    lang === "en"
      ? ctaText
      : (lang === "hi" ? ctaText_hi : lang === "ar" ? ctaText_ar : ctaText_ru) ||
        ctaText;

  /* ================= SAFE SLIDES ================= */

  const validSlides = slides.filter(slideHasValidMedia);
  const activeSlides = validSlides.filter((s) => s.active) || validSlides;
  const slidesToUse = activeSlides.length > 0 ? activeSlides : validSlides;

  const hasUpdates = updates && updates.length > 0;
  // Mobile shows only the single most important (first) offer, compactly —
  // keeps the hero from growing too tall with a long list on small screens.
  const mobileUpdates = updates.slice(0, 1);

  if (!slidesToUse || slidesToUse.length === 0) {
    return (
      <section className="h-[70vh] sm:h-[75vh] lg:h-[70vh] xl:h-[81vh] flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] transition-colors duration-300">
        <p className="font-body text-gray-500 dark:text-gray-400 text-base sm:text-lg">
          {t("hero.loading")}
        </p>
      </section>
    );
  }

  /* ================= STATE ================= */

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Tracks which slide images failed to load (404 / broken URL) so we can
  // gracefully fall back to the branded gradient instead of a broken-image icon.
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Video plays on every device (mobile, tablet, desktop) as requested —
  // but we only ever mount the <video> tag for a slide once that slide has
  // actually been shown. This stops the browser from downloading every
  // slide's video upfront on page load, which would otherwise hit mobile
  // data hard. Slide 0 is loaded immediately since it's visible on first paint.
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));

  /* ================= SLIDER ================= */

  useEffect(() => {
    if (slidesToUse.length < 2) return;

    const timer = setInterval(() => {
      setPrevIndex((prev) => prev);
      setIndex((prev) => (prev + 1) % slidesToUse.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slidesToUse]);

  // Whenever the active slide changes, mark it as loaded so its real
  // image/video gets mounted from here on (and stays mounted — it won't
  // re-download next time it's shown again).
  useEffect(() => {
    setLoadedSlides((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, [index]);

  const goPrev = () => {
    if (slidesToUse.length < 2) return;
    setPrevIndex(index);
    setIndex((prev) => (prev - 1 + slidesToUse.length) % slidesToUse.length);
  };

  const goNext = () => {
    if (slidesToUse.length < 2) return;
    setPrevIndex(index);
    setIndex((prev) => (prev + 1) % slidesToUse.length);
  };

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
    router.push(`/properties?search=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
  };

  /* ================= JSX ================= */

  return (
    <section
      className="relative w-full text-white overflow-hidden font-body
                 min-h-[560px] sm:h-[75vh] lg:h-[70vh] xl:h-[81vh]"
    >
      {/* ================= MEDIA SLIDER ================= */}
      <div className="absolute inset-0">
        {slidesToUse.map((slide, i) => {
          const mediaType = getSlideMediaType(slide);
          const isLoaded = loadedSlides.has(i);
          const useVideo = mediaType === "video" && isLoaded && !!slide?.video?.asset?.url;

          const imageUrl = slide?.image?.asset?.url;
          const hasWorkingImage = !!imageUrl && !failedImages.has(i);

          const positionClass =
            i === index
              ? "translate-x-0 z-[2]"
              : i === prevIndex
              ? "-translate-x-full z-[1]"
              : "translate-x-full";

          return (
            <div
              key={i}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${positionClass}`}
            >
              {useVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload={i === index ? "auto" : "metadata"}
                  poster={hasWorkingImage ? imageUrl : undefined}
                  className={`absolute inset-0 w-full h-full object-cover ${
                    hasWorkingImage ? "" : FALLBACK_GRADIENT
                  }`}
                >
                  <source
                    src={slide.video!.asset!.url}
                    type={slide.video!.asset!.mimeType || "video/mp4"}
                  />
                </video>
              ) : hasWorkingImage ? (
                <img
                  src={imageUrl}
                  alt={slide.title || "Hero Image"}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  onError={() =>
                    setFailedImages((prev) => new Set(prev).add(i))
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full ${FALLBACK_GRADIENT}`} />
              )}
            </div>
          );
        })}

        {/* Dark Overlay — slightly stronger on mobile so text stays readable on small screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 sm:from-black/60 sm:via-black/20 sm:to-transparent z-[2] pointer-events-none" />
      </div>

      {/* Slide arrows — hidden on mobile (swipe-free, keeps mobile UI clean), shown from sm up */}
      {slidesToUse.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30
                       h-10 w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30
                       h-10 w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      {/* ================= CONTENT — 2 COLUMNS ON DESKTOP ================= */}
      {/* ✅ FIX: header/nav is `fixed top-[32px]` (≈70px tall → covers the
          top ~100-110px of every page). On mobile this wrapper's content
          starts right at the section's top edge, so the title/subtitle were
          rendering underneath that fixed nav — hidden, not missing. Fix:
          `pt-[130px]` on mobile clears the announcement bar + navbar before
          any hero text starts. From `sm:` up the section already has a
          large fixed height (`sm:h-[75vh]` etc.) and the content is
          vertically centered within it, which naturally sits well clear of
          the ~100px nav — so no extra offset is needed there. */}
      <div className="relative z-30 pt-[130px] pb-10 sm:pt-0 sm:pb-0 sm:h-full sm:flex sm:items-center">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 w-full grid grid-cols-1 gap-8 items-center ${
            hasUpdates ? "lg:grid-cols-[1fr_340px]" : "lg:grid-cols-1"
          }`}
        >
          {/* ---------- LEFT COLUMN ---------- */}
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold leading-tight max-w-xl md:max-w-2xl">
              {getSlideText(slidesToUse[index], "title")}
            </h1>

            {slidesToUse[index].subtitle && (
              <p className="font-body mt-3 sm:mt-4 text-gray-200 text-sm sm:text-base md:text-lg max-w-md">
                {getSlideText(slidesToUse[index], "subtitle")}
              </p>
            )}

            <button
              onClick={() => {
                const developerSlug = slidesToUse[index]?.linkedProperty?.developer?.slug;
                if (developerSlug) {
                  router.push(`/developers/${developerSlug}`);
                }
              }}
              className="font-body mt-5 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 border border-white text-white text-sm sm:text-base
                         hover:bg-white hover:text-black transition w-full sm:w-auto text-center"
            >
              {localizedCTA}
            </button>

            {/* ================= SEARCH ================= */}
            <div ref={searchRef} className="relative mt-6 sm:mt-10 w-full max-w-xl">
              <div
                className="flex items-stretch sm:items-center bg-white dark:bg-[#1E293B]
                           text-gray-900 dark:text-white
                           rounded-xl shadow-xl overflow-hidden transition-colors duration-300"
              >
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={t("hero.communityOrBuilding")}
                  className="font-body flex-1 min-w-0 px-3 sm:px-4 py-3 bg-transparent outline-none text-sm"
                />

                <button
                  onClick={handleSearch}
                  className="font-body shrink-0 px-4 sm:px-6 py-3 text-white text-sm font-medium transition"
                  style={{ backgroundColor: goldenColor }}
                >
                  {t("hero.search")}
                </button>
              </div>

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
                        router.push(`/properties?search=${encodeURIComponent(c.name)}`);
                        setShowSuggestions(false);
                      }}
                      className="font-body px-4 py-3 cursor-pointer
                                 hover:bg-amber-50
                                 dark:hover:bg-white/10 transition"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{c.area}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---------- MOBILE/TABLET: compact offer box below search bar ---------- */}
            {hasUpdates && (
              <div className="lg:hidden mt-5 w-full max-w-xl">
                <HeroOfferPanel updates={mobileUpdates} compact />
              </div>
            )}
          </div>

          {/* ---------- RIGHT COLUMN (desktop only) — full-size Latest Update / Offer box ---------- */}
          {hasUpdates && (
            <div className="hidden lg:block self-start justify-self-end w-full max-w-[340px] mt-2">
              <HeroOfferPanel updates={updates} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}