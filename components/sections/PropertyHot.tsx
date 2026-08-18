"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

const goldenColor = "#C9A227";

// This section now mixes Hot-tagged properties with the latest normal
// ones (no more standalone "Hot Projects" branding/heading — per client
// request). Whichever cards ARE tagged "hot" still show their red badge
// automatically (that logic lives in PropertyCard itself, unchanged) —
// this component just decides which 6 cards to show and under what
// (neutral) heading.
export default function PropertyHot({ properties = [] }: { properties?: any[] }) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleEnquire = (property: any) => {
    if (!property?.title) return;
    setSelectedProperty(property.title);
    setOpenEnquiry(true);
  };

  if (!properties?.length) return null;

  return (
    <>
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0F172A] font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADING — neutral, no red "Hot" branding */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <p
              className="font-body flex items-center justify-center gap-1.5 text-xs sm:text-sm tracking-[0.2em] font-semibold uppercase mb-3 sm:mb-4"
              style={{ color: goldenColor }}
            >
              <TrendingUp size={16} />
              Trending
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-5">
              Popular Right Now
            </h2>

            <p className="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400">
              A mix of our most in-demand and newest listings.
            </p>
          </div>

          {/* GRID — 6 cards, divides cleanly into both 2 and 3 columns,
              so there's never an orphan card at any screen size. */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={`${property._id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <PropertyCard property={property} onEnquire={handleEnquire} />
              </motion.div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="text-center mt-10 sm:mt-16">
            <Link
              href="/properties"
              className="font-body inline-flex items-center gap-2 px-6 sm:px-10 py-2.5 sm:py-4 text-sm sm:text-base border-2 rounded-full hover:text-black transition-all duration-300"
              style={{ borderColor: goldenColor, color: goldenColor }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = goldenColor)}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = "transparent")}
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