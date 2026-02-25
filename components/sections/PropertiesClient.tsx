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
      {/* ================= PROPERTIES GRID ================= */}
      <section
        className="py-24 
                   bg-white dark:bg-[#0F172A] 
                   transition-colors duration-300"
      >
        <div className="w-full px-6">
          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {properties.map((property: any) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= ENQUIRY MODAL ================= */}
      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        propertyName={selectedProperty}
      />
    </>
  );
}
