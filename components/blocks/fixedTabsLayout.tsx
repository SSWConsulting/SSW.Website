import { TinaMarkdown } from "tinacms/dist/rich-text";
import { videoEmbedBlockSchema } from "./videoEmbed";
import Button from "../button/button";
import { componentRenderer } from "./mdxComponentRenderer";

import { Template } from "tinacms";
import { useEffect, useState } from "react";

import classNames from "classnames";
import { bookingButtonSchema } from "../bookingButton/bookingButton";

const fixedTabsBlocks: Template[] = [
  videoEmbedBlockSchema,
  bookingButtonSchema,
];

export const FixedTabsLayout = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState("");

  const onTabBtnClicked = (selectedTab) => {
    setSelectedTab(selectedTab);
  };

  useEffect(() => {
    onTabBtnClicked(data.secondTab);
  }, [data.secondTab]);

  useEffect(() => {
    onTabBtnClicked(data.firstTab);
  }, [data.firstTab]);

  return (
    <>
      {selectedTab === data.firstTab && renderTinaMarkDown(data.firstHeading)}
      {selectedTab === data.secondTab && renderTinaMarkDown(data.secondHeading)}

      <div className="flex flex-col md:my-5 md:flex-row">
        {renderTabButton(data.firstTab, selectedTab, onTabBtnClicked)}
        {renderTabButton(data.secondTab, selectedTab, onTabBtnClicked)}
      </div>

      {selectedTab === data.firstTab && renderTinaMarkDown(data.firstBody)}
      {selectedTab === data.secondTab && renderTinaMarkDown(data.secondBody)}
    </>
  );
};

const renderTinaMarkDown = (data) => (
  <TinaMarkdown content={data} components={componentRenderer} />
);

const renderTabButton = (tab, selectedTab, onTabBtnClicked) => {
  return (
    <div className={classNames("my-3 flex w-full flex-col items-center")}>
      <Button
        ripple
        className={classNames(
          "mx-auto w-96 max-w-full bg-white p-3 text-red-500"
        )}
        defaultClass={selectedTab == tab ? "opacity-100" : "opacity-40"}
        onClick={() => onTabBtnClicked(tab)}
      >
        {tab}
      </Button>
    </div>
  );
};

export const fixedTabsLayoutSchema: Template = {
  name: "FixedTabsLayout",
  label: "Fixed Tabs Layout",
  fields: [
    {
      type: "string",
      name: "firstTab",
      label: "First Tab",
    },
    {
      type: "rich-text",
      name: "firstHeading",
      label: "First Heading",
      templates: [...fixedTabsBlocks],
    },
    {
      type: "rich-text",
      name: "firstBody",
      label: "First Body",
      templates: [...fixedTabsBlocks],
    },
    {
      type: "string",
      name: "secondTab",
      label: "Second Tab",
    },
    {
      type: "rich-text",
      name: "secondHeading",
      label: "Second Heading",
      templates: [...fixedTabsBlocks],
    },
    {
      type: "rich-text",
      name: "secondBody",
      label: "Second Body",
      templates: [...fixedTabsBlocks],
    },
  ],
};
