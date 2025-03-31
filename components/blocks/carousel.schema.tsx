import { Template } from "tinacms";

export const carouselBlock = {
  items: {
    value: "items",
    label: "label",
    link: "link",
    imgSrc: "imgSrc",
  },
  delay: "delay",
};

export const carouselBlockSchema: Template = {
  name: "Carousel",
  label: "Carousel",
  ui: {
    previewSrc: "/images/thumbs/tina/carousel.jpg",
  },
  fields: [
    {
      label: "Items",
      name: carouselBlock.items.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Item description",
          link: "/",
          openIn: "sameWindow",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: carouselBlock.items.label,
        },
        {
          type: "string",
          label: "URL",
          name: carouselBlock.items.link,
          description:
            "If link contains ssw.com.au, you can skip the full URL and just use the path. e.g. /services",
        },
        {
          type: "string",
          label: "Open in",
          name: "openIn",
          description:
            "If it is external link, please select 'New window' option.",
          options: [
            { label: "Same window", value: "sameWindow" },
            { label: "Modal", value: "modal" },
            { label: "New window", value: "newWindow" },
          ],
        },
        {
          type: "image",
          label: "Image",
          name: carouselBlock.items.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "carousel",
        },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
    {
      type: "number",
      label: "Delay (Seconds)",
      name: carouselBlock.delay,
      required: true,
    },
    {
      type: "boolean",
      label: "Show on mobile devices",
      name: "showOnMobileDevices",
    },
  ],
};
