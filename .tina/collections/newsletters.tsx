import { transformIntToMonth } from "../../services/date.service";

export const newsletterSchema = {
	label: "Newsletters",
	name: "newsletters",
	path: "content/newsletters",
	format: "json",
	fields: [
		{
			type: "string",
			label: "Year",
			name: "newsletters_year",
		},
		{
			type: "object",
			label: "Newsletters",
			name: "newsletters",
			list: true,
			ui: {
				itemProps: (item) => {
					if (item) {
						return {
							label: `${item?.month} - ${transformIntToMonth(item?.month)} - ${
								item?.description
							}`,
						};
					}
				},
			},
			fields: [
				{
					type: "number",
					name: "month",
					label: "Month",
					required: true,
				},
				{
					type: "string",
					name: "url",
					label: "Url",
					required: true,
				},
				{
					type: "string",
					name: "description",
					label: "Description",
					required: true,
				},
			],
		},
	],
};
