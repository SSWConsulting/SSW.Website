import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { contentCardBlockSchema } from "../../components/blocks/contentCard.schema";
import { customImageBlockSchema } from "../../components/blocks/customImage";
import { videoEmbedBlockSchema } from "../../components/blocks/videoEmbed.schema";
import { utilityButtonSchema } from "../../components/button/utilityButton";
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
  // The story card's editorial copy and media. All optional: a client
  // without them falls back to its name, an excerpt of its content and its
  // logo.
  headline?: string;
  summary?: string;
  service?: string;
  image?: string;
  featured?: boolean;
  categories: {
    category: Category;
  }[];
};

// The kinds of work a client story can be filtered by on /company/clients.
export const CLIENT_SERVICES = [
  "AI development",
  "Business applications",
  "Cloud & DevOps",
  "Mobile development",
  "Web development",
];

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
  const clientCategories = categories.map(
    (category) => category?.category?.name
  );
  return (
    <Container>
      <ClientsFilter clients={clients} categories={clientCategories} />
    </Container>
  );
};

const formatCategory = (category: string) => {
  return category?.split("/")[3].replace(".json", "");
};

const clientListBlocks: Template[] = [
  utilityButtonSchema,
  videoEmbedBlockSchema,
  customImageBlockSchema,
  contentCardBlockSchema,
];

export const clientListSchema: Template = {
  label: "Client List",
  name: "ClientList",
  ui: {
    previewSrc: "/images/thumbs/tina/clients-list.jpg",
  },
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
          const label = formatCategory(item?.category);
          return {
            label: label || "New category (click to select a category)",
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
        previewSrc: "/images/thumbs/tina/clients-list.jpg",
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
          templates: [...clientListBlocks],
        },
        {
          type: "string",
          name: "caseStudyUrl",
          label: "Case study URL",
        },
        {
          type: "boolean",
          name: "featured",
          label: "Featured",
          description: "Featured stories are listed first.",
        },
        {
          type: "string",
          name: "headline",
          label: "Story headline",
          description:
            "The card's headline, e.g. 'Making hearing care easier to access.' Falls back to the client name.",
        },
        {
          type: "string",
          name: "summary",
          label: "Story summary",
          description:
            "One or two sentences for the card. Falls back to the start of the content.",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "service",
          label: "Service",
          options: CLIENT_SERVICES,
        },
        {
          type: "image",
          name: "image",
          label: "Story image",
          description:
            "A landscape photo or screenshot for the card. Falls back to the logo.",
        },
        {
          type: "object",
          name: "categories",
          label: "Categories",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: formatCategory(item?.category) };
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
