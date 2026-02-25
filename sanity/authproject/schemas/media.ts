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
    defineField({
      name: "supportedLanguages",
      title: "Supported Languages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: LANGUAGES.map((l) => ({ title: l.title, value: l.id })),
      },
      description: "Select which languages this content supports. English is always included.",
      group: "content",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

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
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "images",
      title: "Images (Upload 2–4)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(4)
          .error("Please upload between 1 and 4 images"),
      hidden: ({ parent }) => parent?.mediaType !== "image",
      group: "content",
    }),

    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description:
        "Use standard YouTube link (e.g. https://www.youtube.com/watch?v=VIDEO_ID)",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
      hidden: ({ parent }) => parent?.mediaType !== "youtube",
      group: "content",
    }),

    defineField({
      name: "location",
      title: "Location / Address",
      type: "string",
      hidden: ({ parent }) => !parent?.mediaType,
      group: "content",
    }),

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `title_${lang.id}`,
        title: `Title (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
    ]),
  ],
});
