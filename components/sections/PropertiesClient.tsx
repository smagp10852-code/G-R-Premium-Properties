"use client";

import { useState, useCallback } from "react";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function PropertiesClient({
  properties,
}: {
  properties: any[];
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
      <section className="py-24 bg-white dark:bg-[#0F172A] transition-colors duration-300">
        <div className="w-full px-6">
          <div className="max-w-7xl mx-auto">

            {/* RESPONSIVE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">

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