"use client";

import { useState } from "react";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function DeveloperProjectsClient({
  properties,
}: {
  properties: any[];
}) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onEnquire={(prop) => {
              setSelectedProperty(prop.title);
              setOpenEnquiry(true);
            }}
          />
        ))}
      </div>

      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        propertyName={selectedProperty}
      />
    </>
  );
}
