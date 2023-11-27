import NextBreadcrumbs from "nextjs-breadcrumbs2";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";

interface BreadcrumbsProps {
  path: string;
  suffix: string;
  title: string;
  seoSchema?: {
    title?: string;
  };
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const listItemStyling =
    "breadcrumb_item inline text-xs text-gray-700 no-underline not-first:before:content-bread not-first:before:px-2 before:list-none";

  return (
    <div
      {...(props.seoSchema
        ? { "data-tina-field": tinaField(props.seoSchema, "title") }
        : {})}
    >
      <NextBreadcrumbs
        replaceCharacterList={[
          { from: "consulting", to: "Services" },
          { from: "products", to: "Products" },
          { from: "offices", to: "Offices" },
          { from: "training", to: "Training" },
          { from: "employment", to: "Employment" },
          { from: "video-production", to: "Video Production" },
          { from: "Training-videos", to: "Training Videos" },
          { from: "industry", to: "Industry" },
          { from: "company", to: "Company" },
          { from: "events", to: "Events" },
          { from: "partners", to: "Partners" },
          { from: "netug", to: ".NET User Group" },
          { from: "case-study", to: "Case-Study" },
          { from: props.path, to: `${props.title}` },
        ]}
        activeItemClassName={listItemStyling}
        inactiveItemClassName={listItemStyling}
        listClassName="pl-0"
        rootLabel={"Home"}
      />
    </div>
  );
};
