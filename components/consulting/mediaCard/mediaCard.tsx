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
        "prose-technology-card thumbnail-card",
        bgImagesClasses[type],
      )}
    >
      <TinaMarkdown content={content} />
    </div>
  );
};

export default MediaCard;
