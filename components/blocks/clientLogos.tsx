import React, { useEffect, useState } from "react";
import type { Template } from "tinacms";
import Image from "next/image";
import client from "../../.tina/__generated__/client";

export const ClientLogos = () => {
  const [clientsData, setclientsData] = useState([]);

  useEffect(() => {
    loadClientsData();
  }, []);

  const loadClientsData = () => {
    client.queries.globalConnection().then((data) => {
      const clientsData =
        data.data.globalConnection.edges[0].node.clients.clientsList;
      setclientsData(clientsData);
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {clientsData.length &&
        clientsData.map((client) => (
          <Image
            key={client.clientName}
            src={client.imageUrl}
            alt={client}
            height={50}
            width={200}
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
