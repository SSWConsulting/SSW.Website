import Image from "next/image";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
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
};

export const HorizontalCard = (props: HorizontalCardProps) => {
  const { cardList, button } = props;
  if (!cardList) {
    <> </>;
  }
  return (
    <Container className="mt-2 flex max-w-9xl flex-col">
      {cardList?.map((card, index) => (
        <Card key={index} {...card} />
      ))}
      {button?.link && (
        <div className="mt-2.5 flex justify-start">
          <CustomLink
            className="unstyled rounded bg-sswRed px-3 py-2 font-normal text-white hover:bg-sswDarkRed"
            href={button.link}
            data-tina-field={tinaField(props, "button")}
            target="_blank"
          >
            {button?.text}
          </CustomLink>
        </div>
      )}
    </Container>
  );
};

const Card = (card: CardType) => {
  return (
    <CustomLink href={card?.link} className="unstyled no-underline">
      <article className="my-2.5 rounded border-1 border-gray-300 bg-white p-4 shadow hover:border-ssw-black dark:border-gray-700 dark:bg-gray-800">
        <div className="block">
          {card.thumbnail && (
            <div
              className="float-left pr-4"
              data-tina-field={tinaField(card, "thumbnail")}
            >
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
          <span>
            <h3
              className="m-0 pb-4 font-bold text-black"
              data-tina-field={tinaField(card, "title")}
            >
              {card?.title}
            </h3>
          </span>
          <span data-tina-field={tinaField(card, "content")}>
            <TinaMarkdown content={card?.content} />
          </span>
        </div>
      </article>
    </CustomLink>
  );
};

export const horizontalBlockSchema: Template = {
  name: "HorizontalCard",
  label: "Horizontal Card",
  ui: {
    previewSrc: "/images/thumbs/tina/horizontal-card.jpg",
  },
  fields: [
    {
      type: "object",
      label: "Cards",
      name: "cardList",
      list: true,
      ui: {
        itemProps(item) {
          return {
            label: item?.title,
          };
        },
      },
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "events",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
      ],
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
