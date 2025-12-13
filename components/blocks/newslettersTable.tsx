"use client";

import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Template } from "tinacms";
import { transformIntToMonth } from "../../services/client/date.service";
import { getNewsletters } from "../../services/server/newsletters";
import { CustomLink } from "../customLink";

type NewsletterYearsType = {
  newsletters?: NewsletterType[];
  year?: string;
};

type NewsletterType = {
  file?: string;
  month?: number;
  description?: string;
};

/**
 * Render a table of newsletters.
 * @param data The data for the table.
 * @returns The table component.
 */
export const NewslettersTable: React.FC<{ data: { headerText: string } }> = ({
  data,
}) => {
  const [newsletters, setNewsletters] = useState<NewsletterYearsType[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      loadNewsletters();
    }
  }, [hasLoaded]);

  const loadNewsletters = async () => {
    const data = await getNewsletters();
    const newsletters = data.data?.newslettersConnection?.edges?.map(
      (edge) => ({
        newsletters: edge?.node?.newsletters,
        newsletters_year: edge?.node?.newsletters_year,
      })
    );
    const sortedNewslettersYears: NewsletterYearsType[] =
      newsletters?.map((item) => {
        const sortedNewslettersMonths: NewsletterType[] =
          item?.newsletters
            ?.filter((newsletter) => !!newsletter && !!newsletter.month)
            ?.map((newsletter) => ({
              file: newsletter?.file || "",
              month: newsletter?.month || 0,
              description: newsletter?.description || "",
            }))
            ?.sort((a, b) => b.month - a.month) || [];
        return {
          newsletters: sortedNewslettersMonths,
          year: item?.newsletters_year || undefined,
        };
      }) || [];

    setNewsletters(sortedNewslettersYears.reverse());
    setHasLoaded(true);
  };

  const removeTinaFromUrl = (input: string) => {
    if (process.env.NODE_ENV === "development") return input;
    return (
      "/images/" + input.replace(/^https:\/\/assets\.tina\.io\/[^/]+\//, "")
    );
  };

  const renderTable = ({ newsletters, year }) => (
    <table
      key={year}
      className="mb-3 mt-0 w-full border-separate border-spacing-y-3"
    >
      <thead>
        <tr>
          <th
            className="mx-4 w-1/6 rounded-l bg-gray-100 px-3 py-1"
            align="left"
          >
            {year}
          </th>
          <th className="w-0 bg-gray-100">
            <div className="h-3 w-px bg-gray-300"></div>
          </th>
          <th className="w-5/6 rounded-r bg-gray-100 px-3 py-1" align="left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {newsletters.map(({ file, month, description }) => (
          <tr key={file} className="mx-4 bg-gray-50">
            <td className="rounded-l px-3 py-1">
              <CustomLink href={removeTinaFromUrl(file)} target="_blank">
                {transformIntToMonth(month)}
              </CustomLink>
            </td>
            <td>
              <div className="h-3 w-px bg-gray-300"></div>
            </td>
            <td className="rounded-r px-3 py-1">{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <h2 className="mb-3 mt-5 text-center text-4xl font-bold text-sswRed">
        {data.headerText}
      </h2>
      {hasLoaded ? (
        newsletters.map(renderTable)
      ) : (
        <>
          <p className="flex items-center text-xl">
            <FaSpinner className="m-icon animate-spin" /> Loading Newsletters...
          </p>
        </>
      )}
    </>
  );
};

export const newslettersTableBlockSchema: Template = {
  name: "NewslettersTable",
  label: "Newsletters Table",
  ui: {
    previewSrc: "/images/thumbs/tina/newsletters-table.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Header text",
      name: "headerText",
    },
  ],
};
