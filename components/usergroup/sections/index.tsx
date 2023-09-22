import type { Template } from "tinacms";
import { communitySectionBlockSchema } from "./community";
import { actionSectionBlockSchema } from "./action";

export const pageBlocks: Template[] = [
  actionSectionBlockSchema,
  communitySectionBlockSchema,
];

export * from "./community";
export * from "./action";
