import { defineType, defineField } from "sanity";

const LANGUAGES = [
  { id: "hi", title: "Hindi" },
  { id: "ar", title: "Arabic" },
  { id: "ru", title: "Russian" },
];

export default defineType({
  name: "latestUpdate",
  title: "Hero — Latest Update / Offer",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "detail", title: "Detail Page" },
    { name: "translations", title: "Translations" },
  ],

  fields: [
    defineField({
      name: "supportedLanguages",
      title: "Supported Languages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: LANGUAGES.map((lang) => ({ title: lang.title, value: lang.id })),
      },
      group: "content",
    }),

    // Short line shown in the hero widget + listing card.
    defineField({
      name: "text",
      title: "Text (English)",
      description: 'e.g. "10% off booking fees — this week only"',
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    // ✅ NEW — every update now opens its own detail page (/updates/[slug]),
    // same pattern as the announcement feature. Required so a detail page
    // always resolves.
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "text", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      group: "content",
    }),

    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      group: "content",
    }),

    // Optional expiry — if set, this item auto-hides once it passes and
    // shows a "Xd left" countdown badge in the last 3 days.
    defineField({
      name: "expiresAt",
      title: "Expires At (optional)",
      description:
        "Leave empty for an always-on update. Set this for a time-limited offer (e.g. 2–3 day promo) — it disappears automatically once expired.",
      type: "datetime",
      group: "content",
    }),

    // ---------------- DETAIL PAGE CONTENT ----------------

    defineField({
      name: "mainImage",
      title: "Detail Page Image",
      type: "image",
      options: { hotspot: true },
      group: "detail",
    }),

    defineField({
      name: "location",
      title: "Location / Pata (optional)",
      description: 'e.g. "The Valley, Dubai" — shown under the image on the detail page',
      type: "string",
      group: "detail",
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 5,
      group: "detail",
    }),

    defineField({
      name: "points",
      title: "Bullet Points",
      type: "array",
      of: [{ type: "string" }],
      group: "detail",
    }),

    // Where the detail page's CTA button goes. Either an internal link to
    // a property, or a plain external/relative URL — linkedProperty wins
    // if both are set.
    defineField({
      name: "linkedProperty",
      title: "Linked Property (optional)",
      type: "reference",
      to: [{ type: "property" }],
      group: "detail",
    }),
    defineField({
      name: "url",
      title: "Custom Link (optional)",
      description:
        'Used only if "Linked Property" is empty, e.g. "/blog/dubai-market-update"',
      type: "string",
      group: "detail",
    }),

    ...LANGUAGES.flatMap((lang) => [
      defineField({
        name: `text_${lang.id}`,
        title: `Text (${lang.title})`,
        type: "string",
        group: "translations",
        hidden: ({ document }: any) =>
          !Array.isArray(document?.supportedLanguages) ||
          !document.supportedLanguages.includes(lang.id),
      }),
      defineField({
        name: `description_${lang.id}`,
        title: `Full Description (${lang.title})`,
        type: "text",
        rows: 5,
        group: "translations",
        hidden: ({ document }: any) =>
          !Array.isArray(document?.supportedLanguages) ||
          !document.supportedLanguages.includes(lang.id),
      }),
    ]),
  ],

  preview: {
    select: { title: "text", expiresAt: "expiresAt", active: "active" },
    prepare({ title, expiresAt, active }: any) {
      return {
        title,
        subtitle: `${active ? "Active" : "Inactive"}${
          expiresAt ? ` · expires ${new Date(expiresAt).toLocaleDateString()}` : ""
        }`,
      };
    },
  },
});