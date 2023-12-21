import { TinaMarkdown } from "tinacms/dist/rich-text";
import Button from "../button/button";
import { componentRenderer } from "./mdxComponentRenderer";
import { videoEmbedBlockSchema } from "./videoEmbed";

import { useEffect, useState } from "react";
import { RiTeamLine } from "react-icons/ri";
import { VscPerson } from "react-icons/vsc";
import type { Template } from "tinacms";

import classNames from "classnames";
import { getYoutubePlaylist } from "../../services/server/youtube";
import { bookingButtonSchema } from "../bookingButton/bookingButton";
import { VideoCard } from "../util/videoCards";
import { expertBlockSchema } from "./expertBlock";

export const iconMap = {
  RiTeamLine: (props) => <RiTeamLine className={props.className} />,
  VscPerson: (props) => <VscPerson className={props.className} />,
};

const fixedTabsBlocks: Template[] = [
  videoEmbedBlockSchema,
  bookingButtonSchema,
  expertBlockSchema,
];

export const FixedTabsLayout = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [playListVideosLinks, setPlayListVideosLinks] = useState([]);

  useEffect(() => {
    getPlayList();
  }, []);

  const getPlayList = async () => {
    const videos = await getYoutubePlaylist(
      "PLpiOR7CBNvlovBGeEB3vVhYzVWYnkFpA-",
      6
    );

    console.log(
      "🚀 ~ file: fixedTabsLayout.tsx:42 ~ getPlayList ~ videos:",
      videos
    );
    setPlayListVideosLinks(videos);
  };

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

      {selectedTab === data.firstTab &&
        renderTinaMarkDown(data.firstBody, 1, playListVideosLinks)}
      {selectedTab === data.secondTab &&
        renderTinaMarkDown(data.secondBody, 2, playListVideosLinks)}
    </>
  );
};

const renderTinaMarkDown = (data, tab = 1, playListVideosLinks = []) => {
  return (
    <>
      <TinaMarkdown content={data} components={componentRenderer} />
      {tab === 2 && (
        <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
          {playListVideosLinks?.map((video, index) => (
            <div key={index}>
              <VideoCard {...video} theme="light" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

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
