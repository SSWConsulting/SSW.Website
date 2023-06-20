import { useEffect, useState } from "react";
import { Template } from "tinacms";
import { transformIntToMonth } from "../../services/date.service";
import client from "../../.tina/__generated__/client";
import { FaSpinner } from "react-icons/fa";

/**
 * Render a table of newsletters.
 * @param data The data for the table.
 * @returns The table component.
 */
export const NewslettersTable: React.FC<{ data: { headerText: string } }> = ({
  data,
}) => {
  const [newsletters, setNewsletters] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      loadNewsletters();
    }
  }, [hasLoaded]);

  const loadNewsletters = () => {
    client.queries.newslettersConnection().then((data) => {
      const newsletters = data.data.newslettersConnection.edges.map((edge) => ({
        newsletters: edge.node.newsletters,
        newsletters_year: edge.node.newsletters_year,
      }));
      const sortedNewslettersYears = newsletters.map((item) => {
        const sortedNewslettersMonths = item.newsletters.sort(
          (a, b) => b.month - a.month
        );
        return {
          newsletters: sortedNewslettersMonths,
          year: item.newsletters_year,
        };
      });

      setNewsletters(sortedNewslettersYears?.reverse());
      setHasLoaded(true);
    });
  };

  const removeTinaFromUrl = (input: string) => {
    return input.replace(/^https:\/\/assets\.tina\.io\/[^/]+\//, "");
  };

  const renderTable = ({ newsletters, year }) => (
    <table key={year} className="m-0 w-full">
      <thead>
        <tr>
          <th className="w-1/6 bg-gray-300 px-3 py-1" align="left">
            {year}
          </th>
          <th className="w-5/6 bg-gray-300 px-3 py-1" align="left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {newsletters.map(({ file, month, description }) => (
          <tr key={file} className="bg-gray-125">
            <td className="border-1 border-white px-3 py-1">
              <a
                href={removeTinaFromUrl(file)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {transformIntToMonth(month)}
              </a>
            </td>
            <td className="border-1 border-white px-3 py-1">{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <h2 className="mb-3 mt-5 text-2xl text-sswRed">{data.headerText}</h2>
      {hasLoaded ? (
        newsletters.map(renderTable)
      ) : (
        <><p className="flex items-center text-xl"><FaSpinner className="m-icon animate-spin" />  Loading Newsletters...</p></>
      )}
    </>
  );
};

export const newslettersTableBlockSchema: Template = {
  name: "NewslettersTable",
  label: "Newsletters Table",
  fields: [
    {
      type: "string",
      label: "Header text",
      name: "headerText",
    },
  ],
};
