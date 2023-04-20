export const newsletterSchema = {
	label: "Newsletters",
	name: "newsletters",
	path: "content/newsletters",
	format: "json",
	fields: [
		{
			type: "object",
			label: "Newsletters",
			name: "newsletters",
			list: true,
			ui: {
				itemProps: (item) => {
					console.log(item);
					if (!item.url || item.url === "") {
						return { label: `${item.value} (Table infos)` };
					}
					return { label: `${item.url} (HTML infos)` };
				},
			},
			fields: [
				{
					type: "string",
					name: "key",
					label: "Key",
					required: true,
				},
				{
					type: "string",
					name: "value",
					label: "Value",
					required: true,
				},
				{
					type: "number",
					name: "rowIndex",
					label: "Row Index",
					required: true,
				},
				{
					type: "string",
					name: "type",
					label: "Type",
					required: true,
				},
				{
					type: "string",
					name: "url",
					label: "Url",
					required: true,
				},
			],
		},
	],
};
