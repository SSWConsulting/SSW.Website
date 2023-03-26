import { FC } from "react";
import type { Template } from "tinacms";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Section } from "../util/section";
import { Container } from "../util/container";
import { verticalListItemSchema } from "../blocks";

export type TrainingInformationItemProps = {
    header: string;
    body: TinaMarkdownContent | TinaMarkdownContent[];
};

const TrainingInformationItem: FC<TrainingInformationItemProps> = ({ header, body }) => {
    return (
        <div className="flex flex-col items-center text-center lg:text-left">
            <h1 dangerouslySetInnerHTML={{ __html: header }}></h1>
            <div className="w-full text-left sm:w-3/4 lg:w-full">
                <TinaMarkdown
                    components={componentRenderer}
                    content={body}
                />
            </div>
        </div>
    )
}

export const TrainingInformation = ({ data }) => {
    return (
        <Section color="white">
            <Container className={"flex-1 pt-0"}>
                <div className="grid grid-cols-1 justify-between lg:grid-cols-3">
                    {data.trainingInformationItems?.map((item, key) => <TrainingInformationItem key={key} header={item.header} body={item.body} />)}
                </div>
            </Container>
        </Section>
    );
}

export const trainingInformationSchema: Template = {
    type: "object",
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
                    templates: [verticalListItemSchema],
                },
            ],
        },
    ],
};

export default TrainingInformation;
