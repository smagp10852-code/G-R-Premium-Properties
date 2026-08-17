"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function PropertyHot({ properties = [] }: { properties?: any[] }) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleEnquire = (property: any) => {
    if (!property?.title) return;
    setSelectedProperty(property.title);
    setOpenEnquiry(true);
  };

  // Nothing to show yet (no properties tagged "Hot" in Sanity) — hide the
  // whole section rather than showing an empty heading with no cards.
  if (!properties?.length) return null;

  return (
    <>
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0F172A] font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADING */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <p className="font-body flex items-center justify-center gap-1.5 text-xs sm:text-sm tracking-[0.2em] font-semibold uppercase mb-3 sm:mb-4 text-red-600">
              <Flame size={16} className="fill-red-600" />
              Hot Projects
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-5">
              Trending Right Now
            </h2>

            <p className="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400">
              The most in-demand projects our clients are asking about this week.
            </p>
          </div>

          {/* GRID — exactly 3 cards, single column on mobile (no orphan
              card), 3 columns from sm up. */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={`${property._id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={index === 3 ? "lg:hidden" : ""}
              >
                <PropertyCard property={property} onEnquire={handleEnquire} />
              </motion.div>
            ))}
          </div>

          {/* BUTTON — links to the filtered properties list, pre-set to Hot */}
          <div className="text-center mt-10 sm:mt-16">
            <Link
              href="/properties?status=hot"
              className="font-body inline-flex items-center gap-2 px-6 sm:px-10 py-2.5 sm:py-4 text-sm sm:text-base border-2 border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              View All Hot Projects →
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