"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, BedDouble, Mail, Phone, MessageCircle, Flame, Rocket } from "lucide-react";

const goldenColor = "#C9A227";
const PLACEHOLDER = "/images/placeholder.jpg";

// TODO: replace with the real agency contact details (or read them from
// `property` if each listing has its own agent).
const CONTACT_EMAIL = "info@grpremium.com";
const CONTACT_PHONE = "+919330230426";
const CONTACT_WHATSAPP = "971585964689"; // digits only, no + — required by wa.me

export default function PropertyCard({
  property,
  onEnquire,
}: {
  property: any;
  onEnquire?: (p: any) => void;
}) {
  const images =
    property?.images?.map((img: any) => img?.asset?.url).filter(Boolean) || [];

  const locationText =
    typeof property?.location === "string"
      ? property.location
      : property?.location?.name || "";

  const units = property?.units || [];

  const getBedRange = () => {
    const counts = units
      .filter((u: any) => u?.unitType === "bedroom")
      .map((u: any) => Number(u?.bedroomCount))
      .filter((n: number) => !isNaN(n));
    const hasStudio = units.some((u: any) => u?.unitType === "studio");

    if (counts.length === 0) return hasStudio ? "Studio" : "";

    const min = Math.min(...counts);
    const max = Math.max(...counts);
    const range =
      min === max
        ? `${min} Bedroom${min > 1 ? "s" : ""}`
        : `${min}-${max} Bedrooms`;

    return hasStudio ? `Studio - ${max} Bedroom${max > 1 ? "s" : ""}` : range;
  };
  const bedRange = getBedRange();

  const startingPrice = units[0]?.price;

  // "hot" -> red/orange flame badge. "launching_soon" -> gold rocket badge
  // + the price label below switches from "Starting Price" to "EOI"
  // (Expression of Interest), since there's no final price yet.
  const isHot = property?.projectStatus === "hot";
  const isLaunchSoon = property?.projectStatus === "launching_soon";
  const priceLabel = isLaunchSoon ? "EOI" : "Starting Price";

  const slug =
    typeof property?.slug === "string" ? property.slug : property?.slug?.current;
  const detailHref = slug ? `/properties/${slug}` : "#";

  const enquirySubject = encodeURIComponent(`Enquiry: ${property?.title || "Property"}`);
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${property?.title || "this property"}. Could you share more details?`
  );

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col bg-white dark:bg-[#101827] rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 font-body"
    >
      {/* IMAGE — tapping it goes to the detail page */}
      <Link href={detailHref} className="relative block w-full aspect-[4/3] flex-shrink-0">
        <Image
          src={images[0] || PLACEHOLDER}
          alt={property?.title || "Property"}
          fill
          sizes="(max-width:1024px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Top-left: property type badge */}
        {property?.propertyType && (
          <span className="absolute top-2 left-2 text-[9px] lg:text-xs font-semibold px-2 py-1 rounded-md bg-[#0F172A] text-white">
            {property.propertyType}
          </span>
        )}

        {/* Top-right: Hot / Launching Soon badge */}
        {isHot && (
          <span className="absolute top-2 right-2 flex items-center gap-1 text-[9px] lg:text-xs font-bold px-2 py-1 rounded-md bg-red-600 text-white shadow-sm">
            <Flame size={11} className="fill-white" />
            Hot
          </span>
        )}
        {isLaunchSoon && (
          <span
            className="absolute top-2 right-2 flex items-center gap-1 text-[9px] lg:text-xs font-bold px-2 py-1 rounded-md text-black shadow-sm"
            style={{ backgroundColor: goldenColor }}
          >
            <Rocket size={11} />
            Launching Soon
          </span>
        )}

        {/* Bottom-right: handover badge */}
        {property?.handover && (
          <span className="absolute bottom-2 right-2 text-[9px] lg:text-xs font-semibold px-2 py-1 rounded-md bg-black/70 text-white">
            {property.handover}
          </span>
        )}
      </Link>

      {/* CONTENT */}
      <div className="p-2.5 lg:p-4 flex flex-col flex-grow">
        <Link href={detailHref}>
          <h3 className="font-heading text-[13px] lg:text-base font-bold mb-0.5 line-clamp-1 hover:text-[#C9A227] transition-colors">
            {property?.title}
          </h3>
        </Link>

        {property?.developerName && (
          <p className="font-body text-[10px] lg:text-xs text-gray-500 dark:text-gray-500 mb-1">
            by {property.developerName}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 mb-2 lg:mb-3">
          <span className="flex items-center gap-1 text-[10px] lg:text-xs text-gray-600 dark:text-gray-400 min-w-0">
            <MapPin size={11} className="flex-shrink-0" />
            <span className="line-clamp-1">{locationText}</span>
          </span>

          {bedRange && (
            <span className="flex items-center gap-1 text-[10px] lg:text-xs text-gray-600 dark:text-gray-400 flex-shrink-0">
              <BedDouble size={11} />
              {bedRange}
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mb-2 lg:mb-3">
          <p className="text-[9px] lg:text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">
            {priceLabel}
          </p>
          {startingPrice && (
            <p
              className="font-body text-[13px] lg:text-lg font-bold"
              style={{ color: goldenColor }}
            >
              AED {startingPrice}
            </p>
          )}
        </div>

        {/* CONTACT ROW — Email / Call / WhatsApp */}
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${enquirySubject}`}
            onClick={() => onEnquire?.(property)}
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg bg-gray-100 dark:bg-[#1c2536] text-gray-700 dark:text-gray-300 hover:bg-[#C9A227] hover:text-black transition-colors"
          >
            <Mail size={13} />
            <span className="text-[8px] lg:text-[10px] font-medium">Email</span>
          </a>

          <a
            href={`tel:${CONTACT_PHONE}`}
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg bg-gray-100 dark:bg-[#1c2536] text-gray-700 dark:text-gray-300 hover:bg-[#C9A227] hover:text-black transition-colors"
          >
            <Phone size={13} />
            <span className="text-[8px] lg:text-[10px] font-medium">Call</span>
          </a>

          <a
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500 hover:text-white transition-colors"
          >
            <MessageCircle size={13} />
            <span className="text-[8px] lg:text-[10px] font-medium">WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}