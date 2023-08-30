import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import * as Schemas from "../../components/blocks";
import { ClientsFilter } from "../filter/clients";
import { Container } from "../util/container";

export type Category = {
  id: string;
  name: string;
};

export type ClientDisplay = {
  name: string;
  logo?: string;
  logoUrl?: string;
  content: TinaMarkdownContent;
  caseStudyUrl?: string;
  categories: {
    category: Category;
  }[];
};

type ClientListProps = {
  data: {
    clients: ClientDisplay[];
    categories: {
      category: Category;
    }[];
  };
};

export const ClientList = ({
  data: { clients, categories },
}: ClientListProps) => {
  console.log(clients);
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
          return {
            label:
              item?.category || "New category (click to select a category)",
          };
        },
      },
    },
    {
      type: "object",
      name: "clients",
      label: "Clients list",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
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
          type: "string",
          name: "logoUrl",
          label: "Logo URL",
        },
        {
          type: "rich-text",
          name: "content",
          label: "Content",
          templates: [
            Schemas.utilityButtonSchema,
            Schemas.videoEmbedBlockSchema,
            Schemas.customImageBlockSchema,
            Schemas.contentCardBlockSchema,
          ],
        },
        {
          type: "string",
          name: "caseStudyUrl",
          label: "Case study URL",
        },
        {
          type: "object",
          name: "categories",
          label: "Categories",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.category?.name };
            },
          },
          fields: [
            {
              type: "reference",
              name: "category",
              label: "Category",
              collections: ["clientCategories"],
            },
          ],
        },
      ],
    },
  ],
};
