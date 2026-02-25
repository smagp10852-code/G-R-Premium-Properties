import { sanityClient } from "@/lib/sanity.client";
import { propertiesByDeveloperQuery } from "@/lib/sanity.queries";
import DeveloperPropertiesClient from "@/components/DeveloperPropertiesClient";

export default async function DeveloperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Next 16 fix
  const { slug } = await params;

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
        {properties?.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No properties found.
          </p>
        ) : (
          <DeveloperPropertiesClient properties={properties} />
        )}

      </div>
    </main>
  );
}
