import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "community",
  title: "Community",
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
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "area",
      title: "Area",
      type: "string",
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

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `name_${lang.id}`,
        title: `Location (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
      defineField({
        name: `area_${lang.id}`,
        title: `Area (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
    ]),
  ],
});
