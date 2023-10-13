import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import {
  employmentType,
  jobStatus,
  locations,
} from "../../components/util/constants/opportunity";

export const opportunitiesSchema: Collection = {
  label: "Opportunities - Employment",
  name: "opportunities",
  format: "mdx",
  path: "content/opportunities",
  fields: [
    {
      type: "string",
      label: "Job Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Type",
      name: "employmentType",
      options: employmentType.map((type) => type),
    },
    {
      type: "string",
      list: true,
      label: "Locations",
      name: "locations",
      options: locations.map((location) => location),
    },
    {
      type: "boolean",
      label: "Hide Apply Button",
      name: "hideApply",
    },
    {
      type: "rich-text",
      label: "Description",
      name: "_body",
      isBody: true,
      templates: [...Schemas.pageBlocks],
    },
  ],
};
