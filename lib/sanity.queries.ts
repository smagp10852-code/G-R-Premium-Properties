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
    mediaType,
    title,
    title_hi, title_ar, title_ru,
    subtitle,
    subtitle_hi, subtitle_ar, subtitle_ru,
    active,
    image{
      asset->{ url }
    },
    video{
      asset->{
        _id,
        url,
        mimeType
      }
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
   FEATURED PROPERTIES
====================================================== */

export const featuredPropertiesQuery = groq`
*[
  _type == "property" &&
  showOnHomePage == true
]
| order(_createdAt desc)
[0...10]{
  _id,
  title,
  title_hi, title_ar, title_ru,
  supportedLanguages,
  "slug": slug.current,
  handover,
  featured,
  type,

  developer->{
    name,
    "slug": slug.current
  },

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
  unitType,
  bedroomCount,
  customLabel,
  size,
  price
},

  brochure{
    asset->{ url }
  }
}
`;

/* ======================================================
   ALL PROPERTIES (FILTER PAGE) — FIXED SEARCH MATCH
====================================================== */

export const propertiesQuery = groq`
*[
  _type == "property" &&

  (!defined($community) || location->slug.current == $community) &&

  (!defined($search) || 
    title match "*" + $search + "*" ||
    location->name match "*" + $search + "*" ||
    location->area match "*" + $search + "*"
  ) &&

  (!defined($purpose) || lower(purpose) == lower($purpose)) &&

  (!defined($type) || lower(type) == lower($type)) &&

  (!defined($bed) || 
    count(units[
      unitType == "bedroom" && 
      bedroomCount == $bed
    ]) > 0
  )

  // ✅ NOTE: min/max price filtering GROQ se hata diya — Sanity me "price"
  // field text hai (jaise "1.20 M"), isliye numeric >= / <= compare kaam
  // nahi karta. Ab min/max ka filtering page.tsx me JS se hoga (price
  // string parse karke) — neeche dekho.
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

  developer->{
    name,
    "slug": slug.current
  },

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
    unitType,
    bedroomCount,
    customLabel,
    size,
    price
  },

  brochure{
    asset->{ url }
  }
}
`;

/* ======================================================
   SINGLE PROPERTY (DETAIL PAGE)
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
    "slug": slug.current,
    "logo": logo.asset->url
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
    unitType,
    bedroomCount,
    customLabel,
    size,
    price
  },

  brochure{
    asset->{ url }
  },

  // ============= NEW — detail page sections =============
  description,
  sizeRange,
  completionDate,
  keyPotentialPercent,

  galleryImages[]{
    asset->{ url }
  },

  amenities[]{
    icon,
    label
  },

  investmentHighlights,

  investmentStat{
    label,
    value
  },

  floorPlansPdf{
    asset->{ url }
  },

  locationLandmarks[]{
    label,
    distance
  },

  mapLocation,

  agent{
    name,
    title,
    "photoUrl": photo.asset->url
  },

  faqs[]{
    question,
    answer
  }
}
`;

/* ======================================================
   PROPERTIES BY DEVELOPER
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
  unitType,
  bedroomCount,
  customLabel,
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
*[_type == "developer"]
| order(_createdAt desc)
{
  _id,
  name,
  "slug": slug.current,

  shortDescription,
  shortDescription_hi,
  shortDescription_ar,
  shortDescription_ru,

  about,
  about_hi,
  about_ar,
  about_ru,

  supportedLanguages,

  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;


/* ======================================================
   ALL DEVELOPERS
====================================================== */

export const allDevelopersQuery = groq`
*[_type == "developer"]
| order(name asc)
{
  _id,
  name,
  "slug": slug.current,

  shortDescription,
  shortDescription_hi,
  shortDescription_ar,
  shortDescription_ru,

  about,
  about_hi,
  about_ar,
  about_ru,

  supportedLanguages,

  "logo": logo.asset->url,
  "heroImage": heroImage.asset->url
}
`;


/* ======================================================
   SINGLE DEVELOPER
====================================================== */

export const developerBySlugQuery = groq`
*[
  _type == "developer" &&
  slug.current == $slug
][0]{
  _id,
  name,
  "slug": slug.current,

  shortDescription,
  shortDescription_hi,
  shortDescription_ar,
  shortDescription_ru,

  about,
  about_hi,
  about_ar,
  about_ru,

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
   MEDIA
====================================================== */

export const mediaQuery = groq`
*[_type == "media"]
| order(_createdAt desc){
  _id,
  title,
  title_hi,
  title_ar,
  title_ru,
  supportedLanguages,
  mediaType,
  location,
  images[]{
    asset->{
      url
    }
  },
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


/* ======================================================
   BLOGS
====================================================== */

export const allBlogsQuery = groq`
*[_type == "blog"]
| order(_createdAt desc){
  _id,
  title,
  title_hi,
  title_ar,
  title_ru,

  subtitle,
  subtitle_hi,
  subtitle_ar,
  subtitle_ru,

  excerpt,
  excerpt_hi,
  excerpt_ar,
  excerpt_ru,

  supportedLanguages,

  "slug": slug.current,

  mainImage{
    asset->{
      url
    }
  }
}
`;

export const getSingleBlogQuery = groq`
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  title_hi,
  title_ar,
  title_ru,

  subtitle,
  subtitle_hi,
  subtitle_ar,
  subtitle_ru,

  content,
  content_hi,
  content_ar,
  content_ru,

  supportedLanguages,

  mainImage{
    asset->{
      url
    }
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
  title_hi,
  title_ar,
  title_ru,

  subtitle,
  subtitle_hi,
  subtitle_ar,
  subtitle_ru,

  excerpt,
  excerpt_hi,
  excerpt_ar,
  excerpt_ru,

  supportedLanguages,

  "slug": slug.current,

  mainImage{
    asset->{
      url
    }
  }
}
`;

/* ======================================================
   LATEST BLOGS (HOME SLIDER)
====================================================== */

export const latestBlogsQuery = groq`
*[_type == "blog"]
| order(_createdAt desc)
[0...5]{
  _id,

  title,
  title_hi,
  title_ar,
  title_ru,

  subtitle,
  subtitle_hi,
  subtitle_ar,
  subtitle_ru,

  excerpt,
  excerpt_hi,
  excerpt_ar,
  excerpt_ru,

  supportedLanguages,

  "slug": slug.current,

  mainImage{
    asset->{
      url
    }
  }
}
`;