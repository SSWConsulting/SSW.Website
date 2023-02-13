import classNames from "classnames";
import { FC } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export type MediaCardProps = {
  type: "video" | "blog";
  content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
        "card",
        "thumbnail-card",
        "w-96"
      )}
    >
      <TinaMarkdown content={content} />
    </div>
  );
};

export default MediaCard;
