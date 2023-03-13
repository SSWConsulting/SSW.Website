import React from "react";
import Image from "next/image";
import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const VerticalListItem = ({ data }) => {
    return (
        <div className="flex items-center">
            {data.icon &&
                <Image
                    src={data.icon || ""}
                    alt={`${data.title} icon`}
                    width={75}
                    height={75}
                />
            }
            <TinaMarkdown content={data.content} />
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
        }
    ],
};
