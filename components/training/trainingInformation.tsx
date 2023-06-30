import { FC, Key } from "react";
import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { recurringEventSchema } from "../blocks/recurringEvent";
import { verticalListItemSchema } from "../blocks/verticalListItem";
import { Container } from "../util/container";
import { Section } from "../util/section";

export type TrainingInformationItemProps = {
  header: string;
  body: TinaMarkdownContent | TinaMarkdownContent[];
};

const TrainingInformationItem: FC<TrainingInformationItemProps> = ({
  header,
  body,
}) => {
  return (
    <div className="flex flex-col text-center text-base lg:text-left">
      <h1
        className="mt-0 pt-0"
        dangerouslySetInnerHTML={{ __html: header }}
      ></h1>
      <div className="w-full items-center p-5 text-left sm:w-3/4 lg:w-full">
        <TinaMarkdown components={componentRenderer} content={body} />
      </div>
    </div>
  );
};

export const TrainingInformation = ({ data }) => {
  return (
    <Section color="white">
      <Container size={"xsmall"} className={"flex-1 pb-12"}>
        <div className="grid grid-cols-1 justify-between lg:grid-cols-3">
          {data.trainingInformationItems?.map(
            (item: TrainingInformationItemProps, key: Key) => (
              <TrainingInformationItem
                key={key}
                header={item.header}
                body={item.body}
              />
            )
          )}
        </div>
      </Container>
    </Section>
  );
};

export const trainingInformationSchema: Template = {
  label: "Training Information",
  name: "TrainingInformation",
  fields: [
    {
      type: "object",
      label: "Training Information Items",
      name: "trainingInformationItems",
      list: true,
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header",
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
          templates: [verticalListItemSchema, recurringEventSchema],
        },
      ],
    },
  ],
};

export default TrainingInformation;
