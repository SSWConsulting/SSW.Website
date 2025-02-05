/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { ImageField, TinaField } from "tinacms";
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

const CustomImageField = (props) => {
  const getMeta = async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  };
  const updateAdjacentField = ({ field, target, value, form }) => {
    //namespace contains the name of the current field and every parent before it in an array
    const currentFieldName = field.namespace.at(-1);
    //regex to get the field names leading up to "current field name"
    const leadingFieldsRegex = new RegExp(`^(.*?)(?=\\.${currentFieldName})`);
    const match = field.name.match(leadingFieldsRegex);
    if (!match) return;
    const leadingFieldName = match[1];
    form.change(`${leadingFieldName}.${target}`, value);
  };
  useEffect(() => {
    const { field, form } = props;
    getMeta(props.input.value).then((img) => {
      if (!img) return;
      updateAdjacentField({
        field,
        target: "imageWidth",
        value: img.naturalWidth,
        form,
      });
      updateAdjacentField({
        field,
        target: "imageHeight",
        value: img.naturalHeight,
        form,
      });
    });
  }, [props]);
  return ImageField(props);
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

export const optimizedImageSchema = (description: string) => [
  {
    type: "image",
    label: "Image Source",
    name: "imageSource",
    ui: {
      component: CustomImageField,
    },
    //description: "Upload an image or other media to display in the media text block. 4/3 aspect ratio recommended.",
    description: description,
  },
  {
    type: "string",
    component: "hidden",
    name: "imageHeight",
  },
  {
    type: "string",
    component: "hidden",
    name: "imageWidth",
  },
];
