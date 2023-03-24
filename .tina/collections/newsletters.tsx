import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

export const newslettersSchema: Collection = {
	label: "Newsletters Page",
	name: "newsletters",
	format: "mdx",
	path: "content/newsletters",
	ui: {
		global: true,
	},
	fields: [
		// @ts-ignore
		seoSchema,
		{
			type: "string",
			name: "title",
			label: "title",
		},
		{
			type: "rich-text",
			label: "Body",
			name: "_body",
			templates: [...Schemas.pageBlocks],
			isBody: true,
		},
	],
};
