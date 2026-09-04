export const dynamic = "force-dynamic";

import { sanityClient } from "@/lib/sanity.client";
import { allLatestUpdatesQuery } from "@/lib/sanity.queries";
import Footer from "@/components/layout/Footer";
import UpdatesListClient from "@/components/sections/UpdatesListClient";
import CtaSection from "@/components/sections/CTA";

const goldenColor = "#C9A227";

export const metadata = {
  title: "Latest Updates & Offers",
  description:
    "Latest updates and limited-time offers from G R Premium Properties LLC.",
};

export default async function UpdatesPage() {
  const updates = (await sanityClient.fetch(allLatestUpdatesQuery)) || [];

  return (
    // ✅ pt-[150px] clears the fixed announcement bar + navbar (~110px)
    // above the heading. Bottom spacing is a single `pb-16` on the content
    // wrapper (not on <main>) — previously there was pb-24 on <main> AND
    // an extra mt-24 wrapper around <Footer>, which stacked into one huge
    // empty gap before the footer. Footer now follows the content with one
    // sensible gap, however few/many update cards there are.
    <main className="font-body pt-[150px] bg-gray-50 dark:bg-[#0F172A] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 pb-16">
        <div className="mb-10 text-center sm:text-left">
          <h1
            className="font-heading text-3xl sm:text-4xl font-bold"
            style={{ color: goldenColor }}
          >
            Latest Updates &amp; Offers
          </h1>
          <p className="font-body text-gray-600 dark:text-gray-300 mt-2">
            Limited-time deals and the latest news from G R Premium Properties.
          </p>
        </div>

        <UpdatesListClient updates={updates} />
      </div>
      <CtaSection />
    <Footer />
    </main>
  );
}