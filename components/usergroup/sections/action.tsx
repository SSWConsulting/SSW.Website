import {
  LuGraduationCap,
  LuMessagesSquare,
  LuPizza,
  LuSmile,
} from "react-icons/lu";
import { SponsorCard } from "../sponsorCard";
import { Container } from "../../util/container";
import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { MeetupForm } from "../meetupForm";
import { tinaField } from "tinacms/dist/react";

type ActionSectionProps = {
  heading?: string;
  content?: TinaMarkdownContent;
  listItems?: {
    icon: keyof typeof iconMap;
    text: string;
  }[];
  eventSponsors?: string[];
};

const iconMap = {
  graduation: {
    name: "Graduation Cap",
    icon: LuGraduationCap,
  },
  messages: {
    name: "Messages Square",
    icon: LuMessagesSquare,
  },
  smile: {
    name: "Smile",
    icon: LuSmile,
  },
  pizza: {
    name: "Pizza",
    icon: LuPizza,
  },
} as const;

export const ActionSection = (props: ActionSectionProps) => {
  return (
    <section className="bg-gray-900 ">
      <Container className="py-12">
        <div className="flex-row justify-between md:flex">
          <div className="text-white">
            <div className="pb-8">
              <h3
                className="text-4xl font-medium"
                data-tina-field={tinaField(props, "heading")}
              >
                {props.heading}
              </h3>
              <div className="child-p:text-base child-p:font-normal child-p:text-gray-50">
                <TinaMarkdown content={props.content} />
              </div>
            </div>
            <ul>
              {props?.listItems?.map((item, index) => (
                <li className="py-3 text-lg font-semibold" key={index}>
                  {iconMap[item.icon]?.icon({
                    size: 40,
                    className: "mr-5 inline",
                  })}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <MeetupForm className="self-start max-md:mx-auto" />

            <SponsorCard
              className="mb-4 mt-6 items-end justify-end text-white"
              urls={props.eventSponsors.map((sponsor) => ({
                src: sponsor,
                label: "Sponsor image",
              }))}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export const actionSectionBlockSchema: Template = {
  name: "ActionSection",
  label: "Action Section",
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
    {
      type: "object",
      label: "List Items",
      name: "listItems",
      list: true,
      fields: [
        {
          type: "string",
          label: "Icon",
          name: "icon",
          options: Object.keys(iconMap).map((key) => ({
            value: key,
            label: iconMap[key].name,
          })),
        },
        {
          type: "string",
          label: "Text",
          name: "text",
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.text };
        },
      },
    },
    {
      type: "image",
      label: "Event Sponsors",
      name: "eventSponsors",
      list: true,
    },
  ],
};
