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

    defineField({
      name: "text",
      title: "Text (English)",
      description: 'e.g. "10% off booking fees — this week only"',
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),

    // Where "CLICK NOW" goes. Either an internal link to a property/blog,
    // or a plain external/relative URL — link takes priority if both set.
    defineField({
      name: "linkedProperty",
      title: "Linked Property (optional)",
      type: "reference",
      to: [{ type: "property" }],
      group: "content",
    }),
    defineField({
      name: "url",
      title: "Custom Link (optional)",
      description:
        'Used only if "Linked Property" is empty, e.g. "/blog/dubai-market-update"',
      type: "string",
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