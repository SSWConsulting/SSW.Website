import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import * as Schemas from "../../components/blocks";
import { ClientsFilter } from "../filter/clients";
import { Container } from "../util/container";

export type ClientDisplay = {
  name: string;
  logo: string;
  content: TinaMarkdownContent;
  categories: string[];
};

type ClientListProps = {
  data: {
    clients: ClientDisplay[];
    categories: {
      category: {
        id?: string;
        name?: string;
      };
    }[];
  };
};

export const ClientList = ({
  data: { clients, categories },
}: ClientListProps) => {
  console.log(categories);
  const clientCategories = categories.map(
    (category) => category?.category?.name
  );
  return (
    <Container>
      <ClientsFilter clients={clients} categories={clientCategories} />
    </Container>
  );
};

export const clientListSchema: Template = {
  label: "Client List",
  name: "ClientList",
  fields: [
    {
      type: "object",
      name: "categories",
      label: "Categories",
      list: true,
      fields: [
        {
          type: "reference",
          name: "category",
          label: "Category",
          collections: ["clientCategories"],
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.category };
        },
      },
    },
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
          type: "image",
          name: "logo",
          label: "Logo",
        },
        {
          type: "rich-text",
          name: "content",
          label: "Content",
          templates: [
            Schemas.utilityButtonSchema,
            Schemas.videoEmbedBlockSchema,
            Schemas.customImageBlockSchema,
          ],
        },
        {
          type: "reference",
          name: "category",
          label: "Category",
          collections: ["clientCategories"],
        },
      ],
    },
  ],
};
