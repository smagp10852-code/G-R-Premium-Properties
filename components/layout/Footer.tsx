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
      <footer className="w-full bg-black text-gray-400 font-body">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* ================= COMPANY ================= */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/assets/logo.png"
                  alt="GR Premium Properties LLC"
                  width={52}
                  height={52}
                  className="object-contain"
                />

                <div>
                  <h3 className="font-heading text-white text-lg font-bold tracking-wide">
                    G R Premium
                  </h3>
                  <p className="font-body text-[11px] uppercase tracking-[0.25em] text-gray-500">
                    Properties LLC
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <p className="font-body text-sm text-gray-400 leading-7">
                  Dubai’s Most Trusted Real Estate Experts - 
                  <span className="text-white font-medium">
                    {" "}GR Premium Properties LLC
                  </span>.
                  Off-Plan, Luxury & Investment Properties.
                </p>

                <div className="inline-flex items-center rounded-full border border-[#D4A843]/40 bg-[#D4A843]/10 px-4 py-2">
                  <span className="font-body text-xs uppercase tracking-widest text-[#D4A843] font-semibold">
                    RERA Registered
                  </span>

                  <span className="mx-3 h-4 w-px bg-[#D4A843]/40" />

                  <span className="font-body text-sm text-white font-medium">
                    No. 49939
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                {[
                  {
                    href: "https://www.facebook.com/GRpremiumPropertiesLLC/",
                    icon: SiFacebook,
                    label: "Facebook",
                  },
                  {
                    href: "https://www.instagram.com/grpp_dxb/",
                    icon: SiInstagram,
                    label: "Instagram",
                  },
                  {
                    href: "https://share.google/XpeZGjkEe0ZlTFw0G",
                    icon: SiGoogle,
                    label: "Google Reviews",
                  },
                  {
                    href: "https://www.linkedin.com/company/grpremiumproperties",
                    icon: SiLinkedin,
                    label: "LinkedIn",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 transition-all duration-300 hover:border-[#D4A843] hover:bg-[#D4A843]"
                  >
                    <Icon className="h-4 w-4 text-gray-300 transition-colors duration-300 group-hover:text-black" />
                  </a>
                ))}
              </div>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div>
              <h4 className="font-heading text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Quick Links
              </h4>
              <ul className="font-body space-y-3">
                <li><Link href="/" className="text-sm hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-sm hover:text-white">About Us</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Properties</Link></li>
                <li><Link href="/blog" className="text-sm hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-white">Contact</Link></li>

                {/* ✅ Added Sitemap */}
                <li>
                  <Link href="/sitemap" className="text-sm hover:text-white">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            {/* ================= PROPERTIES ================= */}
            <div>
              <h4 className="font-heading text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Properties
              </h4>
              <ul className="font-body space-y-3">
                <li><Link href="/properties" className="text-sm hover:text-white">Apartments</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Villas</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Penthouses</Link></li>
                <li><Link href="/properties" className="text-sm hover:text-white">Townhouses</Link></li>
              </ul>
            </div>

            {/* ================= CONTACT ================= */}
            <div>
              <h4 className="font-heading text-white text-sm font-bold uppercase mb-6 tracking-wide">
                Contact Info
              </h4>

              <ul className="font-body space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-[#D4A843]" />
                  <span>
                    403-017, Aspin commercial Tower,<br />
                    Sheikh Zayed Rd,<br />
                    Trade Centre 1 - Dubai,<br />
                    Dubai, United Arab Emirates
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex flex-col space-y-2">
                    <a href="https://wa.me/971585964689" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
                      <SiWhatsapp className="w-4 h-4 text-green-500" />
                      +971 585964689
                    </a>

                    <a href="tel:+919330230426" className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                      <Phone className="w-4 h-4 text-[#D4A843]" />
                      +91 9330230426
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4A843]" />
                  <a href="mailto:info@grpremium.com" className="hover:text-white">
                    info@grpremium.com
                  </a>
                </li>
              </ul>

              <button
                onClick={() => setOpen(true)}
                className="font-body mt-8 w-full px-6 py-3 font-semibold text-black text-sm rounded-md transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: goldenColor }}
              >
                Enquire Now
              </button>
            </div>

          </div>
        </div>

        <div className="border-t border-[#2a3a4a] py-5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-gray-500">
              © {new Date().getFullYear()} G R Premium Properties LLC. All Rights Reserved.
            </p>
            <div className="font-body flex items-center gap-6 text-xs text-gray-500">
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