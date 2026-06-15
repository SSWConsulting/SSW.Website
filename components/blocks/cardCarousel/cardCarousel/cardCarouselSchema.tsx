import { default as React, useEffect, useState } from "react";
import { wrapFieldsWithMeta } from "tinacms";
import type { Template, TinaField } from "tinacms";
import { IconLabelSchema } from "../../../blocksSubtemplates/iconLabel.schema";
import { listItemSchema } from "../../../blocksSubtemplates/listItem.schema";
import { pillGroupSchema } from "../../../blocksSubtemplates/pillGroup";
import tabletTextAlignmentField from "../../../blocksSubtemplates/tabletTextAlignment.schema";
import {
  buttonOptions,
  DEFAULT_BUTTON_COLOUR,
} from "../../../blocksSubtemplates/tinaFormElements/colourOptions/buttonOptions";
import { cardOptions } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { ColorPickerInput } from "../../../blocksSubtemplates/tinaFormElements/colourSelector";
import { IconPickerInput } from "../../../blocksSubtemplates/tinaFormElements/iconSelector";
import { buttonSchema } from "../../../button/templateButton.schema";
import {
  anchorIdSchema,
  backgroundSchema,
} from "../../../layout/v2ComponentWrapper.schema";
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
    {
      type: "object",
      label: "Top Label",
      name: "topLabel",
      description: "Add an eyebrow label above the heading.",
      //@ts-expect-error – fields are not being recognized
      fields: IconLabelSchema,
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
    // @ts-expect-error – Tina 3.8.x: custom ui.component type no longer matches Field
    {
      type: "number",
      label: "Card Style",
      name: "cardStyle",
      ui: {
        component: ColorPickerInput(cardOptions),
      },
    },
    {
      type: "string",
      label: "Cards per row",
      name: "cardsPerRow",
      description:
        "Cards per row when the carousel effect is off (Stacked Mode). Has no effect in carousel mode.",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ],
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
        // @ts-expect-error – Tina 3.8.x: custom ui.component type no longer matches Field
        {
          type: "string",
          label: "Icon",
          name: "icon",
          ui: {
            component: IconPickerInput,
          },
        },
        {
          type: "string",
          label: "Eyebrow",
          name: "eyebrow",
          description:
            "Optional small label above the card heading (e.g. a timestamp like \"9:00 – 9:20\").",
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
          description:
            "Optional link or CTA at the bottom of each card. Leave Button Text blank to omit the button entirely.",
          fields: [
            {
              type: "string",
              label: "Button Text",
              name: "buttonText",
              description: "Text to appear on the button.",
            },
            {
              type: "string",
              label: "Eventbrite Event ID",
              name: "eventbriteEventId",
              description:
                "Numeric event ID from the Eventbrite event URL (e.g. eventbrite.com/e/<name>-<EVENT_ID>). When set, the button opens that event's checkout in a modal — the embed only loads on click. Leave the Button Link blank when using this.",
              ui: {
                // The two are mutually exclusive: the Event ID takes precedence
                // in embeddedCardButton, so a Button Link set alongside it is
                // silently ignored. Warn rather than letting it fail quietly.
                // field.name is the dotted path to this card's field; swap the
                // leaf for buttonLink to read the sibling on the same card.
                validate: (value, allValues, _meta, field) => {
                  if (!value) return undefined;
                  const siblingPath = field?.name?.replace(
                    /eventbriteEventId$/,
                    "buttonLink"
                  );
                  const buttonLink = siblingPath
                    ?.split(".")
                    .reduce((obj, key) => obj?.[key], allValues);
                  if (buttonLink) {
                    return "Set either an Eventbrite Event ID or a Button Link, not both — the Event ID wins and the link is ignored.";
                  }
                },
              },
            },
            {
              type: "string",
              label: "Button Link",
              name: "buttonLink",
              description:
                "Link the button navigates to (supports in-page anchors like #pick-your-city). Leave blank when using an Eventbrite Event ID.",
            },
            // @ts-expect-error – Tina 3.8.x: custom ui.component type no longer matches Field
            {
              type: "string",
              label: "Icon",
              name: "icon",
              ui: {
                component: IconPickerInput,
              },
            },
            {
              type: "number",
              label: "Colour",
              name: "colour",
              // @ts-expect-error – Tina 3.8.x: custom ui.component type no longer matches Field
              ui: {
                component: ColorPickerInput(buttonOptions),
                defaultValue: DEFAULT_BUTTON_COLOUR,
              },
            },
          ],
        },
      ],
    },
    //@ts-expect-error – fields are not being recognized
    backgroundSchema,
    anchorIdSchema,
  ],
};
