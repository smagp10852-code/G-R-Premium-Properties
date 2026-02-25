import { groq } from "next-sanity";

/* ======================================================
   HOMEPAGE
====================================================== */

export const homepageHeroQuery = groq`
*[_type == "homepage"][0]{
  heroCTA,
  heroCTA_hi, heroCTA_ar, heroCTA_ru,
  supportedLanguages,
  heroSlides[]{
    title,
    title_hi, title_ar, title_ru,
    subtitle,
    subtitle_hi, subtitle_ar, subtitle_ru,
    active,
    image{
      asset->{ url }
    },

    linkedProperty->{
      _id,
      title,
      "slug": slug.current,

      developer->{
        name,
        "slug": slug.current
      }
    }
  }
}
`;



/* ======================================================
   FEATURED PROPERTIES (HOME – TOP 4)
====================================================== */
export const featuredPropertiesQuery = groq`
*[
  _type == "property" &&
  showOnHomePage == true
]
| order(_createdAt desc)
[0...3]{
  _id,
  title,
  title_hi, title_ar, title_ru,
  supportedLanguages,
  "slug": slug.current,
  handover,
  featured,

  paymentPlan{
    booking,
    construction,
    handover
  },

  location->{
    name,
    name_hi, name_ar, name_ru,
    supportedLanguages,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;



/* ======================================================
   ALL PROPERTIES (FILTER PAGE)
====================================================== */

export const propertiesQuery = groq`
*[
  _type == "property" &&
  (!defined($community) || location->slug.current == $community) &&
  (!defined($search) || 
    title match $search + "*" ||
    location->name match $search + "*"
  ) &&
  (!defined($purpose) || purpose == $purpose) &&
  (!defined($type) || type == $type) &&
  (!defined($bed) || count(units[beds == $bed]) > 0) &&
  (!defined($min) || count(units[price >= $min]) > 0) &&
  (!defined($max) || count(units[price <= $max]) > 0)
]
| order(_createdAt desc){
  _id,
  title,
  title_hi, title_ar, title_ru,
  supportedLanguages,
  "slug": slug.current,
  featured,
  handover,
  purpose,
  type,

  paymentPlan{
    booking,
    construction,
    handover
  },

  location->{
    name,
    name_hi, name_ar, name_ru,
    supportedLanguages,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;


/* ======================================================
   SINGLE PROPERTY
====================================================== */

export const propertyBySlugQuery = groq`
*[_type == "property" && slug.current == $slug][0]{
  _id,
  title,
  title_hi, title_ar, title_ru,
  supportedLanguages,
  "slug": slug.current,
  handover,
  featured,
  purpose,
  type,

  paymentPlan{
    booking,
    construction,
    handover
  },

  developer->{
    name,
    "slug": slug.current
  },

  location->{
    name,
    name_hi, name_ar, name_ru,
    supportedLanguages,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;


/* ======================================================
   ✅ PROPERTIES BY DEVELOPER
====================================================== */

export const propertiesByDeveloperQuery = groq`
*[_type == "property" && developer->slug.current == $slug]
| order(_createdAt desc){
  _id,
  title,
  title_hi,
  title_ar,
  title_ru,
  supportedLanguages,
  "slug": slug.current,
  handover,
  featured,

  paymentPlan{
    booking,
    construction,
    handover
  },

  developer->{
    name,
    "slug": slug.current
  },

  location->{
    name,
    name_hi,
    name_ar,
    name_ru,
    supportedLanguages,
    "slug": slug.current
  },

  images[]{
    asset->{ url }
  },

  units[]{
    beds,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;



/* ======================================================
   DEVELOPERS
====================================================== */

export const featuredDevelopersQuery = groq`
*[
  _type == "developer" &&
  showOnHomePage == true
]
| order(_createdAt desc)
[0...3]{
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  shortDescription_hi, shortDescription_ar, shortDescription_ru,
  about,
  about_hi, about_ar, about_ru,
  supportedLanguages,
  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;


export const allDevelopersQuery = groq`
*[_type == "developer"]
| order(name asc){
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  shortDescription_hi, shortDescription_ar, shortDescription_ru,
  about,
  about_hi, about_ar, about_ru,
  supportedLanguages,
  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;

/* ======================================================
   SINGLE DEVELOPER
====================================================== */

export const developerBySlugQuery = groq`
*[_type == "developer" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  shortDescription_hi, shortDescription_ar, shortDescription_ru,
  about,
  about_hi, about_ar, about_ru,
  supportedLanguages,
  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url,
  stats
}
`;

/* ======================================================
   COMMUNITIES
====================================================== */

export const communitiesQuery = groq`
*[_type == "community"]{
  _id,
  name,
  name_hi, name_ar, name_ru,
  area,
  area_hi, area_ar, area_ru,
  supportedLanguages,
  "slug": slug.current
}
`;

export const searchSuggestionQuery = groq`
*[_type == "community"]
| order(name asc){
  _id,
  name,
  name_hi, name_ar, name_ru,
  area,
  area_hi, area_ar, area_ru,
  supportedLanguages,
  "slug": slug.current
}
`;

/* ======================================================
   BLOGS
====================================================== */

export const allBlogsQuery = groq`
*[_type == "blog"]{
  _id,
  title,
  title_hi, title_ar, title_ru,
  subtitle,
  subtitle_hi, subtitle_ar, subtitle_ru,
  excerpt,
  excerpt_hi, excerpt_ar, excerpt_ru,
  supportedLanguages,
  "slug": slug.current,
  mainImage{
    asset->{ url }
  }
}
`;

export const getSingleBlogQuery = groq`
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  title_hi, title_ar, title_ru,
  subtitle,
  subtitle_hi, subtitle_ar, subtitle_ru,
  content,
  content_hi, content_ar, content_ru,
  supportedLanguages,
  mainImage{
    asset->{ url }
  }
}
`;

export const featuredBlogsQuery = groq`
*[
  _type == "blog" &&
  showOnHomePage == true
]
| order(_createdAt desc)
[0...3]{
  _id,
  title,
  title_hi, title_ar, title_ru,
  subtitle,
  subtitle_hi, subtitle_ar, subtitle_ru,
  excerpt,
  excerpt_hi, excerpt_ar, excerpt_ru,
  supportedLanguages,
  "slug": slug.current,
  mainImage{
    asset->{ url }
  }
}
`;


/* ======================================================
   MEDIA
====================================================== */

export const mediaQuery = groq`
*[_type == "media"] 
| order(_createdAt desc){
  _id,
  title,
  title_hi, title_ar, title_ru,
  supportedLanguages,
  mediaType,
  location,
  images[]{ asset->{ url } },
  youtubeUrl
}
`;

/* ======================================================
   ANNOUNCEMENTS (ALL)
====================================================== */

export const announcementQuery = groq`
*[_type == "announcement"]
| order(_createdAt desc){
  _id,

  title,
  title_hi, title_ar, title_ru,

  description,
  description_hi, description_ar, description_ru,

  points,
  points_hi, points_ar, points_ru,

  eventDate,

  city,
  city_hi, city_ar, city_ru,

  supportedLanguages,

  "slug": slug.current,

  mainImage{
    asset->{ url }
  }
}
`;

export const singleAnnouncementQuery = groq`
  *[_type == "announcement" && slug.current == $slug][0]{
    _id,
    title,
    title_hi, title_ar, title_ru,
    description,
    description_hi, description_ar, description_ru,
    points,
    points_hi, points_ar, points_ru,
    eventDate,
    city,
    city_hi, city_ar, city_ru,
    supportedLanguages,
    mainImage{
      asset->{ url }
    }
  }
`;

