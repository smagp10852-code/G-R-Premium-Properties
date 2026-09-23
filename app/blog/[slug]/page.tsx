import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { getSingleBlogQuery } from "@/lib/sanity.queries";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import BlogDetailClient from "@/components/sections/BlogDetailClient";

// Sanity me title/content change karoge toh 60 sec me live ho jayega
export const revalidate = 60;

const SITE_URL = "https://www.grpremium.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Same request me metadata + page dono ke liye ek hi fetch hoga
const getBlog = cache(async (slug: string) => {
  return sanityClient.fetch(getSingleBlogQuery, { slug });
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: { absolute: "Blog Not Found | G R Premium Properties" } };
  }

  // Sanity me jo title hai, wahi exactly dikhega
  const title: string = blog.title?.trim() || "G R Premium Properties";

  // Studio ka "Short Description" = excerpt field
  const description: string =
    blog.excerpt?.trim() ||
    blog.subtitle?.trim() ||
    "Dubai real estate insights by G R Premium Properties.";

  const image: string | undefined = blog.mainImage?.asset?.url;
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "G R Premium Properties",
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <main className="font-body bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <BlogDetailClient blog={blog} />
      <CTA />
      <Footer />
    </main>
  );
}