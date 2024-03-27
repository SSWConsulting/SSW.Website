import { Template } from "tinacms";

export type SectionHeaderProps = {
  headerText: string;
};

export const SectionHeader = (props: SectionHeaderProps) => {
  const { headerText } = props;

  return (
    <h3
      id={headerText.toLowerCase().replaceAll(" ", "-")}
      className="bg-gray-600 p-2 text-base text-white"
    >
      {headerText}
    </h3>
  );
};

export const sectionHeaderSchema: Template = {
  name: "SectionHeader",
  label: "Section Header",
  ui: {
    itemProps: (item) => ({ label: item?.headerText }),
  },
  fields: [
    {
      type: "string",
      label: "Header Text",
      name: "headerText",
    },
  ],
};
