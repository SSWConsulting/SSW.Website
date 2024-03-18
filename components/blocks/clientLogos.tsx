import Image from "next/image";
import type { Template } from "tinacms";
import layoutData from "../../content/global/index.json";

const clientsData = layoutData.clients.clientsList;

export const ClientLogos = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {clientsData.length &&
        clientsData.map((client) => (
          <Image
            key={client.clientName}
            src={client.imageUrl}
            alt={client.clientName + " logo"}
            height={113}
            width={200}
            sizes="20vw"
            className="my-4 max-w-full rounded-lg"
          />
        ))}
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
