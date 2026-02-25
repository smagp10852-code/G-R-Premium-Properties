"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/language-context";

const goldenColor = "#C9A227";

export default function BrochureModal({
  open,
  onClose,
  pdfUrl,
  propertyName,
}: {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  propertyName: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwO1xCr58CcO12NzHilvsmLGr9W_zvTTQfsHmJ93lySxl5am4u5nafx_qioeHxACjZOZA/exec",
        {
          method: "POST",
          body: JSON.stringify({
            ...form,
            property: propertyName,
          }),
        }
      );

      // PDF Open
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
      }

      onClose();
      setForm({ name: "", email: "", phone: "", country: "" });
    } catch (error) {
      alert(t("brochure.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-[#1F2937] rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-2 text-center">
              {t("brochure.downloadBrochure")}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
              {propertyName}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder={t("brochure.fullName")}
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
              />

              <input
                type="email"
                name="email"
                required
                placeholder={t("brochure.emailAddress")}
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
              />

              <input
                type="tel"
                name="phone"
                required
                placeholder={t("brochure.phoneNumber")}
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
              />

              <input
                type="text"
                name="country"
                required
                placeholder={t("brochure.country")}
                value={form.country}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-black transition-all duration-300"
                style={{ backgroundColor: goldenColor }}
              >
                {loading ? t("brochure.submitting") : t("brochure.submitDownload")}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-500 w-full"
            >
              {t("brochure.cancel")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
