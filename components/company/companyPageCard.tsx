import Link from "next/link";
import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type CompanyIndexProps = {
  title: string;
  body: TinaMarkdownContent;
  pageURL: string;
};

const CompanyPageCard: FC<CompanyIndexProps> = ({ title, body, pageURL }) => {
  return (
    <Link
      href={pageURL ?? ""}
      className="unstyled no-underline"
      target="_blank"
      key={pageURL}
    >
      <article className="col-span-1 h-fit w-full rounded border-1 border-gray-300 bg-white p-4 shadow hover:border-sswBlack  dark:border-gray-700 dark:bg-gray-800 sm:h-44">
        <div className="prose">
          <h2 className="my-1">{title}</h2>
          <div className=" ">
            <TinaMarkdown content={body} />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CompanyPageCard;
