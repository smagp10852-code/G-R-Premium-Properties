import { sanityClient } from "@/lib/sanity.client";
import {
  communitiesQuery,
  propertiesQuery,
} from "@/lib/sanity.queries";

import PropertyFilter from "@/components/sections/PropertyFilter";
import PropertiesClient from "@/components/sections/PropertiesClient";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import T from "@/components/ui/T";

type SearchParams = Promise<{
  community?: string;
  search?: string;
  type?: string;
  min?: string;
  max?: string;
  purpose?: string;
  bed?: string;
}>;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {

  const params = await searchParams;

  const communities = await sanityClient.fetch(communitiesQuery);

  const properties = await sanityClient.fetch(propertiesQuery, {
    community: params.community ?? null,
    search: params.search ?? null,
    purpose: params.purpose ?? null,
    type: params.type ?? null,
    bed: params.bed ?? null,
    min: params.min ? Number(params.min) : null,
    max: params.max ? Number(params.max) : null,
  });

  return (
    <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* ================= HERO ================= */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src="/assets/hero-1.jpg"
          alt="Luxury Properties Dubai"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-white text-4xl md:text-6xl font-bold">
              <T k="properties.findDreamProperty" />
            </h1>
            <p className="text-gray-200 mt-4 text-lg">
              <T k="properties.heroDescription" />
            </p>
          </div>
        </div>
      </section>

      {/* ================= FILTER ================= */}
      <PropertyFilter communities={communities || []} />

      {/* ================= RESULTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        {properties.length === 0 ? (
          <div className="text-center py-28">
            <div className="text-6xl mb-6">🔍</div>

            <h2 className="text-2xl md:text-3xl font-semibold 
                           text-gray-900 dark:text-white">
              <T k="properties.noPropertiesFound" />
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3">
              <T k="properties.noPropertiesDescription" />
            </p>
          </div>
        ) : (
          <PropertiesClient properties={properties} />
        )}

      </section>

      <CTA />
      <Footer />

    </main>
  );
}
