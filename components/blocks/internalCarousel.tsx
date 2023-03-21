import * as React from "react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import type { Template } from "tinacms";

import { Carousel as CarouselImplementation } from "react-responsive-carousel";

import { Container } from "../util/container";

export const InternalCarousel = ({ data }) => {
	return (
		<Container size="custom" className="w-3/4 px-0 prose-ul:text-right">
			<CarouselImplementation
				autoPlay={true}
				infiniteLoop={true}
				showArrows={false}
				showThumbs={false}
				showStatus={false}
				stopOnHover={true}
				renderIndicator={createCarouselIndicator}
			>
				{data.items?.map(createCarouselItemImage)}
			</CarouselImplementation>
			{renderBody(data)}
		</Container>
	);
};

const createCarouselItemImage = ({ imgSrc, label }, index: React.Key) => {
	return (
		<div key={index}>
			<Image src={imgSrc} alt={label} height={0} width={0} sizes="100vw" />
			{/* `legend` required so that the carousel works properly */}
			<p className="legend sr-only">{label}</p>
		</div>
	);
};

const createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
	if (isSelected) {
		return (
			<li
				className="my-0 mx-1 inline-block h-7 w-7 bg-sswRed"
				aria-label={`Selected: ${label} ${index + 1}`}
				title={`Selected: ${label} ${index + 1}`}
			/>
		);
	}
	return (
		<li
			className="my-0 mx-1 inline-block h-7 w-7 bg-gray-500 text-right prose-ul:text-right"
			onClick={onClickHandler}
			onKeyDown={onClickHandler}
			value={index}
			key={index}
			role="button"
			tabIndex={0}
			title={`${label} ${index + 1}`}
			aria-label={`${label} ${index + 1}`}
		/>
	);
};

const renderBody = ({ header, paragraph, website, technologies }) => {
	return (
		<div key={header} className={header ? "" : "hidden"}>
			<div className="mt-2 flex justify-between text-left font-semibold text-sswRed prose-p:py-0">
				<h4>{header}</h4>
				<span className={website ? "" : "hidden"}>
					<a href={website} target="_blank">
						Visit Website
					</a>
				</span>
			</div>
			<div className="text-left prose-p:py-2">
				<TinaMarkdown content={paragraph} />
			</div>
			<div className="flex">{technologies?.map(createTechBlock)}</div>
			<div className="mt-3 mb-7 h-1 w-full bg-sswRed"></div>
		</div>
	);
};

const createTechBlock = ({ name }, index: React.Key) => {
	return (
		<div
			className="mx-0.5 min-w-fit bg-sswRed py-1 px-2 first:ml-0"
			key={index}
		>
			{name}
		</div>
	);
};

export const internalCarouselBlockSchema: Template = {
	name: "InternalCarousel",
	label: "Internal Carousel",
	ui: {
		previewSrc: "/blocks/hero.png",
		itemProps: (item) => ({ label: item.items.header }),
	},
	fields: [
		{
			label: "Images",
			name: "items",
			type: "object",
			list: true,
			ui: {
				defaultItem: {
					label: "Image description",
				},
				itemProps: (item) => ({ label: item.imgSrc }),
			},
			fields: [
				{
					type: "string",
					label: "Label",
					name: "label",
				},
				{
					type: "image",
					label: "Image",
					name: "imgSrc",
				},
			],
		},
		{
			type: "string",
			label: "Header",
			name: "header",
		},
		{
			type: "rich-text",
			label: "Text",
			name: "paragraph",
			isBody: false,
		},
		{
			type: "string",
			label: "Website",
			name: "website",
		},
		{
			type: "object",
			label: "Technologies",
			name: "technologies",
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
				},
			],
		},
	],
};
