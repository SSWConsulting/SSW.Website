import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { locations } from "../util/constants/opportunity"

interface OpportunitiesProps {
  opportunities: {
    title: string
    employmentType: string
    status: string
    locations: string[]
    description: TinaMarkdownContent
  }[]
}

export const Opportunities = ({ opportunities }: OpportunitiesProps) => {
  return (
    <>
      {opportunities.map((opportunity, index) => 
        <TinaMarkdown key={index} content={opportunity.description} />
      )}

      {locations.map((location, index) =>
        <div key={index}>{location}</div>
      )}
    </>
  )
} 