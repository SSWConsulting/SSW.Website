import { FC } from "react";
import type { Template } from "tinacms";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import { Container } from "../util/container";
import HorizontalList, {
  HorizontalListItemProps,
} from "../util/horizontalList";
import { Section } from "../util/section";

export type TrainingLearningOutcomeProps = {
  data: {
    header: string;
    listItems: {
      title: string;
      content: TinaMarkdownContent | TinaMarkdownContent[];
      icon: string;
    }[];
  };
};

export const TrainingLearningOutcome: FC<TrainingLearningOutcomeProps> = ({
  data,
}) => {
  const horizontalListProps =
    data.listItems?.map<HorizontalListItemProps>((m) => ({
      title: m.title,
      icon: m.icon,
      content: m.content,
    })) || [];

  return (
    <Section color="lightgray">
      <Container className={"flex-1 p-0"}>
        <div className="flex flex-col items-center py-10">
          <h1
            className="mb-8 mt-0 pt-0 text-center"
            dangerouslySetInnerHTML={{
              __html: sanitiseXSS(data?.header, spanWhitelist),
            }}
          ></h1>
          <HorizontalList listItemProps={horizontalListProps} />
        </div>
      </Container>
    </Section>
  );
};

export const trainingLearningOutcomeSchema: Template = {
  label: "Training Learning Outcomes",
  name: "TrainingLearningOutcome",
  ui: {
    previewSrc: "/images/thumbs/tina/training-learning-outcomes.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Header",
      name: "header",
    },
    {
      type: "object",
      label: "List Items",
      name: "listItems",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Content",
          name: "content",
          isBody: true,
        },
        {
          type: "image",
          label: "Icon",
          name: "icon",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "logos",
        },
      ],
    },
  ],
};
