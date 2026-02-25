// lib/communities.ts

import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

/* ================= QUERY ================= */

const communitiesQuery = groq`
  *[_type == "community" && defined(slug.current)]
  | order(name asc){
    _id,
    name,
    name_hi,
    name_ar,
    name_ru,
    area,
    area_hi,
    area_ar,
    area_ru,
    supportedLanguages,
    "slug": slug.current
  }
`;

/* ================= FETCH FUNCTION ================= */

export async function getCommunities() {
  try {
    const communities = await sanityClient.fetch(communitiesQuery, {}, {
      cache: "no-store",
    });

    console.log("Total Communities Fetched:", communities?.length);

    return communities || [];
  } catch (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
}