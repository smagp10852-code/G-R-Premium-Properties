"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import { useTranslation } from "@/lib/language-context";

interface BlogCardProps {
  blog: {
    title: string;
    subtitle?: string;
    excerpt: string;
    slug: string;
    mainImage?: any;
    [key: string]: any;
  };
}

const PLACEHOLDER = "/images/placeholder.jpg";
const goldenColor = "#C9A227";

export default function BlogCard({ blog }: BlogCardProps) {
  const { t, lang } = useTranslation();

  const getLocalized = (item: any, field: string) => {
    if (lang === "en") return item[field];
    return item[`${field}_${lang}`] || item[field];
  };

  const slug = typeof blog.slug === 'object' ? (blog.slug as any)?.current : blog.slug;

  const imageUrl = blog?.mainImage
    ? urlFor(blog.mainImage).width(800).height(600).url()
    : PLACEHOLDER;

  return (
    <article
      className="
        h-full
        bg-white dark:bg-[#101827]
        text-black dark:text-white
        rounded-2xl
        shadow-md hover:shadow-2xl
        transition-all duration-300
        overflow-hidden
        flex flex-col
      "
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={getLocalized(blog, "title")}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
          {getLocalized(blog, "title")}
        </h3>

        {getLocalized(blog, "subtitle") && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
            {getLocalized(blog, "subtitle")}
          </p>
        )}

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6">
          {getLocalized(blog, "excerpt")}
        </p>

        <Link
          href={`/blog/${slug}`}
          className="
            mt-auto
            inline-flex items-center justify-center
            text-sm font-medium
            text-black
            px-5 py-2
            rounded-md
            transition-all duration-300
            hover:opacity-90
          "
          style={{ backgroundColor: goldenColor }}
        >
          {t("blog.readMore")}
        </Link>
      </div>
    </article>
  );
}
