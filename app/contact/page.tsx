"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import { useTranslation } from "@/lib/language-context";
import { SiWhatsapp } from "react-icons/si";

const goldenColor = "#C9A227";

export default function ContactPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      interested_property: formData.get("interested_property"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(t("form.successMessage"));
        e.target.reset();
      } else {
        setError(t("form.errorMessage"));
      }
    } catch (err) {
      setError(t("form.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body w-full overflow-hidden bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* HERO — same pattern as the rest of the site */}
      <section className="relative h-[320px] sm:h-[420px] flex items-center justify-center text-center text-white overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            alt="Contact Hero"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 px-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs sm:text-sm tracking-[0.2em] font-semibold uppercase mb-3"
            style={{ color: goldenColor }}
          >
            {t("contact.getInTouch")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl mb-4 font-bold"
          >
            {t("contact.contactUs")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-gray-200 text-sm sm:text-base"
          >
            {t("contact.heroDescription")}
          </motion.p>
        </div>
      </section>

      {/* MAIN SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-12"
      >

        {/* LEFT INFO */}
        <div>
          <p
            className="font-body text-xs sm:text-sm tracking-[0.2em] font-semibold uppercase mb-3"
            style={{ color: goldenColor }}
          >
            {t("contact.contactInformation")}
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            {t("contact.getInTouchTitle")}
          </h2>

          <div className="space-y-6">

            {/* Address */}
            <Info
              icon={<MapPin size={18} />}
              title="Office Address"
              text={`403-017, Aspin commercial Tower , Sheikh Zayed Rd , Trade Centre 1 - Dubai - United Arab Emirates`}
            />

            {/* WhatsApp */}
            <div className="flex gap-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${goldenColor}18` }}
              >
                <SiWhatsapp className="w-[18px] h-[18px]" style={{ color: goldenColor }} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white">WhatsApp</h4>
                <a
                  href="https://wa.me/971585964689"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-gray-700 dark:text-gray-300 text-sm hover:opacity-70 transition-colors duration-300"
                >
                  +971 585964689
                </a>
              </div>
            </div>

            {/* Call */}
            <Info
              icon={<Phone size={18} />}
              title="Call Us"
              text="+919330230426"
              href="tel:+919330230426"
            />

            {/* Email */}
            <Info
              icon={<Mail size={18} />}
              title="Email"
              text="info@grpremium.com"
              href="mailto:info@grpremium.com"
            />

            {/* Working Hours — updated per Duty Time */}
            <Info
              icon={<Clock size={18} />}
              title="Working Hours"
              text={`Monday – Saturday: 10:00 AM – 7:00 PM
Sunday: By Appointment`}
            />

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white dark:bg-[#101827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-md self-start transition-colors duration-300">
          <h3 className="font-heading text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {t("contact.sendUsEnquiry")}
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input name="name" label={t("form.fullName")} placeholder={t("form.enterFullName")} />
            <Input name="email" label={t("form.email")} type="email" placeholder={t("form.emailPlaceholder")} />
            <Input name="phone" label={t("form.phoneNumber")} placeholder={t("form.phonePlaceholder")} />

            <InputSelect
              name="country"
              label={t("form.countryOfResidence")}
              options={[
                "United Arab Emirates",
                "India",
                "United Kingdom",
                "United States",
                "Saudi Arabia",
                "Other",
              ]}
            />

            {/* Interested Property */}
            <div className="sm:col-span-2">
              <label className="font-body text-sm font-medium text-gray-700 dark:text-gray-200">
                {t("form.interestedProperty")} <span className="text-red-500">*</span>
              </label>
              <select
                name="interested_property"
                required
                className="font-body mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700
                           bg-white dark:bg-[#1f2937]
                           text-gray-900 dark:text-white
                           px-4 py-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              >
                <option value="">{t("form.selectProperty")}</option>
                <option>Emaar</option>
                <option>Damac</option>
                <option>Danube</option>
                <option>Sobha</option>
                <option>Binghatti</option>
                <option>Ellington</option>
                <option>Nakheel</option>
                <option>Meraas</option>
                <option>Azizi Developments</option>
                <option>Dubai Properties</option>
                <option>Other</option>
              </select>
            </div>

            {/* Consent */}
            <div className="sm:col-span-2 flex items-start gap-3 mt-2">
              <input type="checkbox" required className="mt-1" />
              <p className="font-body text-sm text-gray-700 dark:text-gray-300">
                {t("contact.consent")}
              </p>
            </div>

            {/* Button */}
            <div className="sm:col-span-2 mt-2">
              <button
                disabled={loading}
                type="submit"
                className="font-body w-full text-black py-3 rounded-lg
                           flex items-center justify-center gap-2
                           transition font-semibold hover:opacity-90"
                style={{ backgroundColor: goldenColor }}
              >
                <Send size={18} />
                {loading ? t("form.sending") : t("form.sendEnquiry")}
              </button>

              {success && (
                <p className="font-body mt-3 text-green-600 text-sm font-medium text-center">
                  {success}
                </p>
              )}

              {error && (
                <p className="font-body mt-3 text-red-600 text-sm font-medium text-center">
                  {error}
                </p>
              )}
            </div>

          </form>
        </div>
      </motion.section>

      {/* FULL WIDTH MAP */}
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg h-[300px] sm:h-[420px] lg:h-[500px] w-full">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Aspin+Commercial+Tower+Dubai&output=embed"
            />
          </div>
        </div>
      </motion.section>

      <CTA />
      <Footer />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Info({ icon, title, text, href }: any) {
  const content = (
    <div>
      <h4 className="font-heading font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="font-body text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );

  return (
    <div className="flex gap-4">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${goldenColor}18`, color: goldenColor }}
      >
        {icon}
      </div>
      {href ? (
        <a href={href} className="hover:opacity-70 transition-colors duration-300">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

function Input({ label, placeholder, type = "text", name }: any) {
  return (
    <div>
      <label className="font-body text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        required
        type={type}
        placeholder={placeholder}
        className="font-body mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700
                   bg-white dark:bg-[#1f2937]
                   text-gray-900 dark:text-white
                   px-4 py-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
      />
    </div>
  );
}

function InputSelect({ label, name, options }: any) {
  return (
    <div>
      <label className="font-body text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        required
        className="font-body mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700
                   bg-white dark:bg-[#1f2937]
                   text-gray-900 dark:text-white
                   px-4 py-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
      >
        <option value="">{label}</option>
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}