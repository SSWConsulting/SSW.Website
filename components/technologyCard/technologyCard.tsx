import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { TechnologyCardProps } from "./technologyCardTypes";
import { tinaField } from "tinacms/dist/react";

const TechnologyCard: FC<TechnologyCardProps> = (props) => {
  const { name, readMoreSlug, thumbnail, body } = props;
  return (
    <article
      className="mx-3.5 mb-15 mt-5 flex h-full flex-col border-b-2 border-solid border-sswRed bg-gray-75 px-16 py-11"
      data-aos="flip-left"
    >
      {thumbnail ? (
        <figure
          className="relative h-24"
          data-tina-field={tinaField(props, "thumbnail")}
        >
          <Image
            src={thumbnail || "/images/ssw-logo.svg"}
            alt={thumbnail ? name : "SSW Consulting"}
            fill
            className="object-contain"
          ></Image>
        </figure>
      ) : (
        <h2 data-tina-field={tinaField(props, "name")}>{name}</h2>
      )}

      <div
        data-tina-field={tinaField(props, "body")}
        className="prose max-w-full grow prose-p:text-justify prose-strong:text-sswRed prose-ul:grid prose-ul:grid-flow-col prose-ul:grid-rows-12 prose-ul:text-left descendant-div:!m-0"
      >
        <TinaMarkdown content={body} />
      </div>
      {readMoreSlug && (
        <Link
          className="text-md"
          href={readMoreSlug}
          data-tina-field={tinaField(props, "readMoreSlug")}
        >
          Read More
        </Link>
      )}
    </article>
  );
};

export default TechnologyCard;
