import React, { useEffect, useState } from "react";
import { Template } from "tinacms";
import { SSWTable } from "./sswTable";
import { importAllJSON } from "../../../services/utils.service";
import { transformIntToMonth } from "../../../services/date.service";

export const NewsTable = () => {
	const [tables, setTables] = useState({});
	const [tables2, setTables2] = useState<any>([]);
	const [hasLoaded, setHasLoaded] = useState(false);

	// const dataContext = require.context(
	// 	"../../../content/newsletters",
	// 	true,
	// 	/\.json$/
	// );

	// const allJSON = importAllJSON(dataContext);

	useEffect(() => {
		if (!hasLoaded) {
			const newsLettersFolderContext = require.context(
				"../../../content/newsletters",
				true,
				/\.json$/
			);

			const allJSONFromNewslettersFolder = importAllJSON(
				newsLettersFolderContext
			);

			const arr = Object.values(allJSONFromNewslettersFolder).map(
				({ newsletters, year }) => ({
					newsletters,
					year,
				})
			);
			console.log(arr);

			// setTables(newLettersList);
			setTables2(arr.reverse());
			setHasLoaded(true);
		}
		// const newsLettersFolderContext = require.context(
		// 	"../../../content/newsletters",
		// 	true,
		// 	/\.json$/
		// );

		// const allJSONFromNewslettersFolder = importAllJSON(
		// 	newsLettersFolderContext
		// );

		// const arr = Object.values(allJSONFromNewslettersFolder).map(
		// 	({ newsletters, year }) => ({
		// 		newsletters,
		// 		year,
		// 	})
		// );

		// // setTables(newLettersList);
		// setTables2(arr);
		// console.log(tables2);
		console.log(tables2);
	}, [hasLoaded]);

	// useEffect(() => {
	// 	setTables2(tables2);
	// 	console.log(tables2);
	// }, [tables2]);

	return (
		<>
			<div>
				{/* <table>
					<thead>
						<tr>
							<th>Year</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{tables2.length &&
							tables2.map((item: any) => {
								console.log(item);
								return (
									<tr key={item.year}>
										<td>{item.year}</td>
										<td>
											{item.newsletters[0].month} -{" "}
											{item.newsletters[0].description}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table> */}
				{tables2.length &&
					tables2.map((table: any) => {
						return (
							<table>
								<thead>
									<tr>
										<th>{table.year}</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									{table.newsletters.map((item: any) => {
										return (
											<tr key={item.month}>
												<td>{transformIntToMonth(item.month)}</td>
												<td>{item.description}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						);
					})}
			</div>
			<div>
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
			</div>
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
