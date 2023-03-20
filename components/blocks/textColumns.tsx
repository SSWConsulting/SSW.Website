import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import classnames from "classnames";

// As per https://tailwindcss.com/docs/columns
const largest_col = 12;

export const TextColumns = ({ data }) => {
	const cols = [];
	for (let i = 1; i <= largest_col; i++) {
		cols.push(`md:columns-${i.toString()}`);
	}

	return (
		<div className={cols[data.colCount - 1]}>
			<TinaMarkdown content={data.colBody} />
		</div>
	);
};

export const textColumnsSchema: Template = {
	name: "TextColumns",
	label: "Text Column Display",
	fields: [
		{
			type: "rich-text",
			label: "Column text body",
			name: "colBody",
			required: true,
		},
		{
			type: "number",
			label: "Number of columns",
			name: "colCount",
			required: true,
			ui: {
				validate: (val) => {
					if (val > largest_col) {
						return `Number must be less than or equal to ${largest_col.toString()}`;
					} else if (val <= 0) {
						return "Number must be greater than 0";
					}
				},
			},
		},
	],
};
