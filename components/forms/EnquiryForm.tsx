"use client";

import { Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "@/lib/language-context";

/* ---------------- OPTIONS ---------------- */
const PROPERTY_OPTIONS = [
  "Emaar",
  "Damac",
  "Danube",
  "Sobha",
  "Binghatti",
  "Ellington",
  "Nakheel",
  "Meraas",
  "Azizi Developments",
  "Dubai Properties",
];

export default function EnquiryForm({
  onClose,
  defaultProperty = "",
}: {
  onClose?: () => void;   // ✅ optional to prevent error
  defaultProperty?: string;
}) {
  const { t } = useTranslation();
  const COUNTRY_OPTIONS = [
    t("country.uae"),
    t("country.india"),
    t("country.uk"),
    t("country.us"),
    t("country.saudiArabia"),
    t("country.other"),
  ];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [otherProperty, setOtherProperty] = useState("");

  useEffect(() => {
  console.log("🔥 REAL ENQUIRY FORM MOUNTED");
}, []);
useEffect(() => {
  console.log("ONCLOSE VALUE:", onClose);
}, []);

  /* ================= BODY LOCK ================= */
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  /* ================= AUTO PREFILL ================= */
  useEffect(() => {
    if (!defaultProperty) return;

    const match = PROPERTY_OPTIONS.find(
      (p) => p.toLowerCase() === defaultProperty.toLowerCase()
    );

    if (match) {
      setSelectedProperty(match);
    } else {
      setSelectedProperty("Other");
      setOtherProperty(defaultProperty);
    }
  }, [defaultProperty]);

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    emailjs
      .sendForm(
        "service_uyrhwx8",
        "template_66qrmxf",
        e.target,
        "lVPUd6uuppl88FX8U"
      )
      .then(() => {
  console.log("Email sent, closing modal");
  e.target.reset();
  onClose?.();
})


      .catch(() => {
        setError(t("form.errorMessage"));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="fixed inset-0 z-[9999] text-black bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={() => {
        if (onClose) onClose();   // ✅ side click close
      }}
    >
      {/* Modal Box */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl 
                   max-h-[90vh] overflow-y-auto p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}  // prevent inside click close
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("form.sendEnquiry")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <Input name="name" label={t("form.fullName")} placeholder={t("form.enterFullName")} />
          <Input name="email" label={t("form.email")} type="email" placeholder={t("form.emailPlaceholder")} />
          <Input name="phone" label={t("form.phoneNumber")} placeholder={t("form.phonePlaceholder")} />

          <Select name="country" label={t("form.countryOfResidence")} options={COUNTRY_OPTIONS} />

          {/* PROPERTY */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">
              {t("form.interestedProperty")} <span className="text-red-500">*</span>
            </label>

            <select
              required
              name="interested_property"
              value={selectedProperty}
              onChange={(e) => {
                setSelectedProperty(e.target.value);
                if (e.target.value !== "Other") setOtherProperty("");
              }}
              className="mt-2 w-full rounded-lg border-2 border-yellow-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">{t("form.selectProperty")}</option>
              {PROPERTY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
              <option value="Other">{t("form.other")}</option>
            </select>
          </div>

          {selectedProperty === "Other" && (
            <div className="sm:col-span-2">
              <Input
                name="other_property"
                label={t("form.otherPropertyName")}
                placeholder={t("form.enterPropertyName")}
                value={otherProperty}
                onChange={(e: any) => setOtherProperty(e.target.value)}
              />
            </div>
          )}

          <div className="sm:col-span-2 flex items-start gap-3">
            <input type="checkbox" required name="consent_status" value="Yes" />
            <p className="text-sm">
              {t("form.consent")}
            </p>
          </div>

          <div className="sm:col-span-2">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            >
              <Send size={18} />
              {loading ? t("form.sending") : t("form.sendEnquiry")}
            </button>

            {success && (
              <p className="mt-3 text-green-600 text-center">{success}</p>
            )}

            {error && (
              <p className="mt-3 text-red-600 text-center">{error}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- INPUT ---------- */
function Input({ label, name, placeholder, type = "text", value, onChange }: any) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border-2 border-yellow-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}

/* ---------- SELECT ---------- */
function Select({ label, name, options }: any) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        required
        name={name}
        className="mt-2 w-full rounded-lg border-2 border-yellow-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500"
      >
        <option value="">{label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
