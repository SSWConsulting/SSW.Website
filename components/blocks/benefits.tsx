import React from "react"
import { Template } from "tinacms";

export const Benefits = ({
  data
}) => {
  console.log(data)
  return <div></div>
}

export const benefitsBlockSchema: Template = {
  name: "Benefits",
  label: "Benefits List",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      title: "",
      subtitle: "",
      imageURL: "",
    },
  },
  fields: [
    {
      type: "object",
      list: false,
      name: "benefits",
      fields: [
        {
          type: "object",
          list: true,
          name: "benefitList",
          fields: [
            {
              type: "string",
              label: "Image URL",
              name: "image",
            }
          ]
        },
        {
          type: "object",
          list: false,
          name: "rule",
          fields: [
            {
              type: "string",
              label: "name",
              name: "name"
            },
            {
              type: "string",
              label: "url",
              name: "url"
            }
          ]
        },
      ]
    }

  ],
};