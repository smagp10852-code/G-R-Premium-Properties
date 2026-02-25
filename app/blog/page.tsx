import { sanityClient } from "@/lib/sanity.client";
import { allBlogsQuery } from "@/lib/sanity.queries";
import BlogCard from "@/components/cards/BlogCard";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import T from "@/components/ui/T";

export const revalidate = 60;

export default async function BlogPage() {
  const blogs = await sanityClient.fetch(allBlogsQuery);

  return (
    <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* ================= HERO ================= */}
      <section className="relative h-[320px] md:h-[420px] flex items-center justify-center text-center text-white overflow-hidden">
        
        <img
          src="/assets/hero-1.jpg"
          alt="Blog Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            <T k="blog.ourBlog" />
          </h1>
          <p className="mt-4 text-gray-200">
            <T k="blog.blogDescription" />
          </p>
        </div>
      </section>

      {/* ================= BLOG LIST ================= */}
      <section className="py-20 bg-white dark:bg-[#0F172A] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">

          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                <T k="blog.noBlogsFound" />
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-3">
                <T k="blog.checkBackLater" />
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog: any) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
