import React from "react";
import Image from "next/image";
import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const VerticalListItem = ({ data }) => {
    const iconScale = data?.iconScale || 1;

    return (
        <div className="flex items-center pb-5">
            {data.icon &&
                <Image
                    src={data.icon || ""}
                    alt={`${data.title} icon`}
                    width={65 * iconScale}
                    height={65 * iconScale}
                    className="pr-5"
                />
            }
            <div className="font-helvetica font-bold">
                <TinaMarkdown content={data.content} />
            </div>
        </div>
    );
};

export const verticalListItemSchema: Template = {
    label: "List Item",
    name: "VerticalListItem",
    fields: [
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
        },
        {
            type: "number",
            label: "Icon Scale",
            name: "iconScale",
        }
    ],
};
