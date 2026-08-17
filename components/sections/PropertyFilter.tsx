"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/language-context";

interface Props {
  communities: any[];
}

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "🔥 Hot", value: "hot" },
  { label: "🚀 Launching Soon", value: "launching_soon" },
];

export default function PropertyFilter({ communities }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const [communitySlug, setCommunitySlug] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bedroom, setBedroom] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Reads ?status=hot / ?status=launching_soon from the URL — this is how
  // the homepage's "View All Hot Projects" / "View All Launching Soon"
  // buttons land here with the right tab already active. A plain
  // /properties visit (no query param) has no active tab, so everything
  // shows by default, matching what was asked for.
  const [status, setStatus] = useState(searchParams.get("status") || "");

  // Keep local state in sync if the URL changes from outside this
  // component too (e.g. browser back/forward).
  useEffect(() => {
    setStatus(searchParams.get("status") || "");
  }, [searchParams]);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredCommunities = communities.filter(
    (c) =>
      c.name?.toLowerCase().includes(query.toLowerCase()) ||
      c.area?.toLowerCase().includes(query.toLowerCase())
  );

  const buildParams = (overrides: Record<string, string> = {}) => {
    const params = new URLSearchParams();

    const merged = {
      community: communitySlug,
      search: communitySlug ? "" : query.trim(),
      purpose,
      bed: bedroom,
      min: minPrice,
      max: maxPrice,
      status,
      ...overrides,
    };

    if (merged.community) params.set("community", merged.community);
    else if (merged.search) params.set("search", merged.search);

    if (merged.purpose) params.set("purpose", merged.purpose);
    if (merged.bed) params.set("bed", merged.bed);
    if (merged.min) params.set("min", merged.min);
    if (merged.max) params.set("max", merged.max);
    if (merged.status) params.set("status", merged.status);

    return params;
  };

  const applyFilters = () => {
    router.push(`/properties?${buildParams().toString()}`);
  };

  const resetFilters = () => {
    setQuery("");
    setCommunitySlug("");
    setPurpose("");
    setBedroom("");
    setMinPrice("");
    setMaxPrice("");
    setStatus("");
    router.push("/properties");
  };

  // Tab click applies immediately (doesn't wait for the "Find" button) —
  // status is the one filter that behaves like a quick toggle, everything
  // else still needs "Find" pressed.
  const handleStatusTab = (value: string) => {
    setStatus(value);
    router.push(`/properties?${buildParams({ status: value }).toString()}`);
  };

  const filterConfig = [

    {
      value: bedroom,
      setter: setBedroom,
      label: t("properties.bedrooms"),
      options: [
        { label: t("properties.studio"), value: "studio" },
        { label: "1 " + t("property.bed"), value: "1" },
        { label: "2 " + t("property.bed"), value: "2" },
        { label: "3 " + t("property.bed"), value: "3" },
        { label: "4+ " + t("property.bed"), value: "4" },
      ],
    },

    {
      value: minPrice,
      setter: setMinPrice,
      label: t("properties.minPrice"),

      options: [
        { label: "AED 500K", value: "500000" },
        { label: "AED 1M", value: "1000000" },
      ],
    },
    {
      value: maxPrice,
      setter: setMaxPrice,
      label: t("properties.maxPrice"),
      options: [
        { label: "AED 5M", value: "5000000" },
        { label: "AED 10M", value: "10000000" },
      ],
    },
  ];

  return (
    <section className="sticky top-[80px] z-50 w-full bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

        {/* ================= STATUS TABS ================= */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleStatusTab(tab.value)}
              className={`font-body text-xs sm:text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-all font-medium ${
                status === tab.value
                  ? "bg-[#D4AF37] text-white"
                  : "border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#D4AF37]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">

          {/* ================= SEARCH ================= */}
          <div ref={containerRef} className="relative flex-1 min-w-[220px]">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCommunitySlug("");
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder={t("properties.communityOrArea")}
              className="font-body w-full border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-[#111827] 
                         text-black dark:text-white
                         text-sm
                         rounded-full px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
                         transition"
            />

            {searchOpen && (
              <div className="absolute left-0 right-0 mt-2 
                              bg-white dark:bg-[#111827]
                              border border-gray-200 dark:border-gray-700
                              rounded-2xl shadow-2xl
                              max-h-64 overflow-y-auto z-[9999]">

                {(query ? filteredCommunities : communities).map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => {
                      setQuery(item.name);
                      setCommunitySlug(item.slug || "");
                      setSearchOpen(false);
                      router.push(
                        `/properties?${buildParams({ community: item.slug || "" }).toString()}`
                      );
                    }}
                    className="font-body w-full text-left px-4 py-2
                               hover:bg-gray-100 dark:hover:bg-white/10
                               transition"
                  >
                    <p className="text-sm font-semibold text-black dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.area}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= SELECTS */}
          {filterConfig.map((item, idx) => (
            <select
              key={idx}
              value={item.value}
              onChange={(e) => item.setter(e.target.value)}
              className="font-body appearance-none border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-[#111827]
                         text-black dark:text-white
                         text-sm
                         px-4 py-2 rounded-full min-w-[110px]
                         focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
                         transition"
            >
              <option value="">{item.label}</option>
              {item.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}

          {/* ================= BUTTONS */}
          <button
            onClick={applyFilters}
            className="font-body bg-[#D4AF37] hover:bg-[#c19d2f]
                       text-white text-sm px-5 py-2 rounded-full
                       transition font-medium"
          >
            {t("properties.find")}
          </button>

          <button
            onClick={resetFilters}
            className="font-body border border-[#D4AF37]
                       text-[#D4AF37] text-sm
                       hover:bg-[#D4AF37] hover:text-white
                       px-5 py-2 rounded-full
                       transition font-medium"
          >
            {t("properties.reset")}
          </button>

        </div>
      </div>
    </section>
  );
}