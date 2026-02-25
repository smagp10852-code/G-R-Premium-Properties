import { sanityClient } from "@/lib/sanity.client";
import { singleAnnouncementQuery } from "@/lib/sanity.queries";
import { notFound } from "next/navigation";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import AnnouncementDetailClient from "@/components/sections/AnnouncementDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AnnouncementDetail({ params }: Props) {
  // ✅ Next 16 fix — unwrap params
  const { slug } = await params;

  if (!slug) return notFound();

  const announcement = await sanityClient.fetch(
    singleAnnouncementQuery,
    { slug }
  );

  if (!announcement) return notFound();

  const whatsappMessage = encodeURIComponent(
    `Hi, I want to book a slot for ${announcement.title}`
  );

  return (
    <main className="pt-[80px] bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <AnnouncementDetailClient announcement={announcement} />

      <div className="max-w-6xl mx-auto px-6 pb-16 flex justify-center">
        <a
          href={`https://wa.me/919999999999?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-xl transition duration-300 shadow-lg"
        >
          📲 Book Slot on WhatsApp
        </a>
      </div>

      <CTA />
      <Footer />
    </main>
  );
}
