import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { CustomBookingButtonSchema } from "./customBookingButton";
import Button from "../button/button";
import { componentRenderer } from "./mdxComponentRenderer";

import { Template } from "tinacms";
import { useEffect, useRef, useState } from "react";

import classNames from "classnames";

const fixedTabsBlocks: Template[] = [
  videoEmbedBlockSchema,
  CustomBookingButtonSchema,
];

export const FixedTabsLayout = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const firstTabReference = useRef(null);
  const bodyTextColor = "text-white"

  const onTabClicked = (selectedTab) => {
    setSelectedTab(selectedTab);
  };

  useEffect(() => {
    firstTabReference.current.click();
    onTabClicked(data.firstTab);
  }, [data.firstTab]);

  return (
    <Tabs id="custom-animation" value="html">
      <TabsBody>{renderTabPanels(data, bodyTextColor, true)}</TabsBody>
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-transparent",
        }}
      >
        <Tab
          onClick={() => onTabClicked(data.firstTab)}
          ref={firstTabReference}
          key={data.firstTab}
          value={data.firstTab}
        >
          {renderTabButton(data.firstTab, selectedTab)}
        </Tab>
        <Tab
          onClick={() => onTabClicked(data.secondTab)}
          key={data.secondTab}
          value={data.secondTab}
        >
          {renderTabButton(data.secondTab, selectedTab)}
        </Tab>
      </TabsHeader>
      <TabsBody>{renderTabPanels(data, bodyTextColor)}</TabsBody>
    </Tabs>
  );
};

const renderTabPanels = (data, textColor, isHeading = false) => {
  return (
    <>
      <TabPanel className={textColor} key={data.firstTab} value={data.firstTab}>
        <TinaMarkdown
          content={isHeading ? data.firstHeading : data.firstBody}
          components={componentRenderer}
        />
      </TabPanel>
      <TabPanel
        className={textColor}
        key={data.secondTab}
        value={data.secondTab}
      >
        <TinaMarkdown
          content={isHeading ? data.secondHeading : data.secondBody}
          components={componentRenderer}
        />
      </TabPanel>
    </>
  );
};

const renderTabButton = (tab, selectedTab) => {
  return (
    <div className={classNames("flex w-full flex-col items-center")}>
      <Button
        ripple
        className={classNames(
          "mx-auto w-96 max-w-full bg-white p-3 text-red-500"
        )}
        defaultClass={selectedTab == tab ? "opacity-100" : "opacity-40"}
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
