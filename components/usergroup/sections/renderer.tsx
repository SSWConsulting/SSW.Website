import { CommunitySection } from "./community";

const componentMap = {
  CommunitySection,
};

export const SectionRenderer = ({ prefix, blocks }) => {
  return (
    <>
      {blocks?.map((block, index) => {
        const Component = componentMap[block.__typename?.replace(prefix, "")];
        return <Component key={index + block.__typename} {...block} />;
      })}
    </>
  );
};
