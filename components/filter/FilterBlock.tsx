import { MdLiveHelp } from "@react-icons/all-files/md/MdLiveHelp";
import { FilterGroup, type FilterGroupProps } from "./FilterGroup";

export const NO_SELECTION = -1;

interface FilterBlockProps {
  groups: FilterGroupProps[];
  children: React.ReactNode;
  sidebarChildren?: React.ReactNode;
}

export const FilterBlock = ({
  groups,
  children,
  sidebarChildren,
}: FilterBlockProps) => {
  return (
    <div className="mb-10 md:flex md:flex-row">
      <div className="md:mr-12 md:shrink-0 md:basis-64">
        <h3 className="mb-4 text-xl">
          <MdLiveHelp className="inline text-sswRed" /> I am looking for...
        </h3>

        {groups?.length > 0 ? (
          <>
            {groups.map((group, index) => (
              <FilterGroup key={index} {...group} />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}

        {sidebarChildren && <div className="mt-8">{sidebarChildren}</div>}
      </div>
      <div className="min-w-0 max-w-full shrink grow ">{children}</div>
    </div>
  );
};
