"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import PropertyCard from "@/components/cards/PropertyCard";
import EnquiryModal from "@/components/ui/EnquiryModal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function PropertySlider({
  properties,
}: {
  properties: any[];
}) {
  const [mounted, setMounted] = useState(false);
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnquire = (property: any) => {
    if (!property?.title) return;
    setSelectedProperty(property.title);
    setOpenEnquiry(true);
  };

  const sliderData = useMemo(() => {
    if (!properties) return [];
    if (properties.length < 4) return [...properties, ...properties];
    return properties.slice(0, 10);
  }, [properties]);

  if (!mounted || !sliderData.length) return null;

  return (
    <>
      <section className="py-24 bg-[#E5E7EB] dark:bg-[#0F172A] font-body">

  <div className="max-w-7xl mx-auto px-4">

    {/* HEADING */}
    <div className="text-center max-w-2xl mx-auto mb-16">
      <p className="font-body text-sm tracking-[0.2em] font-semibold uppercase mb-4 text-[#C9A227]">
        Projects
      </p>

      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
        Featured Properties
      </h2>

      <p className="font-body text-gray-600 dark:text-gray-400">
        Discover the latest premium properties from top developers.
      </p>
    </div>

    {/* SLIDER */}
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={30}
      navigation
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }}
    >
      {sliderData.map((property, index) => (
        <SwiperSlide key={`${property._id}-${index}`}>
          <PropertyCard
            property={property}
            onEnquire={handleEnquire}
          />
        </SwiperSlide>
      ))}
    </Swiper>

    {/* BUTTON */}
    <div className="text-center mt-16">
      <Link
        href="/properties"
        className="
        font-body
        inline-flex items-center gap-2
        px-10 py-4
        border-2 border-[#C9A227]
        text-[#C9A227]
        rounded-full
        hover:bg-[#C9A227]
        hover:text-black
        transition-all duration-300
        "
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