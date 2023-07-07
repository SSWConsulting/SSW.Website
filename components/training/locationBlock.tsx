import type { Template } from "tinacms";
import { Container } from "../util/container";

export const LocationBlock = ({ data }) => {
  return <Container size="custom">Hellow </Container>;
};

export const locationBlockConstant = {
  value: "LocationBlock",
  locationList: { value: "locationList", location: "location" },
  chapelWebsite: {
    value: "chapelWebsite",
    title: "title",
    URL: "URL",
  },
};

export const locationBlockSchema: Template = {
  name: locationBlockConstant.value,
  label: "Locations",
  fields: [
    {
      type: "object",
      label: "Location List",
      name: locationBlockConstant.locationList.value,
      list: true,
      ui: {
        itemProps: (item) => {
          const location = item?.location;
          if (!location) return { label: "Please Attach location" };

          const formattedLabel = location
            .split("/")[2]
            .replace(".mdx", "")
            .replace(/-/g, " ")
            .toUpperCase();

          return {
            label: formattedLabel,
          };
        },
      },
      fields: [
        {
          type: "reference",
          collections: ["location"],
          label: "Location",
          name: locationBlockConstant.locationList.location,
        },
      ],
    },
    {
      type: "object",
      name: locationBlockConstant.chapelWebsite.value,
      label: "Chapel Website",
      fields: [
        {
          type: "string",
          name: locationBlockConstant.chapelWebsite.title,
          label: "Text",
        },
        {
          type: "string",
          name: locationBlockConstant.chapelWebsite.URL,
          label: "URL",
        },
      ],
    },
  ],
};
