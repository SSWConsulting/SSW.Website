import type { Collection } from "tinacms";
import { sides } from "../../components/marketing/Marketing";
import * as Schemas from "../../components/blocks";

export const marketingSchema: Collection = {
	label: "Marketing",
	name: "marketing",
	path: "content/marketing",
	format: "mdx",
	fields: [
		{
			type: "string",
			label: "Title",
			name: "title",
			required: true,
		},
		{
			type: "image",
			label: "Background image",
			name: "backgroundImage",
			required: true,
		},
		{
			type: "rich-text",
			label: "Marketing media column",
			name: "mediaComponent",
			required: true,
			templates: [...Schemas.pageBlocks],
		},
		{
			type: "rich-text",
			label: "Body",
			name: "body",
			isBody: true,
		},
		{
			type: "string", 
			label: "Text side",
			name: "textSide",
			options: sides,
			required: true,
		}
	],
};
