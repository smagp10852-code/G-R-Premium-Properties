"use client";

import { useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function PropertySlider({
  properties,
}: {
  properties: any[];
}) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleEnquire = (property: any) => {
    if (!property?.title) return;
    setSelectedProperty(property.title);
    setOpenEnquiry(true);
  };

  if (!properties?.length) return null;

  // Homepage featured grid shows only the top 4 — full list lives on /properties
  const displayProperties = properties.slice(0, 4);

  return (
    <>
      <section className="py-16 sm:py-24 bg-[#E5E7EB] dark:bg-[#0F172A] font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADING */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <p className="font-body text-xs sm:text-sm tracking-[0.2em] font-semibold uppercase mb-3 sm:mb-4 text-[#C9A227]">
              Projects
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-5">
              Featured Properties
            </h2>

            <p className="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Discover the latest premium properties from top developers.
            </p>
          </div>

          {/* STATIC GRID — 2 columns on mobile/tablet (all 4 cards, 2x2),
              3 columns from lg (1024px) up. The 4th card is hidden exactly
              at lg so laptop/iPad Pro get a clean single row of 3 instead
              of an orphan 4th card wrapping alone to a second row. */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {displayProperties.map((property, index) => (
              <div key={`${property._id}-${index}`} className={index === 3 ? "lg:hidden" : ""}>
                <PropertyCard property={property} onEnquire={handleEnquire} />
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="text-center mt-10 sm:mt-16">
            <Link
              href="/properties"
              className="font-body inline-flex items-center gap-2 px-6 sm:px-10 py-2.5 sm:py-4 text-sm sm:text-base border-2 border-[#C9A227] text-[#C9A227] rounded-full hover:bg-[#C9A227] hover:text-black transition-all duration-300"
            >
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        propertyName={selectedProperty}
      />
    </>
  );
}