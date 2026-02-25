import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "translations", title: "Translations" },
  ],

  fields: [

    // ✅ Supported Languages
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

    // ✅ HERO SLIDES
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [

            // Default English
            defineField({
              name: "title",
              title: "Title (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "subtitle",
              title: "Subtitle (English)",
              type: "string",
            }),

            // Image
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),

            // Active Toggle
            defineField({
              name: "active",
              title: "Active Slide",
              type: "boolean",
              initialValue: true,
            }),

            // Linked Property
            defineField({
              name: "linkedProperty",
              title: "Linked Property",
              type: "reference",
              to: [{ type: "property" }],
            }),

            // ✅ Translations inside slide
            ...LANGUAGES.flatMap((lang) => [
              defineField({
                name: `title_${lang.id}`,
                title: `Title (${lang.title})`,
                type: "string",
              }),
              defineField({
                name: `subtitle_${lang.id}`,
                title: `Subtitle (${lang.title})`,
                type: "string",
              }),
            ]),
          ],
        },
      ],
    }),

    // ✅ CTA ENGLISH
    defineField({
      name: "heroCTA",
      title: "Hero CTA Text (English)",
      type: "string",
      initialValue: "Explore Properties",
      group: "content",
    }),

    // ✅ CTA TRANSLATIONS
    ...LANGUAGES.map((lang) =>
      defineField({
        name: `heroCTA_${lang.id}`,
        title: `Hero CTA Text (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) => {
          const supported = (document?.supportedLanguages || []) as string[];
          return !supported.includes(lang.id);
        },
      })
    ),
  ],
});
