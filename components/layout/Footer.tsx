"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ChevronUp } from "lucide-react";
import { SiFacebook, SiInstagram, SiGoogle, SiLinkedin } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { useTranslation } from "@/lib/language-context";
import { SiWhatsapp } from "react-icons/si";

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
                    G R Premium
                  </h3>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-gray-500">
                    Properties LLC
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Your trusted partner in Dubai real estate. We specialize in
                premium apartments, villas, and investment properties.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/GRpremiumPropertiesLLC/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             border border-gray-600 hover:border-[#D4A843]
                             hover:text-white transition-all duration-300"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/grpp_dxb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             border border-gray-600 hover:border-[#D4A843]
                             hover:text-white transition-all duration-300"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>

                <a
                  href="https://share.google/XpeZGjkEe0ZlTFw0G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             border border-gray-600 hover:border-[#D4A843]
                             hover:text-white transition-all duration-300"
                >
                  <SiGoogle className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             border border-gray-600 hover:border-[#D4A843]
                             hover:text-white transition-all duration-300"
                >
                  <SiLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-sm hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-sm hover:text-white">About Us</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Properties</Link></li>
                <li><Link href="/blog" className="text-sm hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* ================= PROPERTIES ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Properties
              </h4>
              <ul className="space-y-3">
                <li><Link href="/properties" className="text-sm hover:text-white">Apartments</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Villas</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Penthouses</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Townhouses</Link></li>
              </ul>
            </div>

            {/* ================= CONTACT ================= */}
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Contact Info
              </h4>

              <ul className="space-y-4 text-sm text-gray-400">

                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-[#D4A843]" />
                  <span>
                    401C Aspin Commercial Tower,<br />
                    Near Financial Center Metro,<br />
                    Sheikh Zayed Road,<br />
                    Dubai, UAE
                  </span>
                </li>

                <li className="flex items-start gap-3">

                  <div className="flex flex-col space-y-2">

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/971543087712"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300"
                    >
                      <SiWhatsapp className="w-4 h-4 text-green-500" />
                      +971 543087712
                    </a>

                    {/* Direct Call */}
                    <a
                      href="tel:+9717604007170"
                      className="flex items-center gap-2 hover:text-white transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4 text-[#D4A843]" />
                      +971 7604007170
                    </a>

                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4A843]" />
                  <a href="mailto:sales@grpremium.com" className="hover:text-white">
                    sales@grpremium.com
                  </a>
                </li>

              </ul>

              <button
                onClick={() => setOpen(true)}
                className="mt-8 w-full px-6 py-3 font-semibold text-black text-sm rounded-md
                           transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: goldenColor }}
              >
                Enquire Now
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a3a4a] py-5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} G R Premium Properties LLC. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <EnquiryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}