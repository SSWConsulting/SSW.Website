import type { Collection, TinaField } from "tinacms";
import { IconPickerInput } from "../../components/blocksSubtemplates/tinaFormElements/iconSelector";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename } from "./shared-fields";

export const productsIndexSchema: Collection = {
  label: "Products - Index",
  name: "productsIndex",
  path: "content/products/index",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => {
      return "/products";
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "object",
      label: "Products List",
      name: "productsList",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
        defaultItem: { category: "product" },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          isTitle: true,
          required: true,
        },
        {
          type: "string",
          label: "Category",
          name: "category",
          description:
            "Which section of the Products page this appears in. Leave as Product unless SSW builds and customises it per client.",
          options: [
            { value: "product", label: "Product" },
            { value: "consulting", label: "Consulting offering" },
          ],
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          label: "Tags",
          name: "tags",
          list: true,
          description:
            "Short capability labels shown as chips on the product card, so the grid can be skimmed without reading every description. Keep them to one or two words. Only the first two are rendered — extras are kept but not shown.",
        },
        {
          type: "image",
          label: "Logo",
          name: "logo",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "products",
        },
      ],
    },
  ],
};

const linkFields: TinaField[] = [
  {
    type: "string",
    label: "Label",
    name: "label",
  },
  {
    type: "string",
    label: "Link",
    name: "href",
  },
];

// Shared by product pages and sub-pages. Every field past the heading is
// optional, so a sub-page section can be heading + body while a product
// section carries an image, a list or a video.
const sectionFields: TinaField[] = [
  {
    type: "string",
    label: "Heading",
    name: "heading",
  },
  {
    type: "rich-text",
    label: "Body",
    name: "body",
    description:
      "Paragraphs only. Use Heading above for the title and List below for bullets, so every section keeps the same type scale.",
    toolbarOverride: ["bold", "italic", "link"],
  },
  {
    type: "string",
    label: "List",
    name: "list",
    list: true,
    description:
      "Optional bullets, shown as a multi-column grid with square red markers.",
  },
  {
    type: "image",
    label: "Image",
    name: "image",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    uploadDir: () => "products",
  },
  {
    type: "string",
    label: "Image Position",
    name: "imagePosition",
    description:
      "Where the image sits relative to the text. Ignored when no image is set.",
    options: [
      { value: "none", label: "Full width (no image)" },
      { value: "left", label: "Image left, text right" },
      { value: "right", label: "Text left, image right" },
    ],
  },
  {
    type: "string",
    label: "Image Fit",
    name: "imageFit",
    description:
      "Natural lets the image set its own height - right for screenshots and photos. Uniform gives every section the same fixed frame and scales the image to fit inside it, so a set of logos at different aspect ratios still lines up. Defaults to natural.",
    options: [
      { value: "natural", label: "Natural height" },
      { value: "uniform", label: "Uniform frame (logos)" },
    ],
  },
  {
    type: "object",
    label: "Video",
    name: "video",
    description: "Optional video shown beneath the body.",
    fields: [
      {
        type: "string",
        label: "URL",
        name: "url",
        description: "YouTube or Vimeo URL.",
      },
      { type: "string", label: "Caption", name: "caption" },
      {
        type: "string",
        label: "Duration",
        name: "duration",
        description: "Shown as a chip on the thumbnail, for example 3 min.",
      },
    ],
  },
  {
    type: "object",
    label: "Button",
    name: "button",
    description: "Optional call to action beneath the section.",
    fields: linkFields,
  },
];

