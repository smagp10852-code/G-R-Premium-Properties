"use client";

import { X } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { useTranslation } from "@/lib/language-context";

export default function EnquiryModal({
  open,
  onClose,
  propertyName = "",
}: {
  open: boolean;
  onClose: () => void;
  propertyName?: string;
}) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">

      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* SCROLL AREA */}
      <div className="fixed inset-0 overflow-y-auto">

        <div className="min-h-full flex justify-center items-start pt-24 pb-16 px-4">

          <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">
              {t("enquiryModal.title")}
            </h2>

            <EnquiryForm
              defaultProperty={propertyName}
              onClose={onClose}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
