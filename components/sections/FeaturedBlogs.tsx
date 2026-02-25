import { sanityClient } from "@/lib/sanity.client";
import { allBlogsQuery } from "@/lib/sanity.queries";
import BlogCard from "@/components/cards/BlogCard";
import Link from "next/link";
import T from "@/components/ui/T";

export default async function FeaturedBlogs() {
  const blogs = await sanityClient.fetch(allBlogsQuery);

  return (
    <section className="w-full py-20 bg-[#E5E7EB] dark:bg-[#0F172A] transition-colors duration-300">
      <div className="w-full px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#C9A227] text-sm font-semibold tracking-[0.2em] uppercase">
            <T k="blog.blogs" />
          </span>

          <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
            <T k="blog.latestBlogs" />
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4">
            <T k="blog.description" />
          </p>
        </div>

        {/* GRID */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog: any) => (
              <div key={blog._id} className="w-full">
                <BlogCard
                  blog={blog}
                />
              </div>
            ))}
          </div>
        </div>

        {/* VIEW ALL BLOGS BUTTON */}
        <div className="text-center mt-16">
          <Link
            href="/blog"
            className="
              inline-flex 
              items-center 
              gap-2 
              px-10 
              py-4 
              border-2 
              border-[#C9A227] 
              text-[#1E2A38] 
              dark:text-[#C9A227]
              font-semibold 
              rounded-full 
              hover:bg-[#C9A227] 
              hover:text-white 
              dark:hover:text-black
              transition-all 
              duration-300
            "
          >
            <T k="blog.viewAllBlogs" />
          </Link>
        </div>

      </div>
    </section>
  );
}
