import React from "react"
import { Template } from "tinacms";

export const Booking = ({
  data
}) => {
  console.log(data)
  return <div></div>
}

export const bookingBlockSchema: Template = {
  name: "Booking",
  label: "Booking module",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {},
  },
  fields: [
    {
      type: "object",
      list: false,
      name: "booking",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "subTitle",
          name: "subTitle",
        }
      ]
    }
  ],
};