"use client";

type ArticleAuthorProps = {
  name?: string;
  position: string;
  image?: string;
};

const ArticleAuthor = ({ name, position, image }: ArticleAuthorProps) => {
  return (
    <div className="flex flex-row items-center gap-2 py-1">
      <Image
        src={image}
        alt="User Photo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="font-semibold uppercase">{name}</div>
      <div className="font-semibold">|</div>
      <div className="sm uppercase text-gray-500">{position}</div>
    </div>
  );
};

export default ArticleAuthor;
