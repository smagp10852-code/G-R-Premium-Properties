import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "developer",
  title: "Developers",
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
      description:
        "Select which languages this content supports. English is always included.",
      group: "content",
    }),

    defineField({
      name: "name",
      title: "Developer Name",
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
      name: "logo",
      title: "Developer Logo",
      type: "image",
      options: { hotspot: true },
      group: "content",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Large image for developer hero section",
      group: "content",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description (English)",
      type: "text",
      rows: 3,
      description: "This short text will appear on developer cards",
      validation: (Rule) => Rule.required().max(200),
      group: "content",
    }),

    defineField({
      name: "about",
      title: "About Developer (English)",
      type: "text",
      rows: 5,
      group: "content",
    }),

    defineField({
      name: "stats",
      title: "Developer Stats",
      type: "object",
      fields: [
        {
          name: "experience",
          title: "Years Experience",
          type: "string",
          description: "e.g. 40+",
        },
        {
          name: "projects",
          title: "Projects Delivered",
          type: "string",
          description: "e.g. 120+",
        },
        {
          name: "homes",
          title: "Homes Sold",
          type: "string",
          description: "e.g. 50K+",
        },
        {
          name: "locations",
          title: "Prime Locations",
          type: "string",
          description: "e.g. Dubai",
        },
      ],
      group: "content",
    }),

    // ✅ FIXED FIELD NAME
    defineField({
      name: "showOnHomePage",
      title: "Show on Home Page",
      type: "boolean",
      initialValue: false,
      description:
        "Check this if you want this developer to appear on the Home page.",
      group: "content",
    }),

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `shortDescription_${lang.id}`,
        title: `Short Description (${lang.title})`,
        type: "text",
        rows: 3,
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(
            lang.id
          ),
      }),
      defineField({
        name: `about_${lang.id}`,
        title: `About Developer (${lang.title})`,
        type: "text",
        rows: 5,
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(
            lang.id
          ),
      }),
    ]),
  ],
});
