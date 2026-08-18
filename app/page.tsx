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

    // ✅ NEW — PropertySlider ("Featured Properties") already shows the
    // first 4 items from `featuredProperties`. To avoid showing the exact
    // same cards again in the section below, the "3 normal" fill for that
    // section starts from item index 4 onward (the next 3 after what
    // PropertySlider already displayed) — featuredPropertiesQuery fetches
    // up to 10, so there's enough to draw from.
    const normalFillForHotSection = (featuredProperties || []).slice(4, 7);

    // 3 Hot + 3 Normal = 6 total, Hot ones first.
    const hotSectionProperties = [
      ...(hotProperties || []),
      ...normalFillForHotSection,
    ];

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

        {/* <PropertySlider properties={featuredProperties || []} /> */}

        {/* 3 Hot + 3 latest normal, merged — no more standalone "Hot"
            branding, hides itself automatically if there's nothing to show. */}
        <PropertyHot properties={hotSectionProperties} />

        {/* Unchanged, per client's explicit "isko yese rahne dete hai" */}
        {/* <PropertyLaunchSoon properties={launchSoonProperties || []} /> */}

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