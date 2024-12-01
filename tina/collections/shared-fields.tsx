/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { TinaField } from "tinacms";
import { TinaInfo } from "../../components/tina/tina-info";
// TODO: Remove Warning message once fixed by Tina
// Link: https://github.com/SSWConsulting/SSW.Website/issues/1404
export const tipField: TinaField = {
  type: "string",
  name: "tip",
  label: "Tip",
  ui: {
    component: () => {
      return (
        <TinaInfo>
          {" "}
          💡 Please fill out the 'Filename' field first at the bottom of the
          page.
        </TinaInfo>
      );
    },
  },
};

export const benefitsFields: TinaField[] = [
  {
    type: "image",
    label: "Image URL",
    name: "image",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    uploadDir: () => "benefits",
  },
  {
    type: "string",
    label: "Title",
    name: "title",
  },
  {
    type: "rich-text",
    label: "Description",
    name: "description",
  },
  {
    type: "string",
    required: false,
    label: "linkName",
    name: "linkName",
  },
  {
    type: "string",
    required: false,
    label: "linkURL",
    name: "linkURL",
  },
];
