import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import T from "@/components/ui/T";
import DeveloperCardClient from "@/components/sections/DeveloperCardClient";

const query = `
*[_type == "developer"] | order(name asc){
  _id,
  name,
  shortDescription,
  shortDescription_hi, shortDescription_ar, shortDescription_ru,
  supportedLanguages,
  "slug": slug.current,
  logo
}
`;

type Developer = {
  _id: string;
  name: string;
  shortDescription?: string;
  slug: string;
  logo?: any;
  [key: string]: any;
};

export default async function DevelopersPage() {
  const developers: Developer[] = await sanityClient.fetch(query);

  return (
    <main className="bg-white dark:bg-[#0f172a] transition-colors duration-300">

      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/assets/hero-2.jpg"
          alt="Top Developers in Dubai"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <p className="text-yellow-400 tracking-widest uppercase mb-4 text-sm md:text-base">
              <T k="developersPage.ourPartners" />
            </p>

            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
              <T k="developersPage.heroTitle" />
            </h1>

            <p className="text-gray-200 mt-6 text-base md:text-lg">
              <T k="developersPage.heroDescription" />
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-[#C9A227] uppercase tracking-widest text-sm">
            <T k="developersPage.ourDevelopers" />
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
            <T k="developersPage.sectionTitle" />
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            <T k="developersPage.sectionDescription" />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {developers.map((dev) => (
            <DeveloperCardClient
              key={dev._id}
              developer={dev}
              logoUrl={dev.logo ? urlFor(dev.logo).width(600).quality(85).url() : undefined}
            />
          ))}
        </div>
      </section>

      <CTA />
      <Footer />

    </main>
  );
}
