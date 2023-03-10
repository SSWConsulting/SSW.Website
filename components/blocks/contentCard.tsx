import { TinaMarkdown } from "tinacms/dist/rich-text";
import { componentRenderer } from "./mdxComponentRenderer";
import { VideoEmbed } from "./videoEmbed";

export const ContentCard = ({ data }) => {
	return (
		<div className="w-full border-b-2 border-solid border-sswRed bg-gray-75 p-10 text-center">
			<TinaMarkdown content={data} components={componentRenderer} />
		</div>
	);
};
