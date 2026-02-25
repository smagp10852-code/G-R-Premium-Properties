import { sanityClient } from "@/lib/sanity.client";
import ImageCard from "./image-card";
import VideoCard from "./video-card";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import T from "@/components/ui/T";

const query = `
*[_type == "media"] | order(_createdAt desc){
  _id,
  title,
  location,
  mediaType,

  images[]{
    asset->{
      _id,
      url
    }
  },

  youtubeUrl
}
`;

export default async function MediaPage() {
  const media = await sanityClient.fetch(query);

  return (
    <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[50vh] w-full">
        <img
          src="/assets/hero-1.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Media Hero"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <T k="media.title" />
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              <T k="media.subtitle" />
            </p>
          </div>
        </div>
      </section>

      {/* ================= MEDIA GRID ================= */}
      <section className="px-6 md:px-20 py-20 bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {media.map((item: any) => (
              <div
                key={item._id}
                className="space-y-3"
              >
                {/* CARD TYPE LABEL */}
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
                  {item.mediaType === "image" ? <T k="media.image" /> : <T k="media.video" />}
                </h3>

                {/* ================= IMAGE CARD ================= */}
                {item.mediaType === "image" &&
                  item.images?.length > 0 && (
                    <ImageCard
                      images={item.images}
                      title={item.title}
                      location={item.location}
                    />
                  )}

                {/* ================= VIDEO CARD ================= */}
                {item.mediaType === "youtube" &&
                  item.youtubeUrl && (
                    <VideoCard youtubeUrl={item.youtubeUrl} />
                  )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
