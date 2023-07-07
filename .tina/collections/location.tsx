import type { Collection } from "tinacms";

export const locationSchemaConstants = {
  value: "locations",
  header: "header",
  level: "level",
  address: "address",
  state: "state",
  directionURL: "directionURL",
};

export const locationSchema: Collection = {
  label: "Locations",
  name: locationSchemaConstants.value,
  format: "mdx",
  path: "content/locations",
  fields: [
    {
      type: "string",
      name: locationSchemaConstants.header,
      label: "Header",
    },
    {
      type: "string",
      name: locationSchemaConstants.level,
      label: "Level",
    },
    {
      type: "string",
      name: locationSchemaConstants.address,
      label: "Address",
    },
    {
      type: "string",
      name: locationSchemaConstants.state,
      label: "State",
    },
    {
      type: "string",
      name: locationSchemaConstants.directionURL,
      label: "Directions",
    },
  ],
};
