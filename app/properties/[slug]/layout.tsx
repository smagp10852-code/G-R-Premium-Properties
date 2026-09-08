import type { Metadata } from "next";
import { sanityClient } from "@/lib/sanity.client";
import { propertyBySlugQuery } from "@/lib/sanity.queries";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const property = await sanityClient.fetch(propertyBySlugQuery, { slug });

  if (!property) {
    return {
      title: {
        absolute: "Property | G R Premium Properties",
      },
      description:
        "Explore premium Dubai properties with G R Premium Properties.",
    };
  }

  const propertyTitle = property.title || "Dubai Property";
  const locationName = property.location?.name || "Dubai";

  const title = `${propertyTitle} | G R Premium Properties`;

  const description = `Explore ${propertyTitle} in ${locationName}. Discover property details, pricing, payment plans, location, amenities and investment opportunities with G R Premium Properties.`;

  const canonicalUrl = `https://www.grpremium.com/properties/${slug}`;

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "G R Premium Properties",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function PropertySlugLayout({
  children,
}: Props) {
  return children;
}