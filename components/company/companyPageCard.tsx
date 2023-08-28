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
  const { title, pageURL, body }: CompanyIndexProps = data;

  return (
    <Link href={pageURL ?? ""} className="unstyled no-underline" key={pageURL}>
      <article className="col-span-1 h-full w-full rounded border-1 border-gray-300 bg-white px-8 py-4 shadow hover:border-sswBlack  dark:border-gray-700 dark:bg-gray-800 ">
        <div className="prose prose-h2:text-3xl/9 prose-h2:font-normal">
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
            className="prose-p:mt-0"
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
