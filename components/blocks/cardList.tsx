import { Template } from "tinacms";
import CompanyPageCard from "../company/companyPageCard";
import { CustomLink } from "../customLink";

export const CardList = (prop) => {
  return (
    <div className="mx-auto mb-2 grid w-full max-w-9xl grid-cols-1 gap-3 rounded py-8 md:grid-cols-2 md:p-8">
      {prop.industryList
        ? prop.industryList.map((card) => {
            // TODO - refactor to reusable card component
            return (
              // <CustomLink
              //   href={card.url ?? ""}
              //   className="unstyled no-underline"
              //   key={card.url}
              // >
              <article className="col-span-1 size-full rounded border-1 border-gray-300 bg-white px-8 py-4 shadow hover:border-ssw-black  dark:border-gray-700 dark:bg-gray-800 ">
                <div className="prose prose-h2:text-3xl/9">
                  <h2 className="my-1">{card.title}</h2>
                  <div className="prose-p:mt-0">{card.blurb?.body ?? ""}</div>
                </div>
              </article>
              // </CustomLink>
            );
          })
        : ""}
    </div>
  );
};

export const cardListBlockSchema: Template = {
  name: "CardList",
  label: "Card List",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "object",
      label: "Industry List",
      name: "industryList",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Blurb",
          name: "blurb",
        },
        {
          name: "url",
          label: "Link",
          type: "string",
        },
      ],
    },
  ],
};
