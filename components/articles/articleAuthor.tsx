"use client";

type ArticleAuthorProps = {
  name?: string;
  position: string;
  image?: string;
};

const ArticleAuthor = ({ name, position, image }: ArticleAuthorProps) => {
  return (
    <div className="flex flex-row items-center gap-2 py-1">
      <img src={image} alt="User Photo" className="h-10 w-10 rounded-full" />
      <div className="font-semibold uppercase">{name}</div>
      <div className="font-semibold">|</div>
      <div className="text-gray-500 text-sm uppercase">{position}</div>
    </div>
  );
};

export default ArticleAuthor;
