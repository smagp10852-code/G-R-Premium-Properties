import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "blog",
  type: "document",
  title: "Blog",
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
      description:
        "Select which languages this content supports. English is always included.",
      group: "content",
    }),

    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "subtitle",
      title: "Subtitle (English)",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "excerpt",
      title: "Short Description (English)",
      type: "text",
      rows: 3,
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
      name: "content",
      title: "Blog Content (English)",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
      group: "content",
    }),

    /* ✅ ADDED: Checkbox for Home Control */
    defineField({
      name: "showOnHome",
      title: "Show on Home Page",
      type: "boolean",
      initialValue: false,
      description:
        "Check this if you want this blog to appear on the Home page.",
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
      defineField({
        name: `subtitle_${lang.id}`,
        title: `Subtitle (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
      defineField({
        name: `excerpt_${lang.id}`,
        title: `Short Description (${lang.title})`,
        type: "text",
        rows: 3,
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
      defineField({
        name: `content_${lang.id}`,
        title: `Blog Content (${lang.title})`,
        type: "array",
        of: [
          { type: "block" },
          { type: "image", options: { hotspot: true } },
        ],
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
    ]),
  ],
});
