import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { companyIndexSchemaConstants } from "../../.tina/collections/company";

export type CompanyIndexProps = {
  title: string;
  body: TinaMarkdownContent;
  pageURL: string;
};

const CompanyPageCard = ({ data, schema, index }) => {
  const { title, pageURL, body } = data;

  return (
    <Link
      href={pageURL ?? ""}
      className="unstyled no-underline"
      target="_blank"
      key={pageURL}
    >
      <article className="col-span-1 h-fit w-full rounded border-1 border-gray-300 bg-white p-4 shadow hover:border-sswBlack  dark:border-gray-700 dark:bg-gray-800 sm:h-44">
        <div className="prose">
          <h2
            className="my-1"
            data-tina-field={tinaField(
              schema[index],
              companyIndexSchemaConstants.companyPages.title
            )}
          >
            {title}
          </h2>
          <div
            className=" "
            data-tina-field={tinaField(
              schema[index],
              companyIndexSchemaConstants.companyPages.body
            )}
          >
            <TinaMarkdown content={body} />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CompanyPageCard;
