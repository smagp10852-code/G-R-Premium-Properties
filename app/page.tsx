// ✅ Force dynamic rendering (Sanity live data)
export const dynamic = "force-dynamic";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Property from "@/components/sections/Property";
import DeveloperSection from "@/components/sections/developer";
import Blog from "@/components/sections/FeaturedBlogs";
import Terminology from "@/components/sections/Terminology";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

import { sanityClient } from "@/lib/sanity.client";
import {
  homepageHeroQuery,
  communitiesQuery,
  featuredDevelopersQuery,
  featuredPropertiesQuery,
} from "@/lib/sanity.queries";

import { HomepageData } from "@/types/homepage";

export default async function Home() {
  try {
    /* ================= FETCH ALL DATA IN PARALLEL ================= */

    const [
      homepage,
      developers,
      communities,
      featuredProperties,
    ] = await Promise.all([
      sanityClient.fetch<HomepageData>(homepageHeroQuery),
      sanityClient.fetch(featuredDevelopersQuery),
      sanityClient.fetch(communitiesQuery),
      sanityClient.fetch(featuredPropertiesQuery),
    ]);

    /* ================= SAFE HERO SLIDES ================= */

    const heroSlides =
      homepage?.heroSlides?.filter(
        (slide: any) => slide?.image?.asset?.url
      ) || [];

    return (
      <>
        <Hero
          slides={heroSlides}
          ctaText={homepage?.heroCTA || "Explore Properties"}
          ctaText_hi={homepage?.heroCTA_hi}
          ctaText_ar={homepage?.heroCTA_ar}
          ctaText_ru={homepage?.heroCTA_ru}
          communities={communities || []}
        />

        <About />

        <Property properties={featuredProperties || []} />

        {/* 🔥 Developers Section (Server Fetched Data Pass) */}
        <DeveloperSection developers={developers || []} />

        <Blog />
        <Terminology />
        <CTA />
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Homepage Load Error:", error);

    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Something went wrong loading homepage.
      </div>
    );
  }
}