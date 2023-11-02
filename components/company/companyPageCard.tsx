import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { companyIndexSchemaConstants } from "../../.tina/collections/company";

export type CompanyIndexProps = {
  title: string;
  body: TinaMarkdownContent;
  pageURL: string;
  isExternal: boolean;
};

const CompanyPageCard = ({ data, schema, index }) => {
  const { title, pageURL, body, isExternal }: CompanyIndexProps = data;

  return isExternal ? (
    <a href={pageURL ?? ""} className="unstyled no-underline" key={pageURL}>
      <CompanyPageCardContent
        title={title}
        body={body}
        schema={schema}
        index={index}
      />
    </a>
  ) : (
    <Link href={pageURL ?? ""} className="unstyled no-underline" key={pageURL}>
      <CompanyPageCardContent
        title={title}
        body={body}
        schema={schema}
        index={index}
      />
    </Link>
  );
};

const CompanyPageCardContent = ({ title, body, schema, index }) => {
  return (
    <article className="col-span-1 h-full w-full rounded border-1 border-gray-300 bg-white px-8 py-4 shadow hover:border-ssw-black  dark:border-gray-700 dark:bg-gray-800 ">
      <div className="prose prose-h2:text-3xl/9">
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
  );
};

export default CompanyPageCard;
