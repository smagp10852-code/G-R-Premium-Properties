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

            // ── Media Type selector ──
            defineField({
              name: "mediaType",
              title: "Media Type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video", value: "video" },
                ],
                layout: "radio",
              },
              initialValue: "image",
              validation: (Rule) => Rule.required(),
            }),

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

            // Image — shown only when mediaType === "image"
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => (parent as any)?.mediaType !== "image",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { mediaType?: string };
                  if (parent?.mediaType === "video") return true;
                  return value ? true : "Background Image is required when Media Type is Image";
                }),
            }),

            // Video — shown only when mediaType === "video"
            defineField({
              name: "video",
              title: "Background Video",
              type: "file",
              options: {
                accept: "video/mp4,video/webm,video/quicktime",
              },
              hidden: ({ parent }) => (parent as any)?.mediaType !== "video",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { mediaType?: string };
                  if (parent?.mediaType !== "video") return true;
                  return value ? true : "Background Video is required when Media Type is Video";
                }),
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

          // Preview shows which media type + a thumbnail
          preview: {
            select: {
              title: "title",
              mediaType: "mediaType",
              media: "image",
            },
            prepare(selection: Record<string, any>) {
              const { title, mediaType, media } = selection;
              return {
                title: title || "Untitled",
                subtitle: mediaType === "video" ? "🎬 Video" : "🖼 Image",
                media,
              };
            },
          },
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