import React, { useEffect, useState } from "react";
import { Template } from "tinacms";
import { SSWTable } from "./sswTable";
import newLettersList from "../../../content/newsletters_list.json";

export const NewsTable = () => {
	const [tables, setTables] = useState({});

	useEffect(() => {
		setTables(newLettersList);
	}, []);

	return (
		<>
			{Object.keys(tables)
				.sort()
				.reverse()
				.map((year, idx) => {
					return (
						<SSWTable
							key={year}
							title={idx === 0 ? "Past SSW Newsletters" : false}
							columns={[
								{ key: "month", label: year, className: "w-1/6" },
								{ key: "desc", label: "Description", className: "w-5/6" },
							]}
							data={tables[year]}
						/>
					);
				})}
		</>
	);
};

export const newsTableBlockSchema: Template = {
	name: "NewsTable",
	label: "News Table",
	// Todo: Find a way to have no fields - the one below is to satisfy compiler
	fields: [
		{
			type: "string",
			label: "Alt text",
			name: "altText",
			required: true,
		},
	],
};
