import classNames from "classnames";
import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import styles from "./mediaCard.module.css";

export type MediaCardProps = {
  type: "video" | "blog";
  content: TinaMarkdownContent | TinaMarkdownContent[];
};

const MediaCard: FC<MediaCardProps> = ({ type, content }) => {
  const bgImagesClasses = {
    video: "bg-[url('/images/icons/video-icon.svg')]",
    blog: "bg-[url('/images/icons/blog-post.svg')]",
  };

  return (
    <div
      data-aos="flip-left"
      className={classNames(
        bgImagesClasses[type],
        styles.card,
        "bg-[length:30px_25px] bg-[95%_92%] bg-no-repeat"
      )}
    >
      <TinaMarkdown content={content} />
    </div>
  );
};

export default MediaCard;
