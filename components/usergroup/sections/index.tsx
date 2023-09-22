import type { Template } from "tinacms";
import { communitySectionBlockSchema } from "./community";
import { actionSectionBlockSchema } from "./action";
import { videosSectionBlockSchema } from "./videos";

export const pageBlocks: Template[] = [
  actionSectionBlockSchema,
  communitySectionBlockSchema,
  videosSectionBlockSchema,
];

export * from "./community";
export * from "./action";
