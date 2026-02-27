import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "media",
  title: "Media",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "translations", title: "Translations" },
  ],

  fields: [
    /* ======================================================
       SUPPORTED LANGUAGES
    ====================================================== */
    defineField({
      name: "supportedLanguages",
      title: "Supported Languages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: LANGUAGES.map((l) => ({
          title: l.title,
          value: l.id,
        })),
      },
      description:
        "Select which languages this content supports. English is always included.",
      group: "content",
    }),

    /* ======================================================
       TITLE
    ====================================================== */
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
      group: "content",
    }),

    /* ======================================================
       MEDIA TYPE
    ====================================================== */
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "YouTube Video", value: "youtube" },
        ],
        layout: "radio",
      },
      validation: (Rule) =>
        Rule.required().error("Please select a media type"),
      group: "content",
    }),

    /* ======================================================
       IMAGES (ONLY WHEN mediaType = image)
    ====================================================== */
    defineField({
      name: "images",
      title: "Images (1–4)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      options: { layout: "grid" },

      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.mediaType === "image") {
            if (!value || value.length === 0) {
              return "Please upload at least 1 image";
            }
            if (value.length > 4) {
              return "Maximum 4 images allowed";
            }
          }
          return true;
        }),

      hidden: ({ document }) => document?.mediaType !== "image",
      group: "content",
    }),

    /* ======================================================
       YOUTUBE URL (ONLY WHEN mediaType = youtube)
    ====================================================== */
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description:
        "Use standard YouTube link (e.g. https://www.youtube.com/watch?v=VIDEO_ID)",

      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.mediaType === "youtube") {
            if (!value) {
              return "YouTube URL is required when Media Type is YouTube";
            }
          }
          return true;
        }),

      hidden: ({ document }) => document?.mediaType !== "youtube",
      group: "content",
    }),

    /* ======================================================
       LOCATION
    ====================================================== */
    defineField({
      name: "location",
      title: "Location / Address",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Location is required"),
      group: "content",
    }),

    /* ======================================================
       TRANSLATED TITLES
    ====================================================== */
    ...LANGUAGES.map((lang) =>
      defineField({
        name: `title_${lang.id}`,
        title: `Title (${lang.title})`,
        type: "string",
        group: "translations",

        hidden: ({ document }) =>
          !(
            (document?.supportedLanguages as string[])?.includes(lang.id)
          ),
      })
    ),
  ],
});