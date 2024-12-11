import { default as React, useEffect, useState } from "react";
import { Template, wrapFieldsWithMeta } from "tinacms";
import { buttonSchema } from "../../button/templateButtonSchema";
import { Checkbox } from "../../ui/checkbox";
import { listItemSchema } from "../imageComponents/imageTextBlock/listItem-schema";
import { pillGroupSchema } from "../imageComponents/imageTextBlock/pillGroup";
import { backgroundSchema } from "../imageComponents/imageTextBlock/v2ComponentWrapper";
import { cardOptions } from "../sharedTinaFields/colourOptions/cardOptions";
import { ColorPickerInput } from "../sharedTinaFields/colourSelector";
import { IconPickerInput } from "../sharedTinaFields/iconSelector";

import { fadeInSchema } from "../imageComponents/imageTextBlock/v2ComponentWrapper";

const GUIDFunction = () => Math.random().toString(36).substring(7);

const GUIDGeneratorComponent = (props) => {
  useEffect(() => {
    if (!props.input.value) {
      props.input.onChange(GUIDFunction());
    }
  });
  return <></>;
};

export const CardCarouselSchema: Template = {
  name: "cardCarousel",
  label: "Card Carousel",
  // ui: {
  //   previewSrc: "/images/thumbs/tina/accordian.jpg",
  // },
  ui: {

    defaultItem: {
      isStacked: false,
      heading: "Lorem Ipsum",
      isH1: false,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      buttonRow: [
        {
          buttonText: "Lorem",
        },
        {
          buttonText: "Ipsum",
        }
      ],
    }
  },
  fields: [
    {
      type: "boolean",
      label: "Stacked Mode",
      name: "isStacked",
      description: "Remove the carousel effect and stack card entries.",
    },
    {
      type: "string",
      label: "Heading",
      name: "heading",
      description: "Heading text for the block.",
    },
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
        max: 4,
        defaultItem: {
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
              const cardCarouselBlocks = formState.values.blocks.filter(
                (block) => block._template === "cardCarousel"
              );
              useEffect(() => {
                if (!input.value.guid) {
                  input.onChange({
                    guid: GUIDFunction(),
                  });
                }
                cardCarouselBlocks.forEach((block) => {
                  block.categoryGroup.forEach((category) => {
                    if (category.cardGuidList.guid === input.value.guid) {
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
                        <div key={`${index}-${item}`} className="flex gap-2">
                          <Checkbox
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
                          <label>
                            {item.heading ||
                              item.altText ||
                              `Unlabeled – ${item.guid}`}
                          </label>
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
        defaultItem: {
          chips: {
            chips: [],
          },
          heading: "Lorem Ipsum",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          featureList: {
            features: [],
          },
          embeddedButton: {
            buttonText: "Lorem",
          },
        }
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
          description: "Add chips to the bottom of the media text block.",
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
                  heading: "{{ HEADING }}",
                  description: "{{ DESCRIPTION }}",
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
    //@ts-expect-error – fields are not being recognized
    fadeInSchema,
  ],
};
