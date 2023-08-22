import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { UtilityButton } from "../blocks";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import {
  EmploymentType,
  JobStatus,
  Locations,
  employmentType,
  jobStatus,
  locations,
} from "../util/constants/opportunity";
import { FilterBlock } from "./FilterBlock";

const AVAILABLE = jobStatus[0];
const FILLED = jobStatus[1];

interface OpportunitiesProps {
  opportunities: OpportunityType[];
}

export interface OpportunityType {
  title: string;
  employmentType: EmploymentType;
  status: JobStatus;
  locations: Locations;
  hideApply?: boolean;
  description: TinaMarkdownContent;
}

export const Opportunities = ({ opportunities }: OpportunitiesProps) => {
  const [selectedLocation, setSelectedLocation] = useState<number>(-1);
  const [selectedType, setSelectedType] = useState<number>(-1);
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const [filteredOpportunities, setFilteredOpportunities] = useState<
    OpportunityType[]
  >([...opportunities]);

  useEffect(() => {
    const filtered = opportunities.filter(
      (opportunity) =>
        (selectedLocation === -1 ||
          opportunity.locations.includes(locations[selectedLocation])) &&
        (selectedType === -1 ||
          opportunity.employmentType === employmentType[selectedType]) &&
        (selectedStatus === -1 ||
          opportunity.status === jobStatus[selectedStatus])
    );
    setFilteredOpportunities(filtered);
  }, [opportunities, selectedLocation, selectedType, selectedStatus]);

  return (
    <FilterBlock
      groups={[
        {
          selected: selectedLocation,
          setSelected: setSelectedLocation,
          options: locations,
          allText: "All Locations",
        },
        {
          selected: selectedType,
          setSelected: setSelectedType,
          options: employmentType,
          allText: "All Types",
        },
        {
          selected: selectedStatus,
          setSelected: setSelectedStatus,
          options: jobStatus,
          allText: "All Positions",
        },
      ]}
    >
      {selectedStatus !== 1 &&
        filteredOpportunities.some((o) => o.status === AVAILABLE) && (
          <>
            <h3>Available Positions</h3>
            {opportunities
              .filter((o) => o.status === AVAILABLE)
              .map((opportunity, index) => (
                <OpportunityDropdown
                  visible={
                    !!filteredOpportunities.find(
                      (o) => o.title === opportunity.title
                    )
                  }
                  key={index}
                  opportunity={opportunity}
                />
              ))}
          </>
        )}

      {selectedStatus !== 0 &&
        filteredOpportunities.some((o) => o.status === FILLED) && (
          <>
            <h3>Filled Positions</h3>
            {opportunities
              .filter((o) => o.status === FILLED)
              .map((opportunity, index) => (
                <OpportunityDropdown
                  visible={
                    !!filteredOpportunities.find(
                      (o) => o.title === opportunity.title
                    )
                  }
                  key={index}
                  opportunity={opportunity}
                />
              ))}
          </>
        )}

      {filteredOpportunities.length === 0 && (
        <p className="text-gray-500">No positions found.</p>
      )}
    </FilterBlock>
  );
};

interface OpportunityDropdownProps {
  opportunity: OpportunityType;
  className?: string;
  visible: boolean;
}

const OpportunityDropdown = ({
  opportunity,
  className,
  visible,
}: OpportunityDropdownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const sanitiseMailto = (title: string) => {
    return title.replace(/&/g, "%26");
  };

  return (
    <Transition
      show={visible}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classNames("my-3 w-full", className)}>
        <Disclosure>
          <Disclosure.Button
            className="relative clear-both inline-block w-full cursor-pointer border-1 border-gray-300 bg-gray-75 px-4 py-2 hover:bg-white"
            onClick={() => setIsOpened((curr) => !curr)}
          >
            <h2 className="my-0 text-base md:float-left">
              {opportunity.title}
            </h2>
            <span className="md:float-right">
              <FaMapMarkerAlt className="inline" />{" "}
              {opportunity.locations?.join(", ")}
              {opportunity.status === FILLED && <strong> *FILLED*</strong>}
            </span>
          </Disclosure.Button>

          <Transition
            show={isOpened}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="border-1 border-gray-300 p-4">
              <section className="prose prose-opportunity max-w-full">
                <TinaMarkdown
                  content={opportunity.description}
                  components={componentRenderer}
                />
              </section>
              {!opportunity.hideApply && (
                <UtilityButton
                  className="mx-auto my-10 flex items-center"
                  buttonText="Apply Now"
                  link={`mailto:pennywalker@ssw.com.au?subject=SSW Employment Application for ${sanitiseMailto(
                    opportunity.title
                  )}&cc=luciasirtori@ssw.com.au`}
                />
              )}
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </div>
    </Transition>
  );
};
