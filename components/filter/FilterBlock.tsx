import { MdLiveHelp } from "react-icons/md";
import { FilterGroup, type FilterGroupProps } from "./FilterGroup";

interface FilterBlockProps {
  groups: FilterGroupProps[];
  children: React.ReactNode;
}

export const FilterBlock = ({ groups, children }: FilterBlockProps) => {
  return (
    <div className="mb-10 md:flex md:flex-row">
      <div className="md:mr-16 md:shrink-0 md:basis-64">
        <h3 className="mb-4">
          <MdLiveHelp className="inline text-sswRed" /> I am looking for...
        </h3>

        {groups.map((group, index) => (
          <FilterGroup key={index} {...group} />
        ))}
      </div>
      <div className="grow">{children}</div>
    </div>
  );
};
