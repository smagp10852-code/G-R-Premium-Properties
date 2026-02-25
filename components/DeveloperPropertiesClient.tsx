"use client";

import { useState } from "react";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function DeveloperPropertiesClient({ properties }: any) {
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {properties.map((property: any) => (
          <PropertyCard
            key={property._id}
            property={property}
            onEnquire={(p) => {
              setSelectedProperty(p.title);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        propertyName={selectedProperty}
      />
    </>
  );
}
