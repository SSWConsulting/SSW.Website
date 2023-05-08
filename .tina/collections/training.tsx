import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { trainingHeaderSchema } from "../../components/training/trainingHeader";
import { videoCardSchema } from "../../components/util/videoCards";

export const trainingSchema: Collection = {
    label: "Training Pages",
    name: "training",
    format: "mdx",
    path: "content/training",
    ui: {
        router: ({ document }) => {
            return `/training/${document._sys.filename}`;
        },
    },
    fields: [
        // @ts-ignore
        seoSchema,
        // @ts-ignore
        trainingHeaderSchema,
        {
            type: "object",
            list: true,
            name: "_body",
            label: "Body",
            ui: {
                visualSelector: true,
            },
            templates: [...Schemas.pageBlocks],
        },
        // @ts-ignore
        videoCardSchema,
    ]
};
