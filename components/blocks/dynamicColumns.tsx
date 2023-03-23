import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// As per https://tailwindcss.com/docs/columns
const largest_col = 12;

// Can't be done with for loop because it runs on client
const classNames = [
	"md:columns-1",
	"md:columns-2",
	"md:columns-3",
	"md:columns-4",
	"md:columns-5",
	"md:columns-6",
	"md:columns-7",
	"md:columns-8",
	"md:columns-9",
	"md:columns-10",
	"md:columns-11",
	"md:columns-12",
];

export const DynamicColumns = ({ data }) => {
	return (
		<div className={classNames[data.colCount - 1] ?? ""}>
			<TinaMarkdown content={data.colBody} />
		</div>
	);
};

export const dynamicColumnsSchema: Template = {
	name: "DynamicColumns",
	label: "Dynamic Column Layout",
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
