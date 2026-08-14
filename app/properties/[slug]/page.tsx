"use client";

// app/properties/[slug]/page.tsx
//
// Single file: fetches the property from Sanity client-side (using the
// slug from the URL) AND renders the full detail page — no separate
// client component file needed.

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  MapPin,
  Download,
  ChevronDown,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Wallet,
  Percent,
  CalendarDays,
  TrendingUp,
  CheckCircle2,
  FileText,
  Quote,
} from "lucide-react";

import { sanityClient } from "@/lib/sanity.client";
import { propertyBySlugQuery } from "@/lib/sanity.queries";
import EnquiryForm from "@/components/forms/EnquiryForm";
import BrochureModal from "@/components/ui/BrochureModal";
import CtaSection from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

const goldenColor = "#C9A227";

const COMPANY_STATS = [
  { value: "500+", label: "Properties" },
  { value: "2000+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Trusted Service" },
];

function getBedroomRangeText(units: any[] = []) {
  const counts = units
    .filter((u) => u?.unitType === "bedroom")
    .map((u) => Number(u?.bedroomCount))
    .filter((n) => !isNaN(n));
  const hasStudio = units.some((u) => u?.unitType === "studio");
  if (counts.length === 0) return hasStudio ? "Studio" : "-";
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  const range = min === max ? `${min}` : `${min}-${max}`;
  return hasStudio ? `Studio - ${max}` : range;
}

