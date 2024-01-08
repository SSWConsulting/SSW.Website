import React from "react";
import { Template, TinaField } from "tinacms";
import { number } from "yup";

export type JotFormEmbedProps = {
  id: string;
  formTitle: string;
  backgroundColor: string;
  fontColor: string;
  formType: string;
  height: number;
  number: number;
};
export const JotFormEmbed = (props) => {
  return <></>;
};

export const jotFormSchema: TinaField = {
  type: "object",
  name: "jotForm",
  label: "JotForm",
  fields: [
    {
      type: "string",
      name: "id",
      label: "Id",
      required: true,
    },
    {
      type: "string",
      name: "formTitle",
      label: "Form Title",
      required: true,
    },
    {
      type: "string",
      name: "backgroundColor",
      label: "Background Color",
      required: true,
    },
    {
      type: "string",
      name: "fontColor",
      label: "Font Color",
      required: true,
    },
    {
      type: "string",
      name: "formType",
      label: "Form Type",
      required: true,

      options: [
        {
          value: "0",
          label: "Form with Title",
        },
        {
          value: "1",
          label: "Form without Title and white border",
        },
        {
          value: "2",
          label: "Form without Title and black border",
        },
      ],
    },
    {
      type: "number",
      name: "height",
      label: "Height",
      required: true,
      description: "px",
    },
    {
      type: "number",
      name: "width",
      label: "Width",
      required: true,
      description: "px",
    },
  ],
};
