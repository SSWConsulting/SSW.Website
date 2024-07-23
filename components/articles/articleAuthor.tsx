"use client";

import Image from "next/image";

type ArticleAuthorProps = {
  name?: string;
  position: string;
  image?: string;
};

const ArticleAuthor = ({ name, position, image }: ArticleAuthorProps) => {
  return (
    <div className="flex flex-row items-center gap-2 py-1">
      {image && (
        <Image
          src={image}
          alt="User Photo"
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
      )}
      <div className="font-semibold uppercase">{name}</div>

      {position && (
        <>
          <div className="font-semibold">|</div>
          <div className="text-sm uppercase text-gray-500">{position}</div>
        </>
      )}
    </div>
  );
};

export default ArticleAuthor;
