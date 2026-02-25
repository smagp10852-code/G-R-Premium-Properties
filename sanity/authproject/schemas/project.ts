import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "project",
  title: "Projects",
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
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "developer",
      title: "Developer",
      type: "reference",
      to: [{ type: "developer" }],
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "price",
      title: "Starting Price",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Current", value: "current" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      group: "content",
    }),

    defineField({
      name: "gallery",
      title: "Project Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "content",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "call",
      title: "Call Number",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
      group: "content",
    }),

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `name_${lang.id}`,
        title: `Project Name (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
      defineField({
        name: `location_${lang.id}`,
        title: `Location (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
    ]),
  ],
});
