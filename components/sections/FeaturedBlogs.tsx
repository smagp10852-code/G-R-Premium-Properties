"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BlogCard from "@/components/cards/BlogCard";
import T from "@/components/ui/T";

export default function FeaturedBlogs({ blogs = [] }: { blogs: any[] }) {
  if (!blogs?.length) return null;

  // Homepage shows only the top 4 — full list lives on /blog
  const displayBlogs = blogs.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#F8F9FB] dark:bg-[#0F172A] font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <p className="font-body text-xs sm:text-sm tracking-[0.2em] font-semibold uppercase mb-3 sm:mb-4 text-[#C9A227]">
            <T k="blog.blogs" />
          </p>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-5">
            <T k="blog.latestBlogs" />
          </h2>

          <p className="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400">
            <T k="blog.description" />
          </p>
        </div>

        {/* STATIC GRID — 2 columns on mobile/tablet (all 4 cards, 2x2),
            3 columns from lg (1024px) up. The 4th card is hidden exactly
            at lg so laptop/iPad Pro get a clean single row of 3 instead
            of an orphan 4th card wrapping alone to a second row. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {displayBlogs.map((blog, index) => (
            <motion.div
              key={`${blog._id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`h-full flex ${index === 3 ? "lg:hidden" : ""}`}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-10 sm:mt-16">
          <Link
            href="/blog"
            className="font-body inline-flex items-center gap-2 px-6 sm:px-10 py-2.5 sm:py-4 text-sm sm:text-base border-2 border-[#C9A227] text-[#C9A227] rounded-full hover:bg-[#C9A227] hover:text-black transition-all duration-300"
          >
            <T k="blog.viewAllBlogs" />
          </Link>
        </div>
      </div>
    </section>
  );
}