import { sanityClient } from "@/lib/sanity.client";
import { getSingleBlogQuery } from "@/lib/sanity.queries";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import BlogDetailClient from "@/components/sections/BlogDetailClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {

  const { slug } = await params;

  const blog = await sanityClient.fetch(
    getSingleBlogQuery,
    { slug }
  );

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <BlogDetailClient blog={blog} />
      <CTA />
      <Footer />
    </main>
  );
}
