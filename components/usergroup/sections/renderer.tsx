import { ActionSection } from "./action";
import { CommunitySection } from "./community";
import { VideosSection } from "./videos";

const componentMap = {
  ActionSection,
  CommunitySection,
  VideosSection,
};

export const SectionRenderer = ({ prefix, blocks }) => {
  return (
    <>
      {blocks?.map((block, index) => {
        const Component = componentMap[block.__typename?.replace(prefix, "")];
        if (!Component) return <></>;
        return <Component key={index + block.__typename} {...block} />;
      })}
    </>
  );
};
