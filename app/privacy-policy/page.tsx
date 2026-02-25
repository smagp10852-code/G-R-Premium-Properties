import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | G R Premium Properties LLC",
  description:
    "Privacy Policy of G R Premium Properties LLC. Learn how we collect, use and protect your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-black text-gray-300 min-h-screen">

      <div className="relative bg-gradient-to-b from-black via-[#0d0d0d] to-black py-32 px-6 text-center overflow-hidden">

        <h1 className="text-4xl md:text-6xl font-semibold text-[#D4A843] tracking-wide">
          Privacy Policy
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          Your trust matters to us. We are committed to protecting your
          personal information with transparency, security, and integrity.
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

          <div className="absolute -top-16 -left-16 w-72 h-72 
                          bg-[#D4A843]/10 blur-[120px] rounded-full" />

          <p className="text-lg leading-relaxed text-gray-400 relative z-10">
            G R Premium Properties LLC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
            respects your privacy and is dedicated to safeguarding your
            personal information. This Privacy Policy explains how we collect,
            use, and protect the information you provide when interacting with
            our website and services.
          </p>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6 relative z-10">
            <h2 className="text-3xl font-semibold text-white">
              Information We Collect
            </h2>

            <ul className="space-y-4">
              {[
                "Name, phone number, and email address",
                "Property preferences and inquiry details",
                "Information submitted through website forms",
                "Recruitment-related submissions",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-400">
                  <span className="w-2 h-2 mt-2 bg-[#D4A843] rounded-full shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6 relative z-10">
            <h2 className="text-3xl font-semibold text-white">
              How We Use Your Information
            </h2>

            <ul className="space-y-4">
              {[
                "Respond to property inquiries and provide requested information",
                "Share relevant project details and updates",
                "Send marketing communications (where consent is provided)",
                "Improve our services and customer experience",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-400">
                  <span className="w-2 h-2 mt-2 bg-[#D4A843] rounded-full shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6 relative z-10">
            <h2 className="text-3xl font-semibold text-white">
              Data Protection & Security
            </h2>

            <p className="text-gray-400 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal data against unauthorized
              access, disclosure, alteration, or misuse.
            </p>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6 relative z-10">
            <h2 className="text-3xl font-semibold text-white">
              Consent
            </h2>

            <p className="text-gray-400 leading-relaxed">
              By submitting any form on our website{" "}
              <a
                href="https://grpremium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A843] hover:underline"
              >
                grpremium.com
              </a>
              , you consent to receive communication from our team via phone,
              email, or WhatsApp regarding your inquiry or expressed interest.
            </p>
          </section>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent"></div>

          <section className="space-y-6 relative z-10">
            <h2 className="text-3xl font-semibold text-white">
              Contact Us
            </h2>

            <p className="text-gray-400">
              If you have any privacy-related concerns or questions, please
              contact us at:
            </p>

            <p className="text-[#D4A843] font-medium text-lg">
              <a href="mailto:sales@grpremium.com">
                sales@grpremium.com
              </a>
            </p>
          </section>

          

        </div>
      </div>
    </div>
  );
}
