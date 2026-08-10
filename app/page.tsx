// // ✅ Force dynamic rendering (Sanity live data)
// export const dynamic = "force-dynamic";

// import Hero from "@/components/sections/Hero";
// import About from "@/components/sections/About";
// import PropertySlider from "@/components/sections/PropertySlider";
// import DeveloperSection from "@/components/sections/developer";
// import FeaturedBlogs from "@/components/sections/FeaturedBlogs";
// import Terminology from "@/components/sections/Terminology";
// import CTA from "@/components/sections/CTA";
// import Footer from "@/components/layout/Footer";

// import { sanityClient } from "@/lib/sanity.client";
// import {
//   homepageHeroQuery,
//   communitiesQuery,
//   featuredDevelopersQuery,
//   featuredPropertiesQuery,
//   latestBlogsQuery,
// } from "@/lib/sanity.queries";

// import { HomepageData } from "@/types/homepage";

// export default async function Home() {
//   try {

//     const [
//       homepage,
//       developers,
//       communities,
//       featuredProperties,
//       blogs,
//     ] = await Promise.all([
//       sanityClient.fetch<HomepageData>(homepageHeroQuery),
//       sanityClient.fetch(featuredDevelopersQuery),
//       sanityClient.fetch(communitiesQuery),
//       sanityClient.fetch(featuredPropertiesQuery),
//       sanityClient.fetch(latestBlogsQuery),
//     ]);

//     const heroSlides =
//       homepage?.heroSlides?.filter(
//         (slide: any) => slide?.image?.asset?.url
//       ) || [];

//     return (
//       <>
//         <Hero
//           slides={heroSlides}
//           ctaText={homepage?.heroCTA || "Explore Properties"}
//           ctaText_hi={homepage?.heroCTA_hi}
//           ctaText_ar={homepage?.heroCTA_ar}
//           ctaText_ru={homepage?.heroCTA_ru}
//           communities={communities || []}
//         />

//         <About />

//         <PropertySlider properties={featuredProperties || []} />

//         <DeveloperSection developers={developers || []} />

//         {/* BLOGS */}
//         <FeaturedBlogs blogs={blogs || []} />

//         <Terminology />

//         <CTA />

//         <Footer />
//       </>
//     );

//   } catch (error) {
//     console.error("Homepage Load Error:", error);

//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
//         Something went wrong loading homepage.
//       </div>
//     );
//   }
// }

// ✅ Force dynamic rendering (Sanity live data)
export const dynamic = "force-dynamic";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PropertySlider from "@/components/sections/PropertySlider";
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
      blogs,
    ] = await Promise.all([
      sanityClient.fetch<HomepageData>(homepageHeroQuery),
      sanityClient.fetch(featuredDevelopersQuery),
      sanityClient.fetch(communitiesQuery),
      sanityClient.fetch(featuredPropertiesQuery),
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

        <PropertySlider properties={featuredProperties || []} />

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