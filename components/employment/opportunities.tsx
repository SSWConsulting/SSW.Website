import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import {
  employmentType,
  jobStatus,
  locations,
} from "../util/constants/opportunity";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { UtilityButton } from "../blocks";
import classNames from "classnames";
import Image from "next/image";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { Transition } from "@headlessui/react";

interface OpportunitiesProps {
  opportunities: OpportunityType[];
}

export interface OpportunityType {
  title: string;
  employmentType: string;
  status: string;
  locations: string[];
  description: TinaMarkdownContent;
}

export const Opportunities = ({ opportunities }: OpportunitiesProps) => {
  const [selectedLocation, setSelectedLocation] = useState<number>(-1);
  const [selectedType, setSelectedType] = useState<number>(-1);
  const [selectedStatus, setSelectedStatus] = useState<number>(-1);

  const [filteredOpportunities, setFilteredOpportunities] = useState<OpportunityType[]>([...opportunities]);

  useEffect(() => {
    const filtered = opportunities.filter(opportunity => 
      (selectedLocation === -1 || opportunity.locations.includes(locations[selectedLocation])) &&
      (selectedType === -1 || opportunity.employmentType === employmentType[selectedType]) &&
      (selectedStatus === -1 || opportunity.status === jobStatus[selectedStatus])
    );
    setFilteredOpportunities(filtered);
  }, [selectedLocation, selectedType, selectedStatus]);

  return (
    <div className="flex flex-row">
      <div className="shrink-0 basis-64">
        
        <h3><Image 
          alt="Question Mark" 
          src="/images/employment/question.png" 
          height={16} 
          width={16} 
          className="inline"
        /> I am looking for...</h3>
        
        <FilterGroup selected={selectedLocation} setSelected={setSelectedLocation} options={locations} allText="All Locations" />
        <FilterGroup selected={selectedType} setSelected={setSelectedType} options={employmentType} allText="All Types" />
        <FilterGroup selected={selectedStatus} setSelected={setSelectedStatus} options={jobStatus} allText="All Positions" />
      </div>
      <div className="grow">
        <h3>Available Positions</h3>
        {opportunities.map((opportunity, index) => (
          <OpportunityDropdown visible={!!filteredOpportunities.find(o => o.title === opportunity.title)} key={index} opportunity={opportunity} />
        ))}
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

const FilterGroup = ({ selected, setSelected, options, allText }: FilterGroupProps) => {
  return (
    <>
      <FilterOption index={-1} setSelected={setSelected} className={selected === -1 ? "font-bold" : ""}>{allText}</FilterOption>
      {options.map((curr, index) => (
        <FilterOption 
          key={index} 
          index={index} 
          setSelected={setSelected}
          className={selected === index ? "font-bold" : ""}
        >
          {curr}
        </FilterOption>
      ))}
      <hr />
    </>
  )
}

interface FilterOptionProps {
  index: number;
  setSelected: (index: number) => void;
  children?: React.ReactNode;
  className?: string;
}

const FilterOption = ({ index, children, setSelected, className }: FilterOptionProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div className="w-48 inline-block hover:bg-gray-200 m-1 rounded-sm cursor-pointer hover:text-sswRed" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Transition
        className="inline"
        show={hovered || index === -1}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Image 
          alt="Arrow" 
          src="/images/employment/arrow.png" 
          height={10} 
          width={10} 
          className="inline mr-4"
        />
      </Transition>
      <span className={classNames(" ", className)} onClick={() => setSelected(index)}>
        {children}
      </span>
    </div>
    
  )
}

interface OpportunityDropdownProps {
  opportunity: OpportunityType;
  className?: string;
  visible: boolean;
}

const OpportunityDropdown = ({ opportunity, className, visible }: OpportunityDropdownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  const sanitiseMailto = (title: string) => {
    return title.replace("&", "%26");
  };

  return ((
    <Transition
        show={visible}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={classNames("clear-both my-3 w-full transition-opacity", visible ? "opacity-100" : "opacity-0", className)}>
          <div
            className="relative clear-both inline-block w-full border-1 border-gray-300 bg-gray-75 px-4 py-2 hover:bg-white"
            onClick={() => setIsOpened((curr) => !curr)}
          >
            <h2 className="my-0 text-base">
              {opportunity.title}
              <span className="float-right">
                <FaMapMarkerAlt className="inline" />{" "}
                {opportunity.locations.join(", ")}
              </span>
            </h2>
          </div>
          <div className="clear-left"></div>
          {isOpened && (
            <div className="border-1 border-gray-300 p-4">
              <section className="prose max-w-full">
                <TinaMarkdown content={opportunity.description} components={componentRenderer} />
              </section>
              <UtilityButton
                className="mx-auto my-10 flex items-center"
                buttonText="Apply Now"
                link={sanitiseMailto(
                  `mailto:pennywalker@ssw.com.au?subject=Employment application for ${opportunity.title}`
                )}
              />
            </div>
          )}
        </div>
      </Transition>
    )
  );
};
