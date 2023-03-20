import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// As per https://tailwindcss.com/docs/columns
const largest_col = 12;

const cols = [];
for (let i = 1; i <= largest_col; i++) {
	cols.push(`md:columns-${i.toString()}`);
}

export const TextColumns = ({ data }) => {
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
