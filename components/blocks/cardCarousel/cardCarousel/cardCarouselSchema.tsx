import { default as React, useEffect, useState } from "react";
import { Template, TinaField, wrapFieldsWithMeta } from "tinacms";
import { listItemSchema } from "../../../blocksSubtemplates/listItem.schema";
import { pillGroupSchema } from "../../../blocksSubtemplates/pillGroup";
import tabletTextAlignmentField from "../../../blocksSubtemplates/tabletTextAlignment.schema";
import { cardOptions } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { ColorPickerInput } from "../../../blocksSubtemplates/tinaFormElements/colourSelector";
import { IconPickerInput } from "../../../blocksSubtemplates/tinaFormElements/iconSelector";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { mediaTypeField } from "../../mediaType.schema";
import { youtubeEmbedField } from "../../youtubeEmbed.schema";

import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { Checkbox } from "../../../ui/checkbox";

const GUIDFunction = () => Math.random().toString(36).substring(7);

const GUIDGeneratorComponent = (props) => {
  useEffect(() => {
    if (!props.input.value) {
      props.input.onChange(GUIDFunction());
    }
  });
  return <></>;
};

const defaultCardItem = {
  guid: null,
  altText: "Lorem Ipsum",
  chips: [
    {
      chipText: "Lorem",
      chipType: "filledChip",
    },
    {
      chipText: "Ipsum",
      chipType: "clearChip",
    },
  ],
  icon: "info",
  heading: "Lorem Ipsum",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  featureList: {
    features: [
      {
        heading: "Feature 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "Tina",
      },
      {
        heading: "Feature 2",
        description:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: "Tina",
      },
    ],
  },
  embeddedButton: {
    buttonText: "Lorem",
  },
};
export const CardCarouselSchema: Template = {
  name: "cardCarousel",
  label: "<V2> Card Carousel",
  ui: {
    previewSrc: "/images/thumbs/tina/card-carousel.jpg",
    defaultItem: {
      buttons: [
        {
          buttonText: "Lorem",
          colour: 0,
        },
        {
          buttonText: "Ipsum",
          colour: 1,
        },
      ],
      isStacked: false,
      heading: "Lorem Ipsum",
      isH1: false,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

      categoryGroup: [
        {
          categoryName: "Lorem",
          cardGuidList: {
            cardGuidList: [],
          },
        },
        {
          categoryName: "Dolor",
          cardGuidList: {
            cardGuidList: [],
          },
        },
      ],
      buttonRow: [
        {
          buttonText: "Lorem",
        },
        {
          buttonText: "Ipsum",
        },
      ],
      cards: [
        defaultCardItem,
        defaultCardItem,
        defaultCardItem,
        defaultCardItem,
        defaultCardItem,
      ],
    },
  },
  fields: [
    {
      type: "boolean",
      label: "Stacked Mode",
      name: "isStacked",
      description: "Remove the carousel effect and stack card entries.",
    },
    alternatingHeadingSchema,
    {
      type: "boolean",
      label: "Use as H1",
      name: "isH1",
      description: "Choose to use the heading as an H1 instead of an H2.",
    },
    {
      type: "string",
      label: "Body",
      name: "body",
      description: "Flavour text under the block title.",
      ui: {
        component: "textarea",
      },
    },
    tabletTextAlignmentField as TinaField,
    {
      name: "buttons",
      label: "Button Row",
      type: "object",
      list: true,
      description: "A row of buttons. Max 2.",
      ui: {
        defaultItem: {
          buttonText: "Lorem",
        },
        max: 2,
        itemProps(item) {
          return { label: `${item.buttonText}` };
        },
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
    {
      type: "object",
      label: "Category Group",
      name: "categoryGroup",
      list: true,
      description:
        "Tabs that group cards, under the hood cards and tabs are linked by hidden GUIDs.",
      ui: {
        defaultItem: {
          categoryName: "Lorem Ipsum",
          cardGuidList: {
            cardGuidList: [],
          },
        },

        itemProps: (item) => {
          return { label: item?.categoryName ?? "Tab" };
        },
      },
      fields: [
        {
          type: "string",
          label: "Category Name",
          name: "categoryName",
          description: "Text to include on the tab.",
        },
        //This is a little convoluted, due to the way Tina limits data passing between components
        //We can get all form values from the custom component, but still need to identify the correct block
        //The hidden GUIDs let us find the correct block, category, and card list to use.
        {
          type: "object",
          label: "Attached Cards",
          name: "cardGuidList",
          fields: [
            {
              type: "string",
              label: "Category GUID",
              name: "guid",
            },
            {
              type: "string",
              label: "Card GUID List",
              name: "cardGuidList",
              list: true,
            },
          ],
          ui: {
            component: wrapFieldsWithMeta(({ form, input }) => {
              const formState = form.getState();
              const [fieldValues, setFieldValues] = useState(
                input.value?.cardGuidList ?? []
              );
              const [options, setOptions] = useState([]);
              const cardCarouselBlocks =
                formState.values.blocks?.filter(
                  (block) => block._template === "cardCarousel"
                ) ?? [];
              useEffect(() => {
                if (!input.value?.guid) {
                  input.onChange({
                    guid: GUIDFunction(),
                    cardGuidList: [],
                  });
                }
                cardCarouselBlocks.forEach((block) => {
                  block.categoryGroup?.forEach((category) => {
                    if (category.cardGuidList?.guid === input.value?.guid) {
                      setOptions(block.cards ?? []);
                    }
                  });
                });
              });

              return (
                <div>
                  <div className="flex flex-col gap-4">
                    {options.length === 0 && <p>No cards found.</p>}
                    {options?.map((item, index) => {
                      return (
                        <div
                          key={`${index}-${item}`}
                          className="flex flex-wrap gap-2"
                        >
                          <Checkbox
                            disabled={!item.guid}
                            checked={fieldValues.includes(item.guid)}
                            onCheckedChange={(checked) => {
                              const newFieldValues = checked
                                ? [...fieldValues, item.guid]
                                : fieldValues.filter(
                                    (value) => value !== item.guid
                                  );
                              const newObjectValue = {
                                ...input.value,
                                cardGuidList: newFieldValues,
                              };
                              setFieldValues(newFieldValues);
                              return input.onChange(newObjectValue);
                            }}
                          />
                          <label
                            className={`${!item.guid ? "text-gray-600" : ""} text-wrap`}
                          >
                            {item.heading ||
                              item.altText ||
                              `Unlabeled – ${item.guid}`}
                          </label>
                          {!item.guid && (
                            <p className="text-wrap text-red-700">
                              ⚠️ Make and save changes to this card before
                              assigning it to a tab ⚠️
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }),
          },
        },
      ],
    },
    {
      type: "number",
      label: "Card Style",
      name: "cardStyle",
      ui: {
        // @ts-expect-error – component is not being recognized
        component: ColorPickerInput(cardOptions),
      },
    },
    {
      type: "object",
      label: "Cards",
      name: "cards",
      description: "The list of cards to be displayed.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.heading ?? "Card" };
        },
        defaultItem: defaultCardItem,
      },
      fields: [
        {
          type: "string",
          label: "guid",
          name: "guid",
          ui: {
            component: GUIDGeneratorComponent,
          },
        },
        // @ts-expect-error – Tina doen't reconize imported fields
        mediaTypeField,
        // @ts-expect-error – Tina doen't reconize imported fields
        youtubeEmbedField,
        {
          type: "image",
          label: "Image",
          name: "image",
          description: "Image source for the card.",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description: "Alternative text for the card.",
        },
        {
          name: "chips",
          label: "Chips",
          type: "object",
          description: "The chips displayed on card. Max 6.",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.chipText ?? "Chip" };
            },
            defaultItem: {
              chipText: "Lorem",
              chipType: "filledChip",
            },
            max: 6,
          },
          //@ts-expect-error – fields are not being recognized
          fields: pillGroupSchema,
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
          type: "string",
          label: "Heading",
          name: "heading",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "featureList",
          label: "Feature List",
          description:
            "A list of text-icon entries to go under the description.",
          type: "object",
          fields: [
            {
              list: true,
              type: "object",
              label: "Features",
              name: "features",
              description: "Add an item to the the feature columns.",
              //@ts-expect-error – fields are not being recognized
              fields: listItemSchema,
              ui: {
                defaultItem: {
                  heading: "Lorem Ipsum",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                },
              },
            },
          ],
        },
        {
          type: "object",
          label: "Embedded Button",
          name: "embeddedButton",
          description: "The link appearing at the bottom of each card.",
          fields: [
            {
              type: "string",
              label: "Button Text",
              name: "buttonText",
              description: "Text to appear on the button.",
            },
            {
              type: "string",
              label: "Button Link",
              name: "buttonLink",
              description: "Link to the page the button will navigate to.",
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
          ],
        },
      ],
    },
    //@ts-expect-error – fields are not being recognized
    backgroundSchema,
  ],
};
