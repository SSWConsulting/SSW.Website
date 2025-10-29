import classNames from "classnames";
import React, { useMemo } from "react";
import { tinaField } from "tinacms/dist/react";
import { PageCard } from "./pageCard";

export const Category = ({ tinaData, category, selectedTag, index }) => {
  console.log("category", category);

  const tinaCategory = tinaData.categories[index];

  return (
    <>
      <div className={classNames("lg:col-span-2")}>
        <div>
          {index > 0 && <hr className="my-5 border-gray-100" />}
          <h2
            className="mt-0 text-sswRed"
            data-tina-field={tinaField(tinaCategory.category, "name")}
          >
            {category.name} ({index})
          </h2>
        </div>
      </div>
      {category.pages.map((page, pageIndex) => (
        <PageCard
          key={page.title}
          page={page}
          category={tinaCategory}
          pageIndex={pageIndex}
        />
      ))}
    </>
  );
};
