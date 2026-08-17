export const dynamic = "force-dynamic";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PropertySlider from "@/components/sections/PropertySlider";
import PropertyHot from "@/components/sections/PropertyHot";
import PropertyLaunchSoon from "@/components/sections/LaunchingSoon";
import DeveloperSection from "@/components/sections/developer";
import FeaturedBlogs from "@/components/sections/FeaturedBlogs";
import Terminology from "@/components/sections/Terminology";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

import { sanityClient } from "@/lib/sanity.client";
import {
  homepageHeroQuery,
  communitiesQuery,
  featuredDevelopersQuery,
  featuredPropertiesQuery,
  hotPropertiesQuery,
  launchSoonPropertiesQuery,
  latestBlogsQuery,
} from "@/lib/sanity.queries";

import { HomepageData } from "@/types/homepage";

export default async function Home() {
  try {

    const [
      homepage,
      developers,
      communities,
      featuredProperties,
      hotProperties,
      launchSoonProperties,
      blogs,
    ] = await Promise.all([
      sanityClient.fetch<HomepageData>(homepageHeroQuery),
      sanityClient.fetch(featuredDevelopersQuery),
      sanityClient.fetch(communitiesQuery),
      sanityClient.fetch(featuredPropertiesQuery),
      sanityClient.fetch(hotPropertiesQuery),
      sanityClient.fetch(launchSoonPropertiesQuery),
      sanityClient.fetch(latestBlogsQuery),
    ]);

    // ✅ FIX: pehle sirf "slide.image.asset.url" check hota tha, jo video
    // slides ko hamesha reject kar deta tha (video slides ka image field
    // khali hota hai). Ab mediaType ke hisaab se sahi field check hota hai.
    const heroSlides =
      homepage?.heroSlides?.filter((slide: any) => {
        const mediaType = slide?.mediaType === "video" ? "video" : "image";
        if (mediaType === "video") return !!slide?.video?.asset?.url;
        return !!slide?.image?.asset?.url;
      }) || [];

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

       

        {/* Both hide themselves automatically if there's nothing tagged
            "hot" / "launching_soon" in Sanity yet — no empty sections. */}
        <PropertyHot properties={hotProperties || []} />
        <PropertyLaunchSoon properties={launchSoonProperties || []} />
         

        <DeveloperSection developers={developers || []} />

        {/* BLOGS */}
        <FeaturedBlogs blogs={blogs || []} />

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