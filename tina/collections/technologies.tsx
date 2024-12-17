import type { Collection } from "tinacms";
import { IconPickerInput } from "../../components/blocksSubtemplates/tinaFormElements/iconSelector";
import { tipField } from "./shared-fields";

export const technologiesCardsCarouselSchema: Collection = {
  label: "Consulting - Technology Cards",
  name: "technologies",
  format: "mdx",
  path: "content/technologies",
  fields: [
    tipField,
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Read More Slug",
      name: "readMoreSlug",
    },
    {
      type: "string",
      label: "Icon",
      name: "icon",
      ui: {
        // @ts-expect-error – component is not being recognized
        component: IconPickerInput,
      },
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "thumbs",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
  ],
};
