import type { Collection } from "tinacms";
import { kebabCaseFilename } from "./shared-fields";

export const locationSchemaConstants = {
  value: "locations",
  header: "header",
  addressLine1: "addressLine1",
  addressLine2: "addressLine2",
  addressLine3: "addressLine3",
  directionURL: "directionURL",
};

export const locationSchema: Collection = {
  label: "Events - Locations",
  name: locationSchemaConstants.value,
  format: "mdx",
  path: "content/locations",
  ui: {
    ...kebabCaseFilename,
  },
  fields: [
    {
      type: "string",
      name: locationSchemaConstants.header,
      label: "Header",
    },
    {
      type: "string",
      name: locationSchemaConstants.addressLine1,
      label: "Address Line 1",
    },
    {
      type: "string",
      name: locationSchemaConstants.addressLine2,
      label: "Address Line 2",
    },
    {
      type: "string",
      name: locationSchemaConstants.addressLine3,
      label: "Address Line 3",
    },
    {
      type: "string",
      name: locationSchemaConstants.directionURL,
      label: "Directions",
    },
  ],
};
