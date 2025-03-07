import type { Template } from "tinacms";

import classNames from "classnames";
import { FC, Key } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import { verticalListItemSchema } from "../blocks/verticalListItem";
import { Container } from "../util/container";
import { Section } from "../util/section";

const textColorClasses = {
  red: "text-sswRed",
  gray: "text-gray-500",
  default: "",
};

export type AgendaItemProps = {
  body: TinaMarkdownContent[];
};

const AgendaItem: FC<AgendaItemProps> = ({ body }) => {
  return (
    <div className="flex flex-col text-center text-base lg:text-left">
      <div className="w-full items-center text-left sm:w-3/4 md:py-5 md:pl-4 lg:w-full lg:p-5">
        <TinaMarkdown components={componentRenderer} content={body} />
      </div>
    </div>
  );
};

export const Agenda = ({ data }) => {
  return (
    <Section color="default">
      <Container
        padding={"md:px-8 px-2"}
        size={"xsmall"}
        className={"flex-1 pb-8"}
      >
        <h2
          className={classNames(
            "my-8 text-center",
            textColorClasses[data.textColor]
          )}
          dangerouslySetInnerHTML={{
            __html: sanitiseXSS(data.header, spanWhitelist) || "",
          }}
          data-tina-field={tinaField(data, agendaBlockConstant.header)}
        ></h2>
        <div
          className={classNames(
            "grid grid-cols-1 justify-between px-4 md:px-0",
            getGridColumns(data?.agendaItemList?.length)
          )}
        >
          {data?.agendaItemList?.map((item: AgendaItemProps, key: Key) => (
            <AgendaItem key={key} body={item.body} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

const getGridColumns = (length) => {
  if (length === 1) return "lg:grid-cols-1";
  else if (length === 2) return "lg:grid-cols-2";
  else return "lg:grid-cols-3 md:grid-cols-2";
};

export const agendaBlockConstant = {
  value: "Agenda",
  header: "header",
  align: "align",
  textColor: "textColor",
  agendaItemList: {
    value: "agendaItemList",
    placeholder: "placeholder",
    body: "body",
  },
};

export const agendaSchema: Template = {
  label: "Agenda",
  name: agendaBlockConstant.value,

  ui: {
    previewSrc: "/images/thumbs/tina/agenda.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Header",
      name: agendaBlockConstant.header,
    },
    {
      type: "string",
      label: "Header Color",
      name: agendaBlockConstant.textColor,
      options: [
        { label: "Red", value: "red" },
        { label: "Gray", value: "gray" },
        { label: "Default", value: "default" },
      ],
    },
    {
      type: "object",
      label: "Agenda Items",
      name: agendaBlockConstant.agendaItemList.value,
      ui: {
        itemProps(item) {
          return { label: item?.placeholder };
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "Placeholder Text",
          name: agendaBlockConstant.agendaItemList.placeholder,
        },
        {
          type: "rich-text",
          label: "Body",
          name: agendaBlockConstant.agendaItemList.body,
          templates: [verticalListItemSchema],
        },
      ],
    },
  ],
};

export default Agenda;
