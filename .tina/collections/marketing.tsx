import type { Collection } from "tinacms";

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
			type: "string",
			label: "Marketing video URL",
			name: "videoUrl",
			required: true,
		},
		{
			type: "rich-text",
			label: "Body",
			name: "body",
			isBody: true,
		},
	],
};
