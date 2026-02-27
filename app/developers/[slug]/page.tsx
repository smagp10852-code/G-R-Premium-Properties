import CTA from "@/components/sections/CTA";
import { sanityClient } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import { urlFor } from "@/lib/sanity.image";
import PropertiesClient from "@/components/sections/PropertiesClient";
import DeveloperAboutClient from "@/components/sections/DeveloperAboutClient";
import T from "@/components/ui/T";
import Footer from "@/components/layout/Footer";
import ScrollToHash from "@/components/ScrollToHash";

/* ================= SANITY QUERY ================= */
const developerWithProjectsQuery = `
*[_type == "developer" && slug.current == $slug][0]{
  _id,
  name,
  about,
  about_hi, about_ar, about_ru,
  supportedLanguages,
  heroImage,
  stats,
  "properties": *[
    _type == "property" &&
    developer._ref == ^._id
  ] | order(_createdAt desc){
    _id,
    title,
    title_hi, title_ar, title_ru,
    supportedLanguages,
    "slug": slug.current,
    handover,
    purpose,
    type,

    paymentPlan{
      booking,
      construction,
      handover
    },

    location->{
      name,
      name_hi, name_ar, name_ru,
      supportedLanguages,
      "slug": slug.current
    },

    images[]{
      asset->{url}
    },

    units[]{
      unitType,
      bedroomCount,
      customLabel,
      size,
      price
    },

    brochure{
      asset->{url}
    }
  }
}
`;

export default async function DeveloperPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  if (!slug) return notFound();

  const developer = await sanityClient.fetch(
    developerWithProjectsQuery,
    { slug }
  );

  if (!developer) return notFound();

  return (
    <main>
      <ScrollToHash />

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] w-full">
        {developer.heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${urlFor(developer.heroImage)
                .width(2000)
                .height(1000)
                .quality(85)
                .url()})`,
            }}
          />
        )}

        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <p className="text-yellow-400 tracking-widest uppercase mb-4">
              <T k="developerDetail.ourPartner" />
            </p>

            <h1 className="text-white text-4xl md:text-6xl font-bold">
              {developer.name}
            </h1>

            {/* ✅ FIXED HERO TEXT COLOR */}
            <p className="text-gray-200 mt-6 text-lg">
              <T k="developerDetail.heroDescription" />
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a
                href="#projects"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold"
              >
                <T k="developerDetail.viewProjects" />
              </a>

              <a
                href="/contact"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold"
              >
                <T k="nav.enquireNow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      {developer.stats && (
        <section className="py-14 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">

            {developer.stats.experience && (
              <div>
                <p className="text-4xl font-bold text-[#C9A227]">
                  {developer.stats.experience}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-300 mt-2">
                  <T k="developerDetail.yearsExperience" />
                </p>
              </div>
            )}

            {developer.stats.projects && (
              <div>
                <p className="text-4xl font-bold text-[#C9A227]">
                  {developer.stats.projects}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-300 mt-2">
                  <T k="developerDetail.projectsDelivered" />
                </p>
              </div>
            )}

            {developer.stats.homes && (
              <div>
                <p className="text-4xl font-bold text-[#C9A227]">
                  {developer.stats.homes}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-300 mt-2">
                  <T k="developerDetail.homesSold" />
                </p>
              </div>
            )}

            {developer.stats.locations && (
              <div>
                <p className="text-gray-300">
                  {developer.stats.locations}
                </p>
                <p className="text-sm uppercase tracking-widest text-gray-400 mt-2">
                  <T k="developerDetail.primeLocations" />
                </p>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ================= ABOUT ================= */}
      <DeveloperAboutClient developer={developer} />

      {/* ================= PROJECTS ================= */}
      <section
        id="projects"
        className="py-20 bg-white dark:bg-[#0F172A]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
            <T k="developerDetail.projectsBy" /> {developer.name}
          </h2>

          {developer.properties?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              <T k="developerDetail.noProjectsYet" />
            </p>
          ) : (
            <PropertiesClient properties={developer.properties} />
          )}
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}