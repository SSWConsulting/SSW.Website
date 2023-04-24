import { useEffect, useState } from "react";
import { Template } from "tinacms";
import { Newsletters } from "../../models/Newsletters";
import { importAllJSON } from "../../services/utils.service";
import { transformIntToMonth } from "../../services/date.service";

/**
 * Render a table of newsletters.
 * @param data The data for the table.
 * @returns The table component.
 */
export const NewslettersTable: React.FC<{ data: { headerText: string } }> = ({
	data,
}) => {
	const [newsletters, setNewsletters] = useState<
		{ newsletters: Newsletters[]; year: string }[]
	>([]);
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		if (!hasLoaded) {
			loadNewsletters();
		}
	}, [hasLoaded]);

	const loadNewsletters = () => {
		const newsletterFiles = require.context(
			"../../content/newsletters",
			true,
			/\.json$/
		);

		const allNewsletters = importAllJSON(newsletterFiles);

		const newslettersData = Object.values(allNewsletters).map(
			({ newsletters, newsletters_year }) => ({
				newsletters,
				year: newsletters_year,
			})
		);

		const sortedNewslettersData = newslettersData.map((item) => {
			const sortedNewsletters = item.newsletters.sort(
				(a, b) => a.month - b.month
			);
			return {
				newsletters: sortedNewsletters,
				year: item.year,
			};
		});

		setNewsletters(sortedNewslettersData.reverse());
		setHasLoaded(true);
	};

	const renderTable = ({ newsletters, year }) => (
		<table key={year} className="w-full">
			<thead>
				<tr>
					<th className="w-1/6 bg-gray-300 py-1 px-3" align="left">
						{year}
					</th>
					<th className="w-5/6 bg-gray-300 py-1 px-3" align="left">
						Description
					</th>
				</tr>
			</thead>
			<tbody>
				{newsletters.map(({ url, month, description }) => (
					<tr key={url} className="bg-gray-125">
						<td className="border-1 border-white py-1 px-3">
							<a
								href={`/newsletters/${year}/${url}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{transformIntToMonth(month)}
							</a>
						</td>
						<td className="border-1 border-white py-1 px-3">{description}</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	return (
		<>
			<h2 className="mt-5 mb-3 text-2xl text-sswRed">{data.headerText}</h2>
			{hasLoaded ? (
				newsletters.map(renderTable)
			) : (
				<p className="text-xl">Loading Newsletters...</p>
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
