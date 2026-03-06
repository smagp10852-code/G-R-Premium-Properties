"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import BlogCard from "@/components/cards/BlogCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import T from "@/components/ui/T";

export default function FeaturedBlogs({ blogs = [] }: { blogs: any[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sliderData = useMemo(() => {
    if (!blogs) return [];
    if (blogs.length < 4) return [...blogs, ...blogs];
    return blogs.slice(0, 10);
  }, [blogs]);

  if (!mounted || !sliderData.length) return null;

  return (
    <section className="py-24 bg-[#F8F9FB] dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm tracking-[0.2em] font-semibold uppercase mb-4 text-[#C9A227]">
            <T k="blog.blogs" />
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            <T k="blog.latestBlogs" />
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            <T k="blog.description" />
          </p>
        </div>

        {/* SLIDER */}
        <div className="overflow-hidden">

          <Swiper
            className="blog-swiper"
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            navigation
            loop
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {sliderData.map((blog, index) => (
              <SwiperSlide
                key={`${blog._id}-${index}`}
                className="h-auto flex"
              >
                <div className="w-full flex">
                  <BlogCard blog={blog} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        {/* BUTTON */}
        <div className="text-center mt-16">
          <Link
            href="/blog"
            className="
            inline-flex items-center gap-2
            px-10 py-4
            border-2 border-[#C9A227]
            text-[#C9A227]
            rounded-full
            hover:bg-[#C9A227]
            hover:text-black
            transition-all duration-300
            "
          >
            <T k="blog.viewAllBlogs" /> 
          </Link>
        </div>

      </div>
    </section>
  );
}