import type { Collection } from "tinacms";

export const technologiesSchema: Collection = {
	label: "Technology Cards",
	name: "technologies",
	format: "mdx",
	path: "content/technologies",
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
			label: "Read More Slug",
			name: "readMoreSlug",
		},
		{
			type: "image",
			label: "Thumbnail",
			name: "thumbnail",
		},
		{
			type: "rich-text",
			label: "Body",
			name: "body",
			isBody: true,
		},
	],
};
