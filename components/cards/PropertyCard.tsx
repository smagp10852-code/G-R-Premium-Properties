"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BedDouble,
  CalendarDays,
  Download,
  ChevronLeft,
  ChevronRight,
  Percent,
} from "lucide-react";
import BrochureModal from "@/components/ui/BrochureModal";
import { useTranslation } from "@/lib/language-context";

const goldenColor = "#C9A227";
const PLACEHOLDER = "/images/placeholder.jpg";

export default function PropertyCard({
  property,
  onEnquire,
}: {
  property: any;
  onEnquire?: (p: any) => void;
}) {
  const { t } = useTranslation();

  const images =
    property?.images?.map((img: any) => img?.asset?.url).filter(Boolean) || [];

  const brochureUrl = property?.brochure?.asset?.url;

  const paymentPlan = property?.paymentPlan;

  const [index, setIndex] = useState(0);
  const [openBrochure, setOpenBrochure] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  const locationText =
    typeof property?.location === "string"
      ? property.location
      : property?.location?.name || "";

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full bg-white dark:bg-[#101827] text-black dark:text-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300"
      >
        {/* IMAGE SECTION */}
        <div className="relative h-[240px] w-full group">
          <Image
            src={images[index] || PLACEHOLDER}
            alt={property?.title || "Property"}
            fill
            className="object-cover"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() =>
                  setIndex((prev) => (prev + 1) % images.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronRight size={18} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={
                      i === index
                        ? "h-2.5 w-6 bg-white rounded-full transition-all duration-300"
                        : "h-2.5 w-2.5 bg-white/50 hover:bg-white rounded-full transition-all duration-300"
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold mb-1">{property?.title}</h3>

          {locationText && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {locationText}
            </p>
          )}

          {/* UNITS */}
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
            {property?.units?.map((unit: any, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <BedDouble size={16} />
                <span>
                  <strong>{unit?.beds}</strong> {t("property.bed")} •{" "}
                  {unit?.size} {t("property.sqFt")} •{" "}
                  <strong>
                    {t("property.aed")} {unit?.price}
                  </strong>
                </span>
              </div>
            ))}
          </div>

          {/* PAYMENT PLAN */}
          {paymentPlan &&
            (paymentPlan.booking ||
              paymentPlan.construction ||
              paymentPlan.handover) && (
              <div className="mb-4 bg-gray-100 dark:bg-[#1c2536] p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Percent size={16} />
                  <span className="text-sm font-semibold">
                    {t("Payment Plan") || "Payment Plan"}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-medium">
                  <span>{paymentPlan.booking || 0}%</span>
                  <span>{paymentPlan.construction || 0}%</span>
                  <span>{paymentPlan.handover || 0}%</span>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Booking</span>
                  <span>Construction</span>
                  <span>Handover</span>
                </div>
              </div>
            )}

          {/* HANDOVER */}
          {property?.handover && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <CalendarDays size={16} />
              <span>
                {t("property.handover")}: {property.handover}
              </span>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => setOpenBrochure(true)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download size={16} />
              {t("property.brochure")}
            </button>

            <button
              onClick={() => onEnquire?.(property)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-black transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: goldenColor }}
            >
              {t("property.enquire")}
            </button>
          </div>
        </div>
      </motion.div>

      <BrochureModal
        open={openBrochure}
        onClose={() => setOpenBrochure(false)}
        pdfUrl={brochureUrl}
        propertyName={property?.title}
      />
    </>
  );
}
