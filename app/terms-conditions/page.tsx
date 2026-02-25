import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | G R Premium Properties LLC",
  description:
    "Terms and Conditions of G R Premium Properties LLC. Read the legal terms governing the use of our website and services.",
};

export default function TermsConditions() {
  return (
    <div className="bg-black text-gray-300 min-h-screen">

      <div className="relative bg-gradient-to-b from-black via-[#0d0d0d] to-black py-32 px-6 text-center overflow-hidden">

        <h1 className="text-4xl md:text-6xl font-semibold text-[#D4A843] tracking-wide">
          Terms & Conditions
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          Please read these terms carefully before using our website or
          engaging with our services.
        </p>

        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A843]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 -mt-24 pb-24 z-10">

        <div className="relative 
                        bg-gradient-to-br 
                        from-[#141414] 
                        via-[#1a140a] 
                        to-[#111] 
                        rounded-3xl 
                        p-12 md:p-16 
                        border border-[#D4A843]/30 
                        shadow-[0_20px_60px_rgba(212,168,67,0.15)]">

          <p className="text-lg leading-relaxed text-gray-400">
            These Terms & Conditions govern your use of the G R Premium
            Properties LLC website and services. By accessing this website,
            you agree to comply with and be bound by the following terms.
          </p>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              1. Use of Website
            </h2>
            <p className="text-gray-400 leading-relaxed">
              You agree to use this website only for lawful purposes. You must
              not misuse the website by knowingly introducing malicious content,
              submitting false information, or attempting unauthorized access.
            </p>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              2. Property Information Disclaimer
            </h2>
            <p className="text-gray-400 leading-relaxed">
              All property listings, prices, availability, images, and project
              details displayed on this website are for informational purposes
              only and are subject to change without prior notice. Final terms,
              pricing, and agreements are governed by the respective developer
              or property owner.
            </p>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              3. No Legal or Financial Advice
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Information provided on this website does not constitute legal,
              financial, or investment advice. Users are encouraged to conduct
              independent research or consult professional advisors before
              making property investment decisions.
            </p>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              4. Intellectual Property
            </h2>
            <p className="text-gray-400 leading-relaxed">
              All website content including logos, images, branding, text,
              graphics, and layout design are the property of G R Premium
              Properties LLC and may not be copied, reproduced, or distributed
              without written permission.
            </p>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-400 leading-relaxed">
              G R Premium Properties LLC shall not be liable for any direct,
              indirect, or consequential loss arising from reliance on
              information provided on this website.
            </p>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              6. Changes to Terms
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to update or modify these Terms &
              Conditions at any time without prior notice. Continued use of
              this website constitutes acceptance of any changes.
            </p>
          </section>

          

        </div>
      </div>
    </div>
  );
}
