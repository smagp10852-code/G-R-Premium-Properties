"use client";

import { useState, useCallback } from "react";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function PropertiesClient({
  properties = [],
}: {
  properties?: any[];
}) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleEnquire = useCallback((property: any) => {
    if (!property?.title) return;
    setSelectedProperty(property.title);
    setOpenEnquiry(true);
  }, []);

  return (
    <>
      <section className="py-12 sm:py-24 bg-white dark:bg-[#0F172A] transition-colors duration-300 font-body">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">

            {/* Same rule as everywhere else on the site: 2 columns from
                mobile up, 3 columns from lg (1024px) — so iPad Pro/laptop
                get 3 per row, and mobile isn't stuck at a single lonely
                full-width card. */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 items-stretch">

              {properties.map((property: any) => (
                <div key={property._id} className="h-full flex">
                  <PropertyCard
                    property={property}
                    onEnquire={handleEnquire}
                  />
                </div>
              ))}

            </div>

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