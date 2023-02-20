import Link from "next/link";
import { FC } from "react";
import { BASE_URL } from "../util/constants";
import { TechnologyCardProps } from "./technologyCardTypes";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import styles from "./technologyCard.module.css";
import classnames from "classnames";

const TechnologyCard: FC<TechnologyCardProps> = ({
  name,
  readMoreSlug,
  thumbnail,
  body,
  className,
}) => {
  return (
    <div className={`col-span-12 ${className ?? ""}`}>
      <article
        className={classnames([
          styles["technology-card"],
          styles.card,
          "card mx-3.5 mb-15 mt-5 h-full p-10",
        ])}
        data-aos="flip-left"
      >
        {thumbnail && (
          <figure className="relative h-24">
            <Image
              src={thumbnail || "/images/ssw-logo.svg"}
              alt={thumbnail ? name : "SSW Consulting"}
              fill
              className="object-contain"
            ></Image>
          </figure>
        )}
        <TinaMarkdown content={body} />
        {readMoreSlug && (
          <Link className="text-md" href={BASE_URL + readMoreSlug}>
            Read More
          </Link>
        )}
      </article>
    </div>
  );
};

export default TechnologyCard;
