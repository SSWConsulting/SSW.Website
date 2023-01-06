import React from "react"
import { Template } from "tinacms";

export const Technologies = ({
  data
}) => {
  console.log(data)
  return <div></div>
}

export const technologiesBlockSchema: Template = {
  name: "Technologies",
  label: "Technology module with cards",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {},
  },
  fields: [
    {
      type: "object",
      list: true,
      name: "technologyCards",
      fields: [
        {
          type: "string",
          label: "name",
          name: "name"
        }
      ]
    },
  ],
};