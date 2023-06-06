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
          src="/images/Employment/question.png" 
          height={16} 
          width={16} 
          className="inline"
        /> I am looking for...</h3>
        
        <FilterOption index={-1} setSelected={setSelectedLocation}><strong>All Locations</strong></FilterOption>
        {locations.map((status, index) => (
          <FilterOption key={index} index={index} setSelected={setSelectedLocation}>{status}</FilterOption>
        ))}

        <FilterOption index={-1} setSelected={setSelectedType}><strong>All Types</strong></FilterOption>
        {employmentType.map((status, index) => (
          <FilterOption key={index} index={index} setSelected={setSelectedType}>{status}</FilterOption>
        ))}
        
        <FilterOption index={-1} setSelected={setSelectedStatus}><strong>All Positions</strong></FilterOption>
        {jobStatus.map((status, index) => (
          <FilterOption key={index} index={index} setSelected={setSelectedStatus}>{status}</FilterOption>
        ))}

      </div>
      <div className="grow">
        <h3>Available Positions</h3>
        {opportunities.map((opportunity, index) => (
          <OpportunityDropdown className={filteredOpportunities.findIndex(o => o.title === opportunity.title) === -1 ? "animate-[wiggle_1s_ease-in-out_infinite]" : ""} key={index} opportunity={opportunity} />
        ))}
      </div>
    </div>
  );
};

interface FilterOptionProps {
  index: number;
  setSelected: (index: number) => void;
  children?: React.ReactNode;
}

const FilterOption = ({ index, children, setSelected, }: FilterOptionProps) => {
  return (
    <div className={"w-full hover:text-sswRed"}>
      <button onClick={() => setSelected(index)}>
        {children}
      </button>
    </div>
  )
}

interface OpportunityDropdownProps {
  opportunity: OpportunityType;
  className?: string;
}

const OpportunityDropdown = ({ opportunity, className }: OpportunityDropdownProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sanitiseTitle = (title: string) => {
    return title.replace("&", "%26");
  };

  return (
    <div className={classNames("clear-both my-3 w-full", className)}>
      <div
        className="relative clear-both inline-block w-full border-1 border-gray-300 bg-gray-75 px-4 py-2 hover:bg-white"
        onClick={() => setIsVisible((curr) => !curr)}
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
      {isVisible && (
        <div className="border-1 border-gray-300 p-4">
          <TinaMarkdown content={opportunity.description} components={componentRenderer} />
          <UtilityButton
            className="mx-auto my-10 flex items-center"
            buttonText="Apply Now"
            link={sanitiseTitle(
              `mailto:pennywalker@ssw.com.au?subject=Employment application for ${opportunity.title}`
            )}
          />
        </div>
      )}
    </div>
  );
};