function urlOrPlaceholder(img: any): string {
  if (typeof img === "string") return img;
  if (img?.asset?.url) return img.asset.url;
  return "/images/placeholder.jpg";
}

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showBrochureGate, setShowBrochureGate] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    sanityClient
      .fetch(propertyBySlugQuery, { slug })
      .then((data: any) => {
        if (cancelled) return;
        if (!data) {
          setNotFoundFlag(true);
        } else {
          setProperty(data);
        }
      })
      .catch((err: any) => {
        console.error("Failed to fetch property:", err);
        if (!cancelled) setNotFoundFlag(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire this up to your actual lead-capture endpoint / Sanity mutation / CRM.
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading property...</p>
      </div>
    );
  }

  if (notFoundFlag || !property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Property not found
        </p>
        <a href="/properties" className="text-sm" style={{ color: goldenColor }}>
          ← Back to all properties
        </a>
      </div>
    );
  }

  const heroImage = property?.images?.[0];
  const galleryImages =
    property?.galleryImages?.length > 0 ? property.galleryImages : property?.images || [];

  const startingPrice = property?.units?.[0]?.price;
  const bedRange = getBedroomRangeText(property?.units);

  return (
    <div className="font-body bg-white dark:bg-[#0F172A]">
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[85vh] sm:h-[75vh] min-h-[640px] text-white overflow-hidden">
        <div className="absolute inset-0">
          {heroImage && (
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={urlOrPlaceholder(heroImage)}
                alt={property?.title || "Property"}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
        </div>

        {/* Content wrapper: text block + quick-facts card sit side-by-side
            in one flex row on lg+, stacked on mobile, both bottom-aligned
            via items-end — no absolute-position magic numbers, so this
            stays correctly placed at every screen size.
            pt-28 on mobile reserves safe space below the fixed navbar so
            the "Limited Availability" badge (first item in this stack)
            never renders underneath it, even when the stacked content is
            tall enough to otherwise push up that far. */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full
                     flex flex-col lg:flex-row lg:items-end lg:justify-between
                     gap-6 lg:gap-10 justify-end pt-28 sm:pt-0 pb-10 sm:pb-14"
        >
          {/* Text column */}
          <div className="lg:max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block w-fit text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4"
            >
              Limited Availability
            </motion.span>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm text-gray-300 mb-3"
            >
              Home / {property?.location?.name || "Dubai"} / {property?.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            >
              {property?.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm sm:text-base text-gray-200 flex items-center gap-2 mb-6"
            >
              <MapPin size={16} />
              {property?.location?.name}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setShowEnquiry(true)}
              className="w-fit px-6 py-3 rounded-md font-semibold text-black transition hover:opacity-90"
              style={{ backgroundColor: goldenColor }}
            >
              Check Availability →
            </motion.button>
          </div>

          {/* Quick-facts card — same flex row, naturally bottom-aligned
              next to the text column, no absolute positioning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-[340px] flex-shrink-0 rounded-xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="grid grid-cols-2">
              <FactTile
                icon={<Wallet size={15} />}
                label="Starting Price"
                value={startingPrice ? `AED ${startingPrice}` : "-"}
                tone="light"
              />
              <FactTile
                icon={<Percent size={15} />}
                label="Payment Plan"
                value={
                  property?.paymentPlan
                    ? `${property.paymentPlan.booking || 0}/${property.paymentPlan.construction || 0}/${property.paymentPlan.handover || 0}`
                    : "-"
                }
                tone="dark"
              />
              <FactTile icon={<CalendarDays size={15} />} label="Handover" value={property?.handover || "-"} tone="dark" />
              <FactTile
                icon={<TrendingUp size={15} />}
                label="Key Potential"
                value={property?.keyPotentialPercent || "-"}
                tone="light"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PROJECT OVERVIEW ================= */}
      <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="pt-24 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
              Description
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Project Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line mb-6">
              {property?.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {property?.brochure?.asset?.url && (
                <button
                  type="button"
                  onClick={() => setShowBrochureGate(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-black transition hover:opacity-90"
                  style={{ backgroundColor: goldenColor }}
                >
                  <Download size={18} />
                  Download Brochure
                </button>
              )}
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 h-fit">
            <DetailRow label="Location" value={property?.location?.name} />
            <DetailRow label="Developer" value={property?.developer?.name} />
            <DetailRow label="Purpose" value={property?.purpose} />
            <DetailRow label="Property Type" value={property?.type} />
            <DetailRow label="Number of Bedrooms" value={bedRange} />
            <DetailRow label="Size" value={property?.sizeRange} />
            <DetailRow label="Handover" value={property?.handover} />
            <DetailRow
              label="Completion Date"
              value={
                property?.completionDate
                  ? new Date(property.completionDate).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })
                  : "-"
              }
              last
            />
          </div>
        </div>
      </motion.section>

      {/* ================= GALLERY ================= */}
      {galleryImages?.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
              Visual Tour
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Project Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {galleryImages.map((img: any, i: number) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src={urlOrPlaceholder(img)}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ================= AMENITIES ================= */}
      {property?.amenities?.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B1220]">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
              Features & Amenities
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Lifestyle Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {property.amenities.map((a: any, i: number) => {
                const Icon = (LucideIcons as any)[a?.icon] || Star;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-[#101827] rounded-xl p-5 text-center flex flex-col items-center gap-3 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${goldenColor}18` }}
                    >
                      <Icon size={20} style={{ color: goldenColor }} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a?.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Need Assistance callout — matches the reference site's
                "get a call" banner, reuses the existing enquiry flow */}
            <div
              className="rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white"
              style={{ backgroundColor: "#101827" }}
            >
              <p className="font-heading text-lg font-semibold text-center sm:text-left">
                Need Assistance? Get a call from our property expert.
              </p>
              <button
                type="button"
                onClick={() => setShowEnquiry(true)}
                className="px-6 py-2.5 rounded-md font-semibold text-black whitespace-nowrap transition hover:opacity-90"
                style={{ backgroundColor: goldenColor }}
              >
                Request a Call Back →
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ================= PAYMENT PLAN ================= */}
      {property?.paymentPlan && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
                Simple & Flexible
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                Payment Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                A structured payment plan designed to provide clarity and flexibility throughout your ownership
                journey.
              </p>
            </div>

            <div>
              {/* Segmented proportion bar — visually shows the 20/60/20 split
                  before the numbers, matching how real payment plans are
                  usually visualized */}
              <div className="flex w-full h-2.5 rounded-full overflow-hidden mb-6 shadow-inner">
                <div
                  style={{
                    width: `${property.paymentPlan.booking || 0}%`,
                    backgroundColor: goldenColor,
                  }}
                />
                <div
                  style={{
                    width: `${property.paymentPlan.construction || 0}%`,
                    backgroundColor: `${goldenColor}90`,
                  }}
                />
                <div
                  style={{
                    width: `${property.paymentPlan.handover || 0}%`,
                    backgroundColor: `${goldenColor}55`,
                  }}
                />
              </div>

              <div className="space-y-4">
                <PaymentRow value={property.paymentPlan.booking} label="On Booking" />
                <PaymentRow value={property.paymentPlan.construction} label="During Construction" />
                <PaymentRow value={property.paymentPlan.handover} label="On Handover" />
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ================= FLOOR PLANS CTA ================= */}
      {property?.floorPlansPdf?.asset?.url && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-14 px-4 sm:px-6 lg:px-8 text-white" style={{ backgroundColor: "#101827" }}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex w-14 h-14 rounded-xl items-center justify-center flex-shrink-0"
                   style={{ backgroundColor: `${goldenColor}20` }}>
                <FileText size={26} style={{ color: goldenColor }} />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: goldenColor }}>
                  Project Documentation
                </p>
                <h3 className="font-heading text-2xl font-bold mb-1">Floor Plans & Layouts</h3>
                <p className="text-gray-400 text-sm">Get a detailed PDF with layouts and configurations of all units.</p>
              </div>
            </div>
            <a
              href={property.floorPlansPdf.asset.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-black whitespace-nowrap transition hover:opacity-90"
              style={{ backgroundColor: goldenColor }}
            >
              <Download size={18} />
              View All Floor Plans
            </a>
          </div>
        </motion.section>
      )}

      {/* ================= INVESTMENT POTENTIAL ================= */}
      {(property?.investmentHighlights?.length > 0 || property?.investmentStat) && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B1220]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
                Why Invest?
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Investment Potential
              </h2>

              {property?.investmentStat && (
                <div
                  className="rounded-xl p-6 mb-2 shadow-sm relative overflow-hidden"
                  style={{ backgroundColor: "#101827" }}
                >
                  <div
                    className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10"
                    style={{ backgroundColor: goldenColor }}
                  />
                  <TrendingUp size={22} className="mb-3 relative" style={{ color: goldenColor }} />
                  <p className="text-xs text-gray-400 mb-1.5 relative">{property.investmentStat.label}</p>
                  <p className="font-heading text-lg font-semibold text-white mb-4 relative">
                    {property.investmentStat.value}
                  </p>
                  <a
                    href="#consultation"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold relative hover:gap-2.5 transition-all"
                    style={{ color: goldenColor }}
                  >
                    Get Investment Potential Report →
                  </a>
                </div>
              )}
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {property?.investmentHighlights?.map((point: string, i: number) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: goldenColor }}
                  />
                  <span className="text-gray-700 dark:text-gray-300">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ================= LOCATION & CONNECTIVITY ================= */}
      {(property?.locationLandmarks?.length > 0 || property?.mapLocation) && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
              Project Location
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Location & Connectivity
            </h2>

            {property?.locationLandmarks?.length > 0 && (
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6">
                {property.locationLandmarks.map((l: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <MapPin size={15} style={{ color: goldenColor }} />
                    <span className="font-medium">{l?.label}</span>
                    <span className="text-gray-500">— {l?.distance}</span>
                  </div>
                ))}
              </div>
            )}

            {property?.mapLocation && (
              <div className="w-full h-[350px] rounded-xl overflow-hidden">
                <iframe
                  title="Property location map"
                  className="w-full h-full border-0"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${property.mapLocation.lat},${property.mapLocation.lng}&z=14&output=embed`}
                />
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ================= CONSULTATION FORM ================= */}
      <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} id="consultation" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B1220]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
              Free Consultation
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Book Your Free Property Consultation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Share your details and a dedicated advisor will personally guide you to the perfect property.
            </p>

            {submitted ? (
              <p className="font-semibold" style={{ color: goldenColor }}>
                Thanks! We'll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-3">
                <input
                  required
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#101827] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#101827] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                />
                <input
                  required
                  type="tel"
                  placeholder="+971 5X XXX XXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#101827] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-md font-semibold text-black transition hover:opacity-90"
                  style={{ backgroundColor: goldenColor }}
                >
                  Submit Consultation Request →
                </button>
              </form>
            )}
          </div>

          {property?.agent && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#101827] rounded-xl p-5 shadow-sm relative">
                <Quote size={22} className="mb-2 opacity-30" style={{ color: goldenColor }} />
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  I'll guide you step by step so you can make a confident property decision.
                </p>
              </div>

              <div className="bg-white dark:bg-[#101827] rounded-xl p-6 flex items-center gap-4 shadow-sm">
                {property.agent.photoUrl && (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={property.agent.photoUrl} alt={property.agent.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{property.agent.name}</p>
                  <p className="text-sm text-gray-500">{property.agent.title}</p>
                  <div className="flex gap-3 mt-2 text-gray-500">
                    <Phone size={16} />
                    <Mail size={16} />
                    <MessageCircle size={16} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.section>

     

      {/* ================= BROCHURE DOWNLOAD ================= */}
      {property?.brochure?.asset?.url && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${goldenColor}18` }}
            >
              <FileText size={26} style={{ color: goldenColor }} />
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
              Free Download
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Project Brochure
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">All you need to know about this project.</p>
            <button
              type="button"
              onClick={() => setShowBrochureGate(true)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-semibold text-black transition hover:opacity-90"
              style={{ backgroundColor: goldenColor }}
            >
              <Download size={18} />
              Download Brochure
            </button>
          </div>
        </motion.section>
      )}

      {/* ================= FAQ ================= */}
      {property?.faqs?.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0B1220]">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: goldenColor }}>
              Common Questions
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {property.faqs.map((f: any, i: number) => (
                <div key={i} className="bg-white dark:bg-[#101827] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      {f?.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400">{f?.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
      <CtaSection />
      <Footer />



      {/* ================= ENQUIRY MODAL — opened by "Check Availability" ================= */}
      {showEnquiry && (
        <EnquiryForm
          onClose={() => setShowEnquiry(false)}
          defaultProperty={property?.developer?.name || ""}
        />
      )}

      {/* Brochure download — BrochureModal has its own lead form (name/email/
          phone/country), posts to /api/brochure, and opens the PDF itself
          on success. No `open && (...)` wrapper needed — it's controlled by
          its own `open` prop like AnimatePresence expects. */}
      <BrochureModal
        open={showBrochureGate}
        onClose={() => setShowBrochureGate(false)}
        pdfUrl={property?.brochure?.asset?.url || ""}
        propertyName={property?.title || ""}
      />
    </div>
  );
}

/* ============================================================
   Small presentational helpers (same file, since we only want 2 files)
   ============================================================ */

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 sm:p-4 text-center sm:text-left">
      <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

// Checkerboard-style quick-fact tile for the hero panel — alternates
// between two navy tones and gives each icon a small round badge,
// matching the reference site's positioned card exactly.
function FactTile({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "light" | "dark";
}) {
  return (
    <div
      className="p-3.5 sm:p-4 border-white/10"
      style={{
        backgroundColor: tone === "light" ? "#1E293B" : "#0F172A",
      }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center mb-2"
        style={{ backgroundColor: `${goldenColor}25`, color: goldenColor }}
      >
        {icon}
      </div>
      <p
        className="text-[9px] sm:text-[10px] uppercase tracking-wide mb-0.5"
        style={{ color: `${goldenColor}B0` }}
      >
        {label}
      </p>
      <p className="text-xs sm:text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function DetailRow({ label, value, last }: { label: string; value?: string; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-3 text-sm ${!last ? "border-b border-gray-200 dark:border-gray-800" : ""}`}>
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white text-right">{value || "-"}</span>
    </div>
  );
}

function PaymentRow({ value, label }: { value?: number; label: string }) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-[#101827] rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-[#C9A227]/30 transition-all">
      <span className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: goldenColor }} />
      <span className="font-heading text-2xl font-bold w-16" style={{ color: goldenColor }}>
        {value || 0}%
      </span>
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  );
}