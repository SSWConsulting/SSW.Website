import React from "react";
import type { Template } from "tinacms";
import Image from "next/image";

const clients = {
    "allianz": "allianz.jpg",
    "carnival": "carnival.jpg",
    "cisco": "cisco.jpg",
    "commonwealthbank": "commbank.jpg",
    "symantec": "symatec.jpg",
    "domain": "domain.jpg",
    "eventcinemas": "events.jpg",
    "microsoft": "microsoft.jpg",
    "toll": "toll.jpg",
};

export const ClientLogos = () => {
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {
                Object.keys(clients).map(client =>
                    <Image
                        src={`/images/clientLogos/${clients[client]}`}
                        alt={client}
                        height={50}
                        width={200}
                        className="my-4 max-w-full rounded-lg"
                    />
                )
            }
        </div>
    );
};

export const clientLogosBlockSchema: Template = {
    name: "ClientLogos",
    label: "Client Logos",
    // Todo: Find a way to have no fields - the one below is to satisfy compiler
    fields: [
        {
            type: "string",
            label: "Alt text",
            name: "altText",
            required: true,
        },
    ],
};
