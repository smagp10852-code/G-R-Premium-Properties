import type { Metadata } from "next";
import ContactForm from "./ContactForm";

// ✅ SEO — Contact page meta title & description (from SEO sheet, row 12)
// NOTE: this had to become a separate server-component file because the
// original contact page.tsx starts with "use client" — Next.js does NOT
// allow `export const metadata` in a Client Component. This file stays a
// Server Component (no "use client") purely to carry the metadata, and
// just renders the real interactive form from ContactForm.tsx.
export const metadata: Metadata = {
  title: "Trusted Dubai Real Estate Agency | G R Premium Properties",
  description:
    "Contact G R Premium Properties for expert assistance with buying, selling and investing in Dubai real estate, including luxury and off-plan properties.",
  alternates: {
    canonical: "https://www.grpremium.com/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}