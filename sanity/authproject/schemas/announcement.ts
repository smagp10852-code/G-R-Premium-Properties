import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "announcement",
  title: "Top Announcement",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "translations", title: "Translations" },
  ],

  fields: [
    // ==============================
    // Supported Languages
    // ==============================
    defineField({
      name: "supportedLanguages",
      title: "Supported Languages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: LANGUAGES.map((lang) => ({
          title: lang.title,
          value: lang.id,
        })),
      },
      description:
        "Select which languages this content supports. English is always included.",
      group: "content",
    }),

    // ==============================
    // English Content
    // ==============================
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "eventDate",
      title: "Event Date",
      type: "date",
      group: "content",
    }),

    defineField({
      name: "city",
      title: "City (English)",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      group: "content",
    }),

    defineField({
      name: "points",
      title: "Bullet Points (English)",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),

    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      group: "content",
    }),

    // ==============================
    // Translations
    // ==============================

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `title_${lang.id}`,
        title: `Title (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !Array.isArray(document?.supportedLanguages) ||
          !document.supportedLanguages.includes(lang.id),
      }),

      defineField({
        name: `city_${lang.id}`,
        title: `City (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !Array.isArray(document?.supportedLanguages) ||
          !document.supportedLanguages.includes(lang.id),
      }),

      defineField({
        name: `description_${lang.id}`,
        title: `Description (${lang.title})`,
        type: "text",
        group: "translations",
        hidden: ({ document }) =>
          !Array.isArray(document?.supportedLanguages) ||
          !document.supportedLanguages.includes(lang.id),
      }),

      defineField({
        name: `points_${lang.id}`,
        title: `Bullet Points (${lang.title})`,
        type: "array",
        of: [{ type: "string" }],
        group: "translations",
        hidden: ({ document }) =>
          !Array.isArray(document?.supportedLanguages) ||
          !document.supportedLanguages.includes(lang.id),
      }),
    ]),
  ],
});
