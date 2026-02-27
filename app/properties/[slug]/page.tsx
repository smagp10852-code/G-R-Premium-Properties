import { sanityClient } from "@/lib/sanity.client";
import { propertiesByDeveloperQuery } from "@/lib/sanity.queries";
import PropertyCard from "@/components/cards/PropertyCard";
import { notFound } from "next/navigation";

// ✅ Recommended for Sanity
export const dynamic = "force-dynamic";

export default async function DeveloperPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  if (!slug) return notFound();

  const properties = await sanityClient.fetch(
    propertiesByDeveloperQuery,
    { slug }
  );

  return (
    <main className="py-24 bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADING ================= */}
        <h1 className="text-3xl md:text-4xl font-bold mb-14 capitalize 
                       text-gray-900 dark:text-white">
          Projects by {slug.replace(/-/g, " ")}
        </h1>

        {/* ================= CONTENT ================= */}
        {!properties || properties.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No properties found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property: any) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}