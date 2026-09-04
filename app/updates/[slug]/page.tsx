import { sanityClient } from "@/lib/sanity.client";
import { singleLatestUpdateQuery } from "@/lib/sanity.queries";
import { notFound } from "next/navigation";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import UpdateDetailClient from "@/components/sections/UpdateDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function UpdateDetail({ params }: Props) {
  // Next 15/16 — params is async, must be unwrapped.
  const { slug } = await params;

  if (!slug) return notFound();

  const update = await sanityClient.fetch(singleLatestUpdateQuery, { slug });

  if (!update) return notFound();

  return (
    <main className="font-body pt-[130px] bg-gradient-to-b from-gray-50 to-white dark:from-[#0F172A] dark:to-[#0F172A] min-h-screen">
      <UpdateDetailClient update={update} />

      <CTA />
      <Footer />
    </main>
  );
}