import type { Collection } from "tinacms";
import { seoSchema } from "../../components/util/seo";

export const productsIndexSchema: Collection = {
	label: "Products - Index",
	name: "productsIndex",
	path: "content/products/index",
	format: "json",
	fields: [
		// @ts-ignore
		seoSchema,
		{
			type: "object",
			label: "Products List",
			name: "productsList",
			list: true,
			ui: {
				itemProps: (item) => {
					return { label: item?.name };
				},
			},
			fields: [
				{
					type: "string",
					label: "Name",
					name: "name",
					isTitle: true,
					required: true,
				},
				{
					type: "string",
					label: "URL",
					name: "url",
				},
				{
					type: "string",
					label: "Description",
					name: "description",
				},
				{
					type: "image",
					label: "Logo",
					name: "logo",
				}
			],
		},
	],
};

export const productsSchema: Collection = {
	label: "Product Cards",
	name: "products",
	format: "mdx",
	path: "content/products",
	fields: [
		{
			type: "string",
			label: "Name",
			name: "name",
			isTitle: true,
			required: true,
		},
		{
			type: "string",
			label: "URL",
			name: "url",
		},
		{
			type: "string",
			label: "Description",
			name: "description",
		},
		{
			type: "image",
			label: "Thumbnail",
			name: "thumbnail",
		}
	],
};
