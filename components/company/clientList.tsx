import type { Template } from "tinacms";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { ClientsFilter } from "../filter/clients";

export type ClientDisplay = {
  name: string;
  logo: string;
  content: TinaMarkdownContent;
  category: string;
};

type ClientListProps = {
  data: {
    clients: ClientDisplay[];
  };
};

export const ClientList = ({ data: { clients } }: ClientListProps) => {
  console.log(clients);
  return <ClientsFilter clients={clients} />;
};

export const clientListSchema: Template = {
  label: "Client List",
  name: "ClientList",
  fields: [
    {
      type: "object",
      name: "clients",
      label: "Clients list",
      list: true,
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
        },
        {
          type: "string",
          name: "logo",
          label: "Logo",
        },
        {
          type: "rich-text",
          name: "content",
          label: "Content",
        },
      ],
    },
  ],
};
