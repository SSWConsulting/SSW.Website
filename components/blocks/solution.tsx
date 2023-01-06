import React from "react"
import { Template } from "tinacms";

export const Solution = ({
  data
}) => {
  console.log(data)
  return <div></div>
}

export const solutionBlockSchema: Template = {
  name: "Solution",
  label: "Solution module",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {},
  },
  fields: [
    {
      type: "object",
      list: false,
      name: "solution",
      fields: [
        {
          type: "string",
          label: "project",
          name: "project",
        },
      ]
    },
  ],
};