export default {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "position",
      title: "Position",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Team", value: "team" },
        ],
        layout: "radio",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "experience",
      title: "Experience",
      type: "string",
    },
    {
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
  ],
};
