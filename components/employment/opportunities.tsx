import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { UtilityButton } from "../blocks";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import {
  employmentType,
  jobStatus,
  locations,
} from "../util/constants/opportunity";

interface OpportunitiesProps {
  opportunities: OpportunityType[];
}

export interface OpportunityType {
  title: string;
  employmentType: string;
  status: string;
  locations: string[];
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
  }, [selectedLocation, selectedType, selectedStatus]);

  return (
    <div className="mb-10 md:flex md:flex-row">
      <div className="md:mr-16 md:shrink-0 md:basis-64">
        <h3 className="mb-4">
          <Image
            alt="Question Mark"
            src="/images/Employment/question.png"
            height={16}
            width={16}
            className="inline"
          />{" "}
          I am looking for...
        </h3>

        <FilterGroup
          selected={selectedLocation}
          setSelected={setSelectedLocation}
          options={locations}
          allText="All Locations"
        />
        <FilterGroup
          selected={selectedType}
          setSelected={setSelectedType}
          options={employmentType}
          allText="All Types"
        />
        <FilterGroup
          selected={selectedStatus}
          setSelected={setSelectedStatus}
          options={jobStatus}
          allText="All Positions"
        />
      </div>
      <div className="grow">
        {selectedStatus !== 1 &&
          !!filteredOpportunities.find((o) => o.status === jobStatus[0]) && (
            <>
              <h3>Available Positions</h3>
              {opportunities
                .filter((o) => o.status === jobStatus[0])
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
          !!filteredOpportunities.find((o) => o.status === jobStatus[1]) && (
            <>
              <h3>Filled Positions</h3>
              {opportunities
                .filter((o) => o.status === jobStatus[1])
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
      </div>
    </div>
  );
};

interface FilterGroupProps {
  selected: number;
  setSelected: (index: number) => void;
  allText: string;
  options: Array<string>;
}

const FilterGroup = ({
  selected,
  setSelected,
  options,
  allText,
}: FilterGroupProps) => {
  return (
    <div>
      <FilterOption
        index={-1}
        selected={selected}
        setSelected={setSelected}
        className={selected === -1 ? "font-bold" : ""}
      >
        {allText}
      </FilterOption>
      {options.map((curr, index) => (
        <FilterOption
          key={index}
          index={index}
          selected={selected}
          setSelected={setSelected}
          className={selected === index ? "font-bold" : ""}
        >
          {curr}
        </FilterOption>
      ))}
      <hr />
    </div>
  );
};

interface FilterOptionProps {
  index: number;
  selected: number;
  setSelected: (index: number) => void;
  children?: React.ReactNode;
  className?: string;
}

const FilterOption = ({
  index,
  children,
  selected,
  setSelected,
  className,
}: FilterOptionProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      className="m-0.5 inline-block w-64 cursor-pointer rounded-md py-1 hover:bg-gray-100 hover:text-sswRed"
      onClick={() => setSelected(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Transition
        className="inline"
        show={hovered || index === selected}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Image
          alt="Arrow"
          src="/images/Employment/arrow.png"
          height={10}
          width={10}
          className="absolute m-2 ml-1"
        />
      </Transition>
      <span className={classNames("ml-6", className)}>{children}</span>
    </div>
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
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
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
              {opportunity.status === jobStatus[1] && (
                <strong> *FILLED*</strong>
              )}
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
              <section className="prose max-w-full">
                <TinaMarkdown
                  content={opportunity.description}
                  components={componentRenderer}
                />
              </section>
              {!opportunity.hideApply && (
                <UtilityButton
                  className="mx-auto my-10 flex items-center"
                  buttonText="Apply Now"
                  link={sanitiseMailto(
                    `mailto:pennywalker@ssw.com.au?subject=Employment application for ${opportunity.title}`
                  )}
                />
              )}
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </div>
    </Transition>
  );
};
