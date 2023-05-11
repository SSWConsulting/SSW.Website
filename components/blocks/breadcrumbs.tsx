import React, { FC } from "react";
import NextBreadcrumbs from "nextjs-breadcrumbs2";

interface BreadcrumbsProps {
  path: string;
  suffix: string;
  title: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const listItemStyling =
    "breadcrumb_item inline text-xs text-gray-700 no-underline not-first:before:content-bread not-first:before:px-2 before:list-none";
  return (
    <>
      <NextBreadcrumbs
        replaceCharacterList={[
          { from: "consulting", to: "Services" },
					{ from: "products", to: "Products" },
          { from: "offices", to: "Offices" },
          { from: "training", to: "Training" },
          { from: props.path, to: `${props.title}` },
        ]}
        activeItemClassName={listItemStyling}
        inactiveItemClassName={listItemStyling}
        listClassName="pl-0"
        rootLabel={"Home"}
      />
    </>
  );
};
