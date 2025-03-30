import classNames from "classnames";
import type { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { CustomImage, CustomImageProps } from "./customImage";
import { VerticalListItem } from "./verticalListItem";
import { VideoEmbed } from "./videoEmbed";

export type ContentCardProps = {
  data: {
    content: TinaMarkdownContent;
    prose?: boolean;
    centerAlignedText?: boolean;
  };
};

const contentCardComponentRenderer: Components<{
  CustomImage: CustomImageProps;
  VerticalListItem: {
    icon: string;
    content: string;
  };
  VideoEmbed: {
    url: string;
  };
}> = {
  CustomImage: (props) => <CustomImage data={props} />,
  VerticalListItem: (props) => <VerticalListItem data={props} />,
  VideoEmbed: (props) => <VideoEmbed data={props} />,
};

export const ContentCard = ({ data }: ContentCardProps) => {
  const component = (
    <article className="relative mx-auto my-5 size-full border-b-2 border-solid border-sswRed bg-gray-75 p-10">
      <TinaMarkdown
        content={data.content}
        components={contentCardComponentRenderer}
      />
    </article>
  );

  if (!data.prose) {
    return component;
  }

  return (
    <>
      <div
        className={classNames(
          "prose max-w-full grow",
          data.centerAlignedText
            ? "prose-p:text-center"
            : "prose-p:text-justify"
        )}
      >
        {component}
      </div>
    </>
  );
};
