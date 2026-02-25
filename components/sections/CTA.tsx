"use client";

import { useState, useEffect } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { useTranslation } from "@/lib/language-context";

const goldenColor = "#D4A843";

export default function CtaSection() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  /* ===== Scroll Lock Fix ===== */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ================= CTA SECTION ================= */}
      <section className="relative py-16 md:py-24 text-white text-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/Emar.png')" }}
        />

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#1E2837]/85 to-[#0F172A]/90" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("cta.title")}
          </h2>

          <p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("cta.description")}
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="px-10 py-3 rounded-md font-semibold text-black transition-all duration-300
                       hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              backgroundColor: goldenColor,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {t("cta.scheduleConsultation")}
          </button>
        </div>
      </section>

      {/* ================= ENQUIRY MODAL ================= */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
