import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import homepage from "./sanity/authproject/schemas/homepage";
import blog from "./sanity/authproject/schemas/blog";
import developer from "./sanity/authproject/schemas/developer";
import project from "./sanity/authproject/schemas/project";
import searchsuggestion from "./sanity/authproject/schemas/community";
import property from "./sanity/authproject/schemas/property";
import media from "./sanity/authproject/schemas/media";
import announcement from "./sanity/authproject/schemas/announcement";

export default defineConfig({
  name: "default",
  title: "GR Premium Properties",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      homepage,
      blog,
      developer,
      project,
      searchsuggestion,
      property,
      media,
      announcement,
    ] as any[],
  },
});
