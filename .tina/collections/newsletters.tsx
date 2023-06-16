import { transformIntToMonth } from "../../services/date.service";
import type { Collection } from "tinacms";

export const newsletterSchema: Collection = {
  label: "Newsletters",
  name: "newsletters",
  path: "content/newsletters",
  format: "json",
  fields: [
    {
      type: "string",
      label: "Year",
      name: "newsletters_year",
    },
    {
      type: "object",
      label: "Newsletters",
      name: "newsletters",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item
              ? `${item?.month} - ${transformIntToMonth(item?.month)} - ${
                  item?.description
                }`
              : "New newsletter",
          };
        },
      },
      fields: [
        {
          type: "number",
          name: "month",
          label: "Month",
          required: true,
        },
        {
          type: "image",
          name: "file",
          label: "HTML File",
          required: true,
          // @ts-ignore
          uploadDir: (formValues) => {
            console.log(formValues);
            return `newsletters/${formValues.newsletters_year}`;
          },
        },
        {
          type: "image",
          name: "images",
          label: "Images (optional)",
          list: true,
          description: "Only add images that have not been used before. There is no need to add images to the /images/newsletters directory if they have already been used in a previous newsletter",
          required: false,
          // @ts-ignore
          uploadDir: () => "images/newsletters" 
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          required: true,
        },
      ],
    },
  ],
};
