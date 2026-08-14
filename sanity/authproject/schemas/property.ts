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
    { name: "detail", title: "Detail Page" },
    { name: "translations", title: "Translations" },
  ],

  fields: [
    // ================================
    // BASIC INFO (unchanged)
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

    // NOTE: your queries (sanity.queries.ts) already reference `type` and
    // `purpose` fields on this document — add them here if they aren't
    // already in your live schema, so the card's badge and the filter
    // page's Buy/Rent + property-type dropdowns have something to read.
    defineField({
      name: "type",
      title: "Property Type",
      description: 'e.g. "Apartment", "Villa", "Townhouse"',
      type: "string",
      options: {
        list: [
          { title: "Apartment", value: "Apartment" },
          { title: "Villa", value: "Villa" },
          { title: "Townhouse", value: "Townhouse" },
          { title: "Penthouse", value: "Penthouse" },
        ],
      },
      group: "content",
    }),
    defineField({
      name: "purpose",
      title: "Purpose",
      type: "string",
      options: {
        list: [
          { title: "Buy", value: "Buy" },
          { title: "Rent", value: "Rent" },
        ],
      },
      group: "content",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Highlights this listing (separate from Show on Home Page)",
      type: "boolean",
      initialValue: false,
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
    // UNITS (unchanged)
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
            {
              name: "unitType",
              title: "Unit Type",
              type: "string",
              options: {
                list: [
                  { title: "Studio", value: "studio" },
                  { title: "Bedroom", value: "bedroom" },
                  { title: "Office", value: "office" },
                  {
                    title: "Other (Villa, Penthouse, Retail, etc)",
                    value: "other",
                  },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "bedroomCount",
              title: "Number of Bedrooms",
              type: "number",
              hidden: ({ parent }: any) => parent?.unitType !== "bedroom",
            },
            {
              name: "customLabel",
              title: "Custom Label (Example: Villa, Penthouse)",
              type: "string",
              hidden: ({ parent }: any) => parent?.unitType !== "other",
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
    // Handover / Payment Plan (unchanged)
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
    // NEW — DETAIL PAGE FIELDS
    // ================================

    defineField({
      name: "description",
      title: "Project Overview / Description",
      type: "text",
      rows: 6,
      group: "detail",
    }),
    defineField({
      name: "sizeRange",
      title: "Size Range",
      description: 'e.g. "719 - 2,610 sq. ft."',
      type: "string",
      group: "detail",
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      type: "date",
      group: "detail",
    }),
    defineField({
      name: "keyPotentialPercent",
      title: "Key Potential %",
      description: 'Shown in the hero quick-facts panel, e.g. "8%"',
      type: "string",
      group: "detail",
    }),
    defineField({
      name: "galleryImages",
      title: "Project Gallery",
      description: "If empty, the main Property Images field above is reused.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "detail",
    }),
    defineField({
      name: "amenities",
      title: "Lifestyle Amenities",
      type: "array",
      group: "detail",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon name",
              description:
                "Any lucide-react icon name, e.g. Waves, Dumbbell, Trees, Baby",
              type: "string",
            },
            { name: "label", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        },
      ],
    }),
    defineField({
      name: "investmentHighlights",
      title: "Investment Potential — Highlights",
      type: "array",
      of: [{ type: "string" }],
      group: "detail",
    }),
    defineField({
      name: "investmentStat",
      title: "Investment Potential — Stat Box",
      type: "object",
      group: "detail",
      fields: [
        { name: "label", type: "string", description: 'e.g. "As of 2026"' },
        {
          name: "value",
          type: "string",
          description: 'e.g. "Investment Highlights for this Development"',
        },
      ],
    }),
    defineField({
      name: "floorPlansPdf",
      title: "Floor Plans (PDF)",
      type: "file",
      group: "detail",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "locationLandmarks",
      title: "Nearby Landmarks",
      type: "array",
      group: "detail",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", description: 'e.g. "DWC Airport"' },
            { name: "distance", type: "string", description: 'e.g. "3 min drive"' },
          ],
        },
      ],
    }),
    defineField({
      name: "mapLocation",
      title: "Map Pin",
      type: "geopoint",
      group: "detail",
    }),
    defineField({
      name: "agent",
      title: "Consultation Agent",
      type: "object",
      group: "detail",
      fields: [
        { name: "name", type: "string" },
        { name: "title", type: "string", description: 'e.g. "Property Consultant"' },
        { name: "photo", type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      group: "detail",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text", rows: 3 },
          ],
        },
      ],
    }),

    // ================================
    // TRANSLATIONS (unchanged)
    // ================================

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `title_${lang.id}`,
        title: `Property Title (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }: any) =>
          !((document?.supportedLanguages as string[]) || []).includes(lang.id),
      }),
    ]),
  ],
});