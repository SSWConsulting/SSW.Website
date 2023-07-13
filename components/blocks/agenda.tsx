import { classNames, type Template } from "tinacms";

import { FC, Key } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { verticalListItemSchema } from "../blocks/verticalListItem";
import { Container } from "../util/container";
import { Section } from "../util/section";


const alignmentClasses = {
  center: "text-center",
  right: "text-right",
};

const textColorClasses = {
  red: "text-sswRed",
  grey: "text-gray-500"
};


export type AgendaItemProps = {
  body: TinaMarkdownContent[];
};

const AgendaItem: FC<AgendaItemProps> = ({
  body,
}) => {
  return (
    <div className="flex flex-col text-center text-base lg:text-left">

      <div className="w-full items-center p-5 text-left sm:w-3/4 lg:w-full">
        <TinaMarkdown components={componentRenderer} content={body} />
      </div>
    </div>
  );
};

export const Agenda = ({ data }) => {
  return (
    <Section color="white">
      <Container
        padding={"md:px-8 px-2"}
        size={"xsmall"}
        className={"flex-1 pb-12"}
      >
      <h3
        className={classNames("my-0 py-0 text-3xl ", alignmentClasses[data.align], textColorClasses[data.textColor])}
        dangerouslySetInnerHTML={{ __html: data.header }}
      ></h3>
        <div className={classNames("grid grid-cols-1 justify-between", getGridColumns(data?.agendaItemList.length))}>
          {data?.agendaItemList?.map(
            (item: AgendaItemProps, key: Key) => (
              <AgendaItem
                key={key}
                body={item.body}
              />
            )
          )}
        </div>
      </Container>
    </Section>
  );
};

const getGridColumns = (length)=>{
  if(length === 1)
  return "md:grid-cols-1"
  else if(length === 2)
  return "md:grid-cols-2"
  else
  return "md:grid-cols-3"
}

export const agendaSchema: Template = {
  label: "Agenda",
  name: "Agenda",
  fields: [
    {
      type: "string",
      label: "Header",
      name: "header",
    },
    {
      type: "string",
      label: "Align Header",
      name: "align",
      options: [
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    {
      type: "string",
      label: "Header Color",
      name: "textColor",
      options: [
        { label: "Red", value: "red" },
        { label: "Grey", value: "grey" },
      ],
    },
    {
      type: "object",
      label: "Agenda Items",
      name: "agendaItemList",
      ui:{
        itemProps(item) {
          return {label:item?.placeholder}
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "Placeholder Text",
          name: "placeholder",
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
          templates: [verticalListItemSchema],
        },
      ],
    },
  ],
};

export default Agenda;
