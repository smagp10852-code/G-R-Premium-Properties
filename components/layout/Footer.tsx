"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ChevronUp } from "lucide-react";
import { SiFacebook, SiInstagram, SiGoogle, SiLinkedin } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { useTranslation } from "@/lib/language-context";

const goldenColor = "#D4A843";

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="w-full bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* ================= COMPANY ================= */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/assets/logo.png"
                  alt="GR Premium Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-white text-sm font-bold leading-tight">
                    {t("footer.grPremium")}
                  </h3>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-gray-500">
                    {t("footer.propertiesLlc")}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {t("footer.description")}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[SiFacebook, SiInstagram, SiGoogle, SiLinkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center
                               border border-gray-600
                               hover:border-[#D4A843]
                               hover:text-white
                               transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-3">
                {[
                  { name: t("nav.home"), path: "/" },
                  { name: t("nav.aboutUs"), path: "/about" },
                  { name: t("nav.properties"), path: "/properties" },
                  { name: t("nav.blog"), path: "/blog" },
                  { name: t("nav.contactUs"), path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= PROPERTIES ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                {t("footer.properties")}
              </h4>
              <ul className="space-y-3">
                {[t("footer.apartments"), t("footer.villas"), t("footer.penthouses"), t("footer.townhouses")].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        href="/properties"
                        className="text-sm hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* ================= CONTACT ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                {t("footer.contactInfo")}
              </h4>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#D4A843]" />
                  Business Bay, Dubai, UAE
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4A843]" />
                  <a href="tel:+919330230426" className="hover:text-white transition-colors duration-300">
                    +91 - 9330230426
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4A843]" />
                  <a href="mailto:sales@grpremium.com" className="hover:text-white transition-colors duration-300">
                    sales@grpremium.com
                  </a>
                </li>
              </ul>

              {/* Enquiry Button */}
              <button
                onClick={() => setOpen(true)}
                className="mt-8 w-full px-6 py-3 font-semibold text-black text-sm rounded-md
                           transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{ backgroundColor: goldenColor }}
              >
                {t("footer.enquireNow")}
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a3a4a] py-5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              &copy; Copyright 2026 G R Premium Properties LLC. Designed By Asiatech Inc. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors duration-300">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      
      {/* GLOBAL ENQUIRY MODAL */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
