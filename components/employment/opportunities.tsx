import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { employmentType, jobStatus, locations } from "../util/constants/opportunity"

interface OpportunitiesProps {
  opportunities: OpportunityType[]
}

export interface OpportunityType {
  title: string
  employmentType: string
  status: string
  locations: string[]
  description: TinaMarkdownContent
}

export const Opportunities = ({ opportunities }: OpportunitiesProps) => {
  const locationsList = ["All Locations", ...locations];
  const typesList = ["All Types", ...employmentType];
  const statusList = ["All Positions", ...jobStatus];

  return (
    <div className="flex flex-row">
      <div className="basis-48 shrink-0">
        <h3>I am looking for...</h3>
        {locationsList.map((location, index) =>
          <div key={index}>{location}</div>
        )}
        {typesList.map((location, index) =>
          <div key={index}>{location}</div>
        )}
        {statusList.map((location, index) =>
          <div key={index}>{location}</div>
        )}
      </div>
      <div>
        <h3>Available Positions</h3>
        {opportunities.map((opportunity, index) => 
          <OpportunityDropdown key={index} opportunity={opportunity} />
        )}
      </div>
    </div>
  )
}

interface OpportunityDropdownProps {
  opportunity: OpportunityType
}

const OpportunityDropdown = ({ opportunity }: OpportunityDropdownProps) => {
  return (
    <div>
      <h2 className="text-base">{opportunity.title}</h2>
      <TinaMarkdown content={opportunity.description} />
    </div>
  )
}