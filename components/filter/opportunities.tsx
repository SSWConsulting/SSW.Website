import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { UtilityButton } from "../blocks";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import SuccessToast from "../successToast/successToast";

import {
  EmploymentType,
  JobStatus,
  Locations,
  employmentType,
  jobStatus,
  locations,
} from "../util/constants/opportunity";
import { FilterBlock, NO_SELECTION } from "./FilterBlock";

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
        (selectedLocation === NO_SELECTION ||
          opportunity.locations.includes(locations[selectedLocation])) &&
        (selectedType === NO_SELECTION ||
          opportunity.employmentType === employmentType[selectedType]) &&
        (selectedStatus === NO_SELECTION ||
          opportunity.status === jobStatus[selectedStatus])
    );
    setFilteredOpportunities(filtered);

    const currentURL = window.location.href.split("#");
    if (currentURL.length > 1) {
      const id = currentURL[1];
      const elm = document.getElementById(id);
      if (elm) {
        setTimeout(() => {
          elm.click();
        }, 100);
      }
    }
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

const CopyTextToClipboard = ({ id, title }) => {
  const [copiedURL, setCopiedURL] = useState("");

  const showSuccessToast = (title: string) => {
    toast.success(
      <div className="text-left">{`${title} copied to clipboard!`}</div>
    );
  };

  const copiedText = (title, isCopied) => {
    if (isCopied) {
      showSuccessToast(title);
    }
  };

  useEffect(() => {
    const currentURL = window.location.href.split("#")[0];
    const newURL = currentURL + "#" + id;
    setCopiedURL(newURL);
  }, [id]);

  return (
    <CopyToClipboard
      text={copiedURL}
      onCopy={(text, result) => copiedText(title, result)}
    >
      <span onClick={(event) => event.stopPropagation()}>
        <MdContentCopy
          title="Copy Link"
          className="ml-2 inline hover:opacity-50"
        />
        <SuccessToast {...{ autoClose: 1000 }} />
      </span>
    </CopyToClipboard>
  );
};

const OpportunityDropdown = ({
  opportunity,
  className,
  visible,
}: OpportunityDropdownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const sanitiseMailto = (title: string) => {
    return title.replace(/&/g, "%26");
  };

  const transformTitleToId = (title?: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, "-") // To replace spaces with '-'
      .replace(/[^\w\s-]/g, "-") // To replace brackets and special characters with '-'
      .replace(/-{2,}/g, "-") // To replace dashes with single dash
      .replace(/-$/, ""); // To remove the last dash if it exists

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
            id={transformTitleToId(opportunity.title)}
          >
            <h2 className="my-0 text-base md:float-left">
              {opportunity.title}
            </h2>
            <span className="flex items-center md:float-right">
              <FaMapMarkerAlt className="inline" />
              {opportunity.locations?.join(", ")}
              {opportunity.status != FILLED && opportunity.title && (
                <CopyTextToClipboard
                  id={transformTitleToId(opportunity.title)}
                  title={opportunity.title}
                />
              )}
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
                  )}`}
                />
              )}
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </div>
    </Transition>
  );
};
