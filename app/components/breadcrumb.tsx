import NextBreadcrumbs from "@marketsystems/nextjs13-appdir-breadcrumbs";
import React, { FC } from "react";
import { tinaField } from "tinacms/dist/react";

interface BreadcrumbsProps {
  additionalReplacements?: { from: string; to: string }[];
  path: string;
  title: string;
  seoSchema?: {
    title?: string;
  };
}
export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  additionalReplacements = [],
  path,
  title,
  seoSchema,
}) => {
  const listItemStyling =
    "breadcrumb_item inline text-xs text-gray-700 no-underline not-first:before:content-bread not-first:before:px-2 before:list-none";
  if (path && title) {
    additionalReplacements.push({ from: path, to: `${title}` });
  }
  return (
    <div
      {...(seoSchema
        ? { "data-tina-field": tinaField(seoSchema, "title") }
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
          { from: "clients", to: "Clients" },
          { from: "live", to: "Live" },
          { from: "logo", to: "Logo" },
          { from: "articles", to: "Articles" },
          ...additionalReplacements,
        ]}
        useDefaultStyle={true}
        activeItemClassName={listItemStyling}
        inactiveItemClassName={listItemStyling}
        listClassName="pl-0"
        rootLabel={"Home"}
      />
    </div>
  );
};
