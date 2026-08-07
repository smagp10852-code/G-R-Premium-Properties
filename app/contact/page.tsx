"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import { useTranslation } from "@/lib/language-context";
import { SiWhatsapp } from "react-icons/si";

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
    <div className="font-body w-full overflow-hidden bg-[#FBF6E9] dark:bg-[#0f172a] transition-colors duration-300">

      {/* HERO */}
      <section className="relative h-[320px] sm:h-[420px] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 max-w-3xl">
          <p className="font-body tracking-widest text-yellow-400 mb-2">
            {t("contact.getInTouch")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl mb-4">
            {t("contact.contactUs")}
          </h1>
          <p className="font-body text-gray-200 text-sm sm:text-base">
            {t("contact.heroDescription")}
          </p>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">

        {/* LEFT INFO */}
        <div>
          <p className="font-body text-yellow-500 tracking-widest mb-2">
            {t("contact.contactInformation")}
          </p>
          <h2 className="font-heading text-3xl mb-8 dark:text-white">
            {t("contact.getInTouchTitle")}
          </h2>

          <div className="space-y-6">

            {/* Address */}
            <Info
              icon={<MapPin />}
              title="Office Address"
              text={`401C Aspin Commercial Tower
Near Financial Center Metro
Sheikh Zayed Road
Dubai, UAE`}
            />

            {/* WhatsApp */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <SiWhatsapp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-heading font-semibold dark:text-white">WhatsApp</h4>
                
               <a   href="https://wa.me/971543087712"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-gray-700 dark:text-gray-300 text-sm hover:text-green-500 transition-colors duration-300"
                >
                  +971 543087712
                </a>
              </div>
            </div>

            {/* Call */}
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#C9A227]" />
              </div>
              <div>
                <h4 className="font-heading font-semibold dark:text-white">Call Us</h4>
                
                <a  href="tel:+9717604007170"
                  className="font-body text-gray-700 dark:text-gray-300 text-sm hover:text-yellow-500 transition-colors duration-300"
                >
                  +971 7604007170
                </a>
              </div>
            </div>

            {/* Email */}
            <Info
              icon={<Mail />}
              title="Email"
              text="sales@grpremium.com"
            />

            {/* Working Hours */}
            <Info
              icon={<Clock />}
              title="Working Hours"
              text={`Monday – Saturday: 9:00 AM – 6:00 PM
Sunday: By Appointment`}
            />

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white dark:bg-[#111827] border-2 border-[#C9A227] rounded-2xl p-6 sm:p-8 shadow-sm self-start transition-colors duration-300">
          <h3 className="font-heading text-2xl mb-6 dark:text-white">
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
              <label className="font-body text-sm font-medium dark:text-gray-200">
                {t("form.interestedProperty")} <span className="text-red-500">*</span>
              </label>
              <select
                name="interested_property"
                required
                className="font-body mt-2 w-full rounded-xl border-2 border-[#C9A227]
                           bg-white dark:bg-[#1f2937]
                           text-gray-900 dark:text-white
                           px-4 py-3
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
            <div className="sm:col-span-2 mt-3">
              <button
                disabled={loading}
                type="submit"
                className="font-body w-full bg-[#C9A227] hover:bg-[#b8961f]
                           text-white py-3 rounded-xl
                           flex items-center justify-center gap-2
                           transition font-medium"
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
      </section>

      {/* FULL WIDTH MAP */}
      <section className="w-full px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden border-2 border-[#C9A227] shadow-lg h-[350px] sm:h-[420px] lg:h-[500px] w-full">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Aspin+Commercial+Tower+Dubai&output=embed"
            />
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Info({ icon, title, text }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-heading font-semibold dark:text-white">{title}</h4>
        <p className="font-body text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function Input({ label, placeholder, type = "text", name }: any) {
  return (
    <div>
      <label className="font-body text-sm font-medium dark:text-gray-200">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        name={name}
        required
        type={type}
        placeholder={placeholder}
        className="font-body mt-2 w-full rounded-xl border-2 border-[#C9A227]
                   bg-white dark:bg-[#1f2937]
                   text-gray-900 dark:text-white
                   px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
      />
    </div>
  );
}

function InputSelect({ label, name, options }: any) {
  return (
    <div>
      <label className="font-body text-sm font-medium dark:text-gray-200">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        required
        className="font-body mt-2 w-full rounded-xl border-2 border-[#C9A227]
                   bg-white dark:bg-[#1f2937]
                   text-gray-900 dark:text-white
                   px-4 py-3
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