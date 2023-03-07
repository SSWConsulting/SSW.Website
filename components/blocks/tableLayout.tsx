/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useState } from "react";
import type { Template } from "tinacms";
import markdownItMultimdTable from "markdown-it-multimd-table";
import MarkdownIt from "markdown-it";

export const TableLayout = ({ data }) => {
	const [mdxTableString, setMdxTableString] = useState("");

	const ConvertMDXTable = () => {
		const mdxTable =
			data.mdxTable?.children[0].children[0].text.replaceAll("\\n", "\n") ?? "";

		const md = new MarkdownIt().use(markdownItMultimdTable);
		const html = md.render(mdxTable);
		setMdxTableString(formatList(html));
	};

	const formatList = (table) => {
		return table.replace(
			/ - |x-|1-/g,
			(match) =>
				({
					" - ": "<li>", // begining of the list item with character '-'
					"x-": "</li>", // end of the list item with character  'x-'
					"1-": "<li>", //  first item of the list with character '1-'
				}[match])
		);
	};

	useEffect(() => {
		ConvertMDXTable();
	}, [data]);

	return (
		<div className="mt-5 flex justify-center">
			<div
				className="customTable"
				dangerouslySetInnerHTML={{ __html: mdxTableString }}
			/>
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
			type: "rich-text",
			label: "Table",
			name: "mdxTable",
		},
	],
};
