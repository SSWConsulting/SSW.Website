import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import {
  employmentType,
  jobStatus,
  locations,
} from "../util/constants/opportunity";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { UtilityButton } from "../blocks";

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
    const filtered = opportunities.filter((opportunity) => {
      (selectedLocation !== -1 || opportunity.locations.includes(locations[selectedLocation])) &&
      (selectedType !== -1 || opportunity.employmentType === employmentType[selectedType]) &&
      (selectedStatus !== -1 || opportunity.status === jobStatus[selectedStatus])
    })
    setFilteredOpportunities(filtered);
  }, [selectedLocation, selectedType, selectedStatus]);

  return (
    <div className="flex flex-row">
      <div className="shrink-0 basis-64">
        <h3>I am looking for...</h3>
        <div>
          <strong>All Locations</strong>
        </div>
        {locations.map((location, index) => (
          <div onClick={() => setSelectedLocation(index)} key={index}>{location}</div>
        ))}
        <div>
          <strong>All Types</strong>
        </div>
        {employmentType.map((type, index) => (
          <div onClick={() => setSelectedType(index)} key={index}>
            {type}
          </div>
        ))}
        <div>
          <strong>All Positions</strong>
        </div>
        {jobStatus.map((status, index) => (
          <div onClick={() => setSelectedStatus(index)} key={index}>
            {status}
          </div>
        ))}
      </div>
      <div className="grow">
        <h3>Available Positions</h3>
        {filteredOpportunities.map((opportunity, index) => (
          <OpportunityDropdown key={index} opportunity={opportunity} />
        ))}
      </div>
    </div>
  );
};

interface OpportunityDropdownProps {
  opportunity: OpportunityType;
}

const OpportunityDropdown = ({ opportunity }: OpportunityDropdownProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sanitiseTitle = (title: string) => {
    return title.replace("&", "%26");
  };

  return (
    <div className="clear-both my-3 w-full">
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
          <TinaMarkdown content={opportunity.description} />
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
