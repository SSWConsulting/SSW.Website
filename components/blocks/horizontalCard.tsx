import Image from "next/image";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";

type CardType = {
  title: string;
  content: TinaMarkdownContent;
  thumbnail: string;
  link: string;
};

type HorizontalCardProps = {
  cardList: CardType[];
  button: {
    text: string;
    link: string;
  };
  showBottomBorder: boolean;
};

export const HorizontalCard = ({
  cardList,
  button,
  showBottomBorder,
}: HorizontalCardProps) => {
  if (!cardList) {
    <> </>;
  }
  return (
    <Container className="flex max-w-9xl flex-col">
      {cardList?.map((card, index) => (
        <Card key={index} card={card} showBottomBorder={showBottomBorder} />
      ))}
      {button?.link && (
        <div className="flex justify-start">
          <CustomLink
            className="unstyled rounded bg-sswRed px-3 py-2 text-xs font-normal text-white hover:bg-sswDarkRed"
            href={button.link}
          >
            {button?.text}
          </CustomLink>
        </div>
      )}
    </Container>
  );
};

interface CardProps {
  card: CardType;
  showBottomBorder: boolean;
}

const Card = ({ card, showBottomBorder }: CardProps) => {
  return (
    <CustomLink href={card?.link} className="unstyled no-underline">
      <article className="my-2.5 rounded border-1 border-gray-300 bg-white p-2 shadow hover:border-ssw-black dark:border-gray-700 dark:bg-gray-800">
        <div className="">
          {card.thumbnail && (
            <div className="flex h-auto min-w-fit">
              <Image
                className={"rounded-md"}
                src={card?.thumbnail}
                alt={`${card?.title} card`}
                width={90}
                height={90}
                sizes="75w (max-width: 768px) 25vw"
              />
            </div>
          )}
          <div className="justify-center px-3">
            <h2 className="m-0 py-1  font-bold text-black">{card?.title}</h2>
          </div>
          <div className="justify-center px-3">
            <TinaMarkdown content={card?.content} />
          </div>
        </div>
      </article>
    </CustomLink>
  );
};

export const horizontalBlockSchema: Template = {
  name: "HorizontalCard",
  label: "Horizontal Card",
  ui: {},
  fields: [
    {
      type: "object",
      label: "Cards",
      name: "cardList",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Content",
          name: "content",
        },
        {
          type: "image",
          label: "Thumbnail",
          name: "thumbnail",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
      ],
    },
    {
      type: "boolean",
      label: "Show Bottom Border",
      name: "showBottomBorder",
    },
    {
      type: "object",
      label: "Button",
      name: "button",
      fields: [
        {
          type: "string",
          label: "Text",
          name: "text",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
      ],
    },
  ],
};
