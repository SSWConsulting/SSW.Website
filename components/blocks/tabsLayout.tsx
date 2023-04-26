import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../../components/util/section";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { bookingButtonSchema } from "./bookingButton";
import Button from "../button/button";
import { componentRenderer } from "./mdxComponentRenderer";

import { Template } from "tinacms";
import { useEffect, useRef, useState } from "react";

import classNames from "classnames";

export const TabsLayoutView = ({ data }) => {
  const [dataView, setDataView] = useState(null);
  const { tabList } = data;
  const [tabClicked, setTabClicked] = useState("");
  const [tab1, setTab1] = useState(true);
  const firstTabReference = useRef(null);
  const defaultOnButtonFocus = useRef(null);

  const buttonClick = () => {
    alert("button clickced");
  };
  const tabsdata = [
    {
      label: "I'm a Business Person",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "I'm a Developer",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  const func = (selectedTab) => {
    setTabClicked(selectedTab);
  };

  useEffect(() => {
    console.log("in the useEffect ");
    firstTabReference.current.click();
    setTabClicked(data.tab1);
  }, [data.tab1]);

  useEffect(() => {
    console.log("in the table Effect ");
    console.log(
      "🚀 ~ file: tabsLayout.tsx:61 ~ TabsLayoutView ~ tabClicked:",
      tabClicked
    );
  }, [tabClicked]);

  return (
    <Tabs id="custom-animation" value="html">
      <TabsBody>{renderTabPanels(data, true)}</TabsBody>
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-white-500 shadow-none text-white",
        }}
        defaultValue={data.tab1}
      >
        <Tab
          onClick={() => func(data.tab1)}
          ref={firstTabReference}
          key={data.tab1}
          value={data.tab1}
        >
          {renderTabButton(data.tab1, tabClicked)}
        </Tab>
        <Tab onClick={() => func(data.tab2)} key={data.tab2} value={data.tab2}>
          {renderTabButton(data.tab2, tabClicked)}
        </Tab>
      </TabsHeader>
      <TabsBody defaultValue={data.tab1}>{renderTabPanels(data)}</TabsBody>
    </Tabs>
  );
};

const renderTabPanels = (data, isHeading = false) => {
  return (
    <>
      <TabPanel className="text-white" key={data.tab1} value={data.tab1}>
        <TinaMarkdown
          content={isHeading ? data.heading1 : data.tab1Body}
          components={componentRenderer}
        />
      </TabPanel>
      <TabPanel className="text-white" key={data.tab2} value={data.tab2}>
        <TinaMarkdown
          content={isHeading ? data.heading2 : data.tab2Body}
          components={componentRenderer}
        />
      </TabPanel>
    </>
  );
};

const renderTabButton = (tab, tabClicked) => {
  return (
    <div className={classNames("flex w-full flex-col items-center")}>
      <Button
        ripple
        className={classNames(
          "mx-auto w-96 max-w-full bg-white p-3 text-red-500 opacity-100"
        )}
        defaultClass={tabClicked == tab ? "opacity-100" : "opacity-40"}
      >
        {tab}
      </Button>
    </div>
  );
};

export const tabsLayout: Template = {
  name: "TabsLayout",
  label: "Tabs",
  ui: {
    previewSrc: "/blocks/hero.png",
    itemProps: (item) => ({ label: item.items.header }),
  },
  fields: [
    {
      type: "string",
      name: "tab1",
      label: "Tab 1",
    },
    {
      type: "rich-text",
      name: "heading1",
      label: "Tab 1 Heading",
      templates: [videoEmbedBlockSchema, bookingButtonSchema],
    },
    {
      type: "rich-text",
      name: "tab1Body",
      label: "Tab 1 Body",
      templates: [videoEmbedBlockSchema, bookingButtonSchema],
    },
    {
      type: "string",
      name: "tab2",
      label: "Tab 2",
    },
    {
      type: "rich-text",
      name: "heading2",
      label: "Tab 2 Heading",
      templates: [videoEmbedBlockSchema, bookingButtonSchema],
    },
    {
      type: "rich-text",
      name: "tab2Body",
      label: "Tab 2 Body",
      templates: [videoEmbedBlockSchema, bookingButtonSchema],
    },
  ],
};
