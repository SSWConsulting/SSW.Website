import React from "react";
import NextBreadcrumbs from "nextjs-breadcrumbs2";

export const Breadcrumbs = (props) => {
  const listItemStyling = "breadcrumb_item inline text-xs text-gray-700 no-underline not-first:before:content-bread not-first:before:px-2 before:list-none"
  return (
    <>
      <NextBreadcrumbs 
        replaceCharacterList={[
            {from: "consulting", to: "Services"},
            {from: props.path, to: `${props.title} | ${props.suffix}`},
        ]}
        listClassName="pl-0"
        inactiveItemClassName={listItemStyling}
        activeItemClassName={listItemStyling}
        rootLabel={"Home"}
      />
    </>
  );
}
