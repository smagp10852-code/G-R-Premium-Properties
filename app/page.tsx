import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Property from "@/components/sections/Property";
import Developer from "@/components/sections/developer";
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
    /* ================= FETCH DATA ================= */

    const [
      homepage,
      developers,
      communities,
      featuredProperties,
    ] = await Promise.all([
      sanityClient.fetch<HomepageData>(homepageHeroQuery, {}, { cache: "no-store" }),
      sanityClient.fetch(featuredDevelopersQuery, {}, { cache: "no-store" }),
      sanityClient.fetch(communitiesQuery, {}, { cache: "no-store" }),
      sanityClient.fetch(featuredPropertiesQuery, {}, { cache: "no-store" }),
    ]);

    /* ================= SAFE HERO SLIDES ================= */

    const heroSlides =
      homepage?.heroSlides?.filter((slide) => slide?.image?.asset?.url) || [];

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

        <Developer developers={developers || []} />

        <Blog />
        <Terminology />
        <CTA />
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Homepage Load Error:", error);
    return <div>Something went wrong loading homepage.</div>;
  }
}