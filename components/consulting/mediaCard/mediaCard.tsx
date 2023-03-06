import classNames from "classnames";
import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type MediaCardProps = {
  type: "video" | "blog";
  content: TinaMarkdownContent | TinaMarkdownContent[];
};

const MediaCard: FC<MediaCardProps> = ({ type, content }) => {
  const bgImagesClasses = {
    video: "bg-card-video",
    blog: "bg-card-blog",
  };

  return (
    <div
      data-aos="flip-left"
      className={classNames(
        "mx-3.5 mb-15 mt-5 flex h-full flex-col border-b-2 border-solid border-sswRed bg-gray-75 py-11 px-16",
        "bg-no-repeat bg-right-bottom-4 bg-[length:30px_25px]",
        bgImagesClasses[type],
      )}
    >
      <TinaMarkdown content={content} />
    </div>
  );
};

export default MediaCard;
