"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/language-context";

interface Props {
  communities: any[];
}

export default function PropertyFilter({ communities }: Props) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const [communitySlug, setCommunitySlug] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

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

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (communitySlug) {
      params.set("community", communitySlug);
    } else if (query.trim()) {
      params.set("search", query.trim());
    }

    if (purpose) params.set("purpose", purpose);
    if (bedroom) params.set("bed", bedroom);
    if (type) params.set("type", type);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  const resetFilters = () => {
    setQuery("");
    setCommunitySlug("");
    setPurpose("");
    setBedroom("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/properties");
  };

  const filterConfig = [
    {
      value: purpose,
      setter: setPurpose,
      label: t("properties.buyRent"),
      options: [
        { label: t("properties.buy"), value: "buy" },
        { label: t("properties.rent"), value: "rent" },
      ],
    },
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
      value: type,
      setter: setType,
      label: t("properties.propertyType"),
      options: [
        { label: t("properties.apartment"), value: "apartment" },
        { label: t("properties.villa"), value: "villa" },
        { label: t("properties.penthouse"), value: "penthouse" },
        { label: t("properties.townhouse"), value: "townhouse" },
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
    <section className="sticky top-[80px] z-50 w-full bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300">
      <div className="w-full px-6 py-5">
        <div className="flex flex-wrap items-center gap-4">

          {/* ================= SEARCH ================= */}
          <div ref={containerRef} className="relative flex-1 min-w-[260px]">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCommunitySlug("");
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder={t("properties.communityOrArea")}
              className="w-full border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-[#111827] 
                         text-black dark:text-white
                         rounded-full px-6 py-3
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

                      // ✅ AUTO SEARCH TRIGGER
                      const params = new URLSearchParams();
                      params.set("community", item.slug || "");

                      if (purpose) params.set("purpose", purpose);
                      if (bedroom) params.set("bed", bedroom);
                      if (type) params.set("type", type);
                      if (minPrice) params.set("min", minPrice);
                      if (maxPrice) params.set("max", maxPrice);

                      router.push(`/properties?${params.toString()}`);
                    }}
                    className="w-full text-left px-6 py-3
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
              className="appearance-none border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-[#111827]
                         text-black dark:text-white
                         px-6 py-3 rounded-full min-w-[150px]
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
            className="bg-[#D4AF37] hover:bg-[#c19d2f]
                       text-white px-7 py-3 rounded-full
                       transition font-medium"
          >
            {t("properties.find")}
          </button>

          <button
            onClick={resetFilters}
            className="border border-[#D4AF37]
                       text-[#D4AF37]
                       hover:bg-[#D4AF37] hover:text-white
                       px-7 py-3 rounded-full
                       transition font-medium"
          >
            {t("properties.reset")}
          </button>

        </div>
      </div>
    </section>
  );
}