"use client";

import { useState } from "react";
import PropertyCard from "../cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";
import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

type PropertyProps = {
  properties: any[];
};

export default function Property({ properties }: PropertyProps) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const { t } = useTranslation();

  if (!properties?.length) return null;

  return (
    <section className="py-24 px-6 bg-[#E5E7EB] dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm tracking-[0.2em] font-semibold uppercase mb-4 text-[#C9A227]">
            {t("property.projects")}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white">
            {t("property.featuredProperties")}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            {t("property.description")}
          </p>
        </div>

        {/* ================= GRID (3 CARDS ONLY) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property: any) => (
            <PropertyCard
              key={property._id}
              property={property}
              onEnquire={(p) => {
                setSelectedProperty(p);
                setOpenEnquiry(true);
              }}
            />
          ))}
        </div>

        {/* ================= VIEW ALL BUTTON ================= */}
        <div className="text-center mt-16">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-10 py-4 border-2 border-[#C9A227] text-[#C9A227] rounded-full hover:bg-[#C9A227] hover:text-black transition-all duration-300"
          >
            {t("property.viewAllProperties")}
          </Link>
        </div>

      </div>

      {/* ================= MODAL ================= */}
      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        propertyName={selectedProperty?.title}
      />
    </section>
  );
}
