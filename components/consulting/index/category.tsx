import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useMemo, useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import { PageCard } from "./pageCard";

export const Category = ({ tinaData, category, selectedTag, index }) => {
  const pages = useMemo(
    () => category.pages.filter((page) => page.tags.includes(selectedTag)),
    [category, selectedTag]
  );
  const categoryVisible = useMemo(
    () => pages.some((page) => page.isVisible),
    [pages]
  );

  const tinaCategory = tinaData.categories[index];

  return (
    <>
      <div
        className={classNames("lg:col-span-2", !categoryVisible && "hidden")}
      >
        <div>
          <hr className="my-5 border-gray-100" />
          <h2
            className="mt-0 text-sswRed"
            data-tina-field={tinaField(tinaCategory.category, "name")}
          >
            {category.name}
          </h2>
        </div>
      </div>
      {pages.map((page, pageIndex) => (
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
