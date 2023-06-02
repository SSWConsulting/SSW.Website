import type { Collection } from "tinacms";
import {
  locations,
  jobStatus,
  employmentType,
} from "../../components/util/constants/opportunity";

export const opportunitiesSchema: Collection = {
  label: "Opportunities",
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
      label: "Status",
      name: "status",
      options: jobStatus.map((status) => status),
    },
    {
      type: "string",
      list: true,
      label: "Locations",
      name: "locations",
      options: locations.map((location) => location),
    },
    {
      type: "rich-text",
      label: "Description",
      name: "_body",
      isBody: true,
    },
  ],
};
