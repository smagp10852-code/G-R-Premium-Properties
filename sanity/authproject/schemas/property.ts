import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "property",
  title: "Property",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "translations", title: "Translations" },
  ],

  fields: [
    // ================================
    // BASIC INFO
    // ================================

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

    defineField({
      name: "title",
      title: "Property Title",
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
      name: "developer",
      title: "Developer",
      type: "reference",
      to: [{ type: "developer" }],
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "location",
      title: "Community",
      type: "reference",
      to: [{ type: "community" }],
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "images",
      title: "Property Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "content",
    }),

    defineField({
      name: "brochure",
      title: "Brochure PDF",
      type: "file",
      options: { accept: ".pdf" },
      group: "content",
    }),

    // ================================
    // ✅ IMPROVED UNITS STRUCTURE
    // ================================

    defineField({
      name: "units",
      title: "Available Units",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            // 🔹 Unit Type
            {
              name: "unitType",
              title: "Unit Type",
              type: "string",
              options: {
                list: [
                  { title: "Studio", value: "studio" },
                  { title: "Bedroom", value: "bedroom" },
                  { title: "Office", value: "office" },
                  { title: "Other (Villa, Penthouse, Retail, etc)", value: "other" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },

            // 🔹 Bedroom Count (Only for Bedroom)
            {
              name: "bedroomCount",
              title: "Number of Bedrooms",
              type: "number",
              hidden: ({ parent }) => parent?.unitType !== "bedroom",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { unitType?: string };

                  if (parent?.unitType === "bedroom" && !value) {
                    return "Bedroom count required";
                  }

                  return true;
                }),
            },

            // 🔹 Custom Label (Only for Other)
            {
              name: "customLabel",
              title: "Custom Label (Example: Villa, Penthouse)",
              type: "string",
              hidden: ({ parent }) => parent?.unitType !== "other",
            },

            {
              name: "size",
              title: "Size (Sq Ft)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },

            {
              name: "price",
              title: "Starting Price",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),

    // ================================
    // Handover
    // ================================

    defineField({
      name: "handover",
      title: "Handover Date",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "paymentPlan",
      title: "Payment Plan",
      type: "object",
      group: "content",
      fields: [
        { name: "booking", title: "Booking (%)", type: "number" },
        { name: "construction", title: "Construction (%)", type: "number" },
        { name: "handover", title: "Handover (%)", type: "number" },
      ],
    }),

    defineField({
      name: "showOnHomePage",
      title: "Show on Home Page",
      type: "boolean",
      initialValue: false,
      group: "content",
    }),

    // ================================
    // TRANSLATIONS
    // ================================

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `title_${lang.id}`,
        title: `Property Title (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }) =>
          !((document?.supportedLanguages as string[]) || []).includes(
            lang.id
          ),
      }),
    ]),
  ],
});