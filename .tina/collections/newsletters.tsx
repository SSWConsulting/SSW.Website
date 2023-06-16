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
          type: "string",
          name: "description",
          label: "Description",
          required: true,
        },
      ],
    },
  ],
};
