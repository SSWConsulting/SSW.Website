import { useEffect, useState } from "react";
import { Template } from "tinacms";
import { NewsletterContent, Newsletters } from "../../models/Newsletters";
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
		const newslettersContext = require.context(
			"../../content/newsletters",
			true,
			/\.json$/
		);

		const allNewsletters = importAllJSON(newslettersContext);

		const newslettersData = Object.values(allNewsletters).map(
			({ newsletters, newsletters_year }) => ({
				newsletters,
				year: newsletters_year,
			})
		);

		setNewsletters(newslettersData.reverse());
		setHasLoaded(true);
	};

	const renderTable = (table: { newsletters: Newsletters[]; year: string }) => (
		<table key={table.year}>
			<thead>
				<tr>
					<th>{table.year}</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{table.newsletters.map((item: NewsletterContent) => (
					<tr key={item.month}>
						<td>
							<a
								href={`/newsletters/${table.year}/${item.url}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{transformIntToMonth(item.month)}
							</a>
						</td>
						<td>{item.description}</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	return (
		<>
			<h2>{data.headerText}</h2>
			{newsletters.map(renderTable)}
		</>
	);
};

export const newslettersTableSchema: Template = {
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
