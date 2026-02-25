"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";
import Link from "next/link";

const goldenColor = "#C9A227";

export default function PropertyClient({
  properties,
}: {
  properties: any[];
}) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleEnquire = useCallback((prop: any) => {
    if (!prop?.title) return;
    setSelectedProperty(prop.title);
    setOpenEnquiry(true);
  }, []);

  return (
    <>
      <motion.section
        className="py-24 px-6 bg-[#E5E7EB] dark:bg-[#0F172A] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">

          {/* HEADING */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p
              className="text-sm tracking-[0.2em] font-semibold uppercase mb-4"
              style={{ color: goldenColor }}
            >
              Projects
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white">
              Featured Properties
            </h2>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {properties.map((p) => (
              <PropertyCard
                key={p._id}
                property={p}
                onEnquire={handleEnquire}
              />
            ))}
          </div>

          {/* VIEW ALL */}
          <div className="text-center mt-16">
            <Link href="/properties">
              <button
                className="px-12 py-3 rounded-full border-2 font-semibold transition-all duration-300"
                style={{ borderColor: goldenColor }}
              >
                View All Properties →
              </button>
            </Link>
          </div>
        </div>
      </motion.section>

      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        propertyName={selectedProperty}
      />
    </>
  );
}
