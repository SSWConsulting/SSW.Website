import { Container } from "../util/container";
import { Section } from "../util/section";
import HorizontalList from "../util/horizontalList";
import { Template } from "tinacms/dist/admin/types";

export const TrainingLearningOutcome = ({ data }) => {
    const horizontalListProps = data.listItems?.map<HorizontalListItemProps>((m) => ({
        title: m.title,
        icon: m.icon,
        content: m.content,
    })) || [];

    return (
        <Section color="lightgray">
            <Container className={"flex-1 pt-0"}>
                <div className="flex flex-col items-center">
                    <h1 dangerouslySetInnerHTML={{ __html: data?.header }}></h1>
                    <HorizontalList listItemProps={horizontalListProps} />
                </div>
            </Container>
        </Section>
    );
}

export const trainingLearningOutcomeSchema: Template = {
    type: "object",
    label: "Training Learning Outcomes",
    name: "TrainingLearningOutcome",
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
                }
            ],
        },
    ],
};
