"use client";
import Image from "next/image";
import Link from "next/link";

type ArticleAuthorProps = {
  name?: string;
  position: string;
  image?: string;
  url?: string;
};

const ArticleAuthor = ({
  name,
  position,
  image,
  url,
}: ArticleAuthorProps) => {
  return (
    <>
      {image && (
        <Image
          src={image}
          alt="User Photo"
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
      )}
      <div className="font-semibold uppercase">
        {url ? (
          <Link className="no-underline" href={url}>
            {name}
          </Link>
        ) : (
          <>{name}</>
        )}
      </div>

      {position && (
        <>
          <div className="font-semibold">|</div>
          <div className="text-sm uppercase text-gray-500">{position}</div>
        </>
      )}
    </>
  );
};

export default ArticleAuthor;
