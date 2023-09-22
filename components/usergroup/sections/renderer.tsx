import { ActionSection } from "./action";
import { CommunitySection } from "./community";

const componentMap = {
  ActionSection,
  CommunitySection,
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
