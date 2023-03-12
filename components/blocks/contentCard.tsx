import { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { componentRenderer } from "./mdxComponentRenderer";
import { videoEmbedBlockSchema } from "./videoEmbed";

export const ContentCard = ({ data }) => {
	return (
		<div className="relative mx-auto my-5 w-full border-b-2 border-solid border-sswRed bg-gray-75 p-10 text-center">
			<TinaMarkdown content={data.content} components={componentRenderer} />
		</div>
	);
};

export const contentCardBlockSchema: Template = {
	name: "ContentCard",
	label: "Content Card",
	ui: {
		previewSrc: "/blocks/content.png",
		defaultItem: {
			body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
		},
	},
	fields: [
		{
			type: "rich-text",
			label: "Content",
			name: "content",
			templates: [videoEmbedBlockSchema],
		},
	],
};