export const productsSchema: Collection = {
  label: "Products - Pages",
  name: "products",
  path: "content/products",
  format: "mdx",
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      // Breadcrumbs, not filename, so a nested page (content/products/
      // sophiebot/try.mdx) routes to /products/sophiebot/try.
      return `/products/${document._sys.breadcrumbs.join("/")}`;
    },
  },
  // One field set serves both page types, because the renderer picks the
  // layout from the file's depth: content/products/<slug>.mdx is a product
  // page, anything nested under it (content/products/<slug>/<page>.mdx) is a
  // content sub-page. A sub-page uses Title, Blurb and Sections only, and
  // inherits its parent product's sidebar - the descriptions below say which
  // fields reach which page type, since the form can't hide them by depth.
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "image",
      label: "Logo",
      name: "logo",
      description:
        "Optional square product logo shown in the hero tile, on a white background in both themes.",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "products",
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
      isTitle: true,
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
      description: "Short line under the title. Product pages only.",
    },
    {
      type: "string",
      label: "Blurb",
      name: "blurb",
      description:
        "Intro paragraph under the hero. On a sub-page this is the page intro.",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      label: "Sidebar",
      name: "sidebar",
      description:
        "The sticky sidebar. Set it on the product page only - sub-pages inherit it.",
      fields: [
        {
          type: "object",
          label: "Primary Button",
          name: "primaryCta",
          description:
            "Red button at the top of the sidebar. Leave empty to show none.",
          fields: linkFields,
        },
        {
          type: "object",
          label: "Secondary Button",
          name: "secondaryCta",
          description: "Outlined button beneath the primary one.",
          fields: linkFields,
        },
        {
          type: "string",
          label: "App Store URL",
          name: "appStore",
          description:
            "Shows the official App Store badge when set. The badge artwork is fixed in code so it stays compliant.",
        },
        {
          type: "string",
          label: "Google Play URL",
          name: "googlePlay",
          description:
            "Shows the official Google Play badge and its required trademark line when set.",
        },
        {
          type: "object",
          label: "Pages",
          name: "subPages",
          list: true,
          description:
            "Links listed under Overview in the sidebar nav. Sub-pages, in-page anchors and external links all work.",
          ui: {
            itemProps: (item) => ({ label: item?.label }),
          },
          fields: linkFields,
        },
        {
          type: "object",
          label: "Embed",
          name: "embed",
          description:
            "Optional X post or YouTube Short at the foot of the sidebar.",
          fields: [
            {
              type: "string",
              label: "Type",
              name: "type",
              options: [
                { value: "x", label: "X post (4:3)" },
                { value: "short", label: "YouTube Short (9:16)" },
              ],
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Main Video",
      name: "mainVideo",
      description: "The video under the hero. Product pages only.",
      fields: [
        {
          type: "string",
          label: "URL",
          name: "url",
          description: "YouTube or Vimeo URL.",
        },
        { type: "string", label: "Caption", name: "caption" },
        {
          type: "string",
          label: "Duration",
          name: "duration",
          description: "Shown as a chip on the thumbnail, for example 43 sec.",
        },
      ],
    },
    {
      type: "object",
      label: "Features",
      name: "features",
      description:
        "The what-it-does card grid. Product pages only. Three or four cards read best.",
      fields: [
        {
          type: "string",
          label: "Brow",
          name: "brow",
          description:
            "Small red label above the heading, for example What it does.",
        },
        {
          type: "string",
          label: "Heading",
          name: "heading",
        },
        {
          type: "object",
          label: "Cards",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.title }),
          },
          fields: [
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - custom picker component doesn't satisfy Field's ui typing
            {
              type: "string",
              label: "Icon",
              name: "icon",
              description: "Icon shown in the red tile at the top of the card.",
              ui: {
                component: IconPickerInput,
              },
            },
            { type: "string", label: "Title", name: "title" },
            {
              type: "string",
              label: "Text",
              name: "text",
              ui: { component: "textarea" },
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Sections",
      name: "sections",
      list: true,
      description:
        "The main column's content sections, in order. Used by product pages and sub-pages alike.",
      ui: {
        itemProps: (item) => ({ label: item?.heading }),
      },
      fields: sectionFields,
    },
    {
      type: "object",
      label: "Carousel",
      name: "carousel",
      description:
        "Optional image carousel. Product pages only. Every image is cropped to the same 16:9 frame, so landscape shots work best.",
      fields: [
        {
          type: "string",
          label: "Heading",
          name: "heading",
        },
        {
          type: "object",
          label: "Images",
          name: "images",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.caption }),
          },
          fields: [
            {
              type: "image",
              label: "Image",
              name: "src",
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              uploadDir: () => "products",
            },
            {
              type: "string",
              label: "Caption",
              name: "caption",
              description:
                "Shown under the frame, and used as the image's alt text.",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Service CTA",
      name: "serviceCta",
      description:
        "Optional dark card at the foot of the page, pointing at an SSW service. Product pages only.",
      fields: [
        {
          type: "reference",
          label: "Service",
          name: "service",
          description:
            "The service page to link to. Supplies the link, so it can't go stale - the copy below is written by hand.",
          collections: ["consultingv2", "consulting"],
        },
        {
          type: "string",
          label: "Heading",
          name: "heading",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Button Label",
          name: "label",
        },
      ],
    },
  ],
};
