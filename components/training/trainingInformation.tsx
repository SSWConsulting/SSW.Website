import { FC, Key } from "react";
import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
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
      <h3
        className="my-0 py-0 text-3xl"
        dangerouslySetInnerHTML={{ __html: sanitiseXSS(header, spanWhitelist) }}
      ></h3>
      <div className="w-full items-center p-5 text-left sm:w-3/4 lg:w-full">
        <TinaMarkdown components={componentRenderer} content={body} />
      </div>
    </div>
  );
};

export const TrainingInformation = ({ data }) => {
  return (
    <Section color="default">
      <Container
        padding={"md:px-8 px-2"}
        size={"xsmall"}
        className={"flex-1 pb-12"}
      >
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
  ui: {
    previewSrc: "/images/thumbs/tina/training-information.jpg",
  },
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
