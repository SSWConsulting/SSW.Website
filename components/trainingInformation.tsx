import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import * as Schemas from "../components/blocks";
import { componentRenderer } from "../components/blocks/mdxComponentRenderer";

const TrainingInformation: FC<{ body: TinaMarkdownContent | TinaMarkdownContent[], header: string }> = ({ body, header }) => {
    return (
        <div className="flex flex-col items-center text-center lg:text-left">
            <h1 dangerouslySetInnerHTML={{ __html: header }}></h1>
            <div className="w-full sm:w-3/4 lg:w-full">
                <TinaMarkdown
                    components={componentRenderer}
                    content={body}
                />
            </div>
        </div>
    );
}

export const trainingInformationSchema = {
    type: "object",
    label: "Training Information",
    name: "trainingInformation",
    fields: [
        {
            type: "object",
            label: "Information Columns",
            name: "informationColumns",
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
                    templates: [...Schemas.pageBlocks],
                    isBody: true,
                },
            ],
        },
    ],
};

export default TrainingInformation;
