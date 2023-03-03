import React from "react";
import type { Template } from "tinacms";

export const TableLayout = ({ listofColumns }) => {
	const estimationTable = {
		header: [],
		hours: [],
		listItem: [],
	};

	listofColumns.map((column) => {
		estimationTable.header.push(column.header);
		estimationTable.hours.push(column.hours);
		estimationTable.listItem.push(column.listItem);
	});

	return (
		<div className="mt-5 flex justify-center">
			<table className="border-collapse border text-left">
				<thead>
					<tr>
						{estimationTable.header.map((head) => (
							<th key={head} className="border p-3">
								{head}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{estimationTable.hours.map((hour) => (
							<td key={hour} className="border px-2">
								{" "}
								{hour}
							</td>
						))}
					</tr>
					<tr>
						{estimationTable.listItem.map((list) => (
							<td key={list} className="border px-6 py-2">
								<ol className="list-disc">
									{list.map((x) => (
										<li key={x}> {x.item}</li>
									))}
								</ol>
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export const TableBlockSchema: Template = {
	label: "Table Layout",
	name: "TableLayout",
	ui: {
		itemProps: (item) => {
			return { label: item?.header };
		},
	},
	fields: [
		{
			type: "object",
			label: "Columns",
			name: "listofColumns",
			list: true,
			ui: {
				itemProps: (item) => {
					return { label: item?.header };
				},
			},
			fields: [
				{
					type: "string",
					label: "Header",
					name: "header",
					required: true,
				},
				{
					type: "string",
					label: "Hours",
					name: "hours",
					required: true,
				},
				{
					type: "object",
					label: "Add List",
					name: "listItem",
					list: true,
					ui: {
						itemProps: (item) => {
							return { label: item?.item };
						},
					},
					fields: [
						{
							type: "string",
							label: "Add items",
							name: "item",
							required: true,
						},
					],
				},
			],
		},
	],
};
