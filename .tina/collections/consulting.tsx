import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

export const consultingIndexSchema: Collection = {
	label: "Consulting - Index",
	name: "consultingIndex",
	path: "content/consulting/index",
	format: "json",
	fields: [
		// @ts-ignore
		seoSchema,
		{
			type: "object",
			label: "Categories",
			name: "categories",
			list: true,
			ui: {
				itemProps: (item) => {
					return { label: item?.category?.split("/")[3].replace(".json", "") };
				},
			},
			fields: [
				{
					type: "reference",
					label: "Category",
					name: "category",
					collections: ["consultingCategory"],
				},
				{
					type: "object",
					label: "Pages",
					name: "pages",
					list: true,
					ui: {
						itemProps: (item) => {
							return { label: item?.title };
						},
					},
					fields: [
						{
							type: "string",
							label: "Title",
							name: "title",
						},
						{
							type: "string",
							label: "Description",
							name: "description",
							ui: {
								component: "textarea",
							},
						},
						{
							type: "image",
							label: "Logo",
							name: "logo",
						},
						{
							type: "reference",
							label: "Page",
							name: "page",
							collections: ["consulting"],
							required: true,
						},
						{
							type: "string",
							label: "External URL",
							description:
								"Takes precedence over page if selected. If using this, you still have to select a (random) page.",
							name: "externalUrl",
						},
						{
							type: "object",
							label: "Tags",
							name: "tags",
							list: true,
							ui: {
								itemProps: (item) => {
									return { label: item?.tag };
								},
							},
							fields: [
								{
									type: "reference",
									label: "Tag",
									name: "tag",
									collections: ["consultingTag"],
								},
							],
						},
					],
				},
			],
		},
	],
};

export const consultingCategorySchema: Collection = {
	label: "Consulting - Categories",
	name: "consultingCategory",
	path: "content/consulting/category",
	format: "json",
	ui: {
		global: true,
	},
	fields: [
		{
			type: "string",
			label: "Name",
			name: "name",
		},
	],
};

export const consultingTagSchema: Collection = {
	label: "Consulting - Tags",
	name: "consultingTag",
	path: "content/consulting/tag",
	format: "json",
	ui: {
		global: true,
	},
	fields: [
		{
			type: "string",
			label: "Name",
			name: "name",
		},
	],
};

export const consultingSchema: Collection = {
	label: "Consulting Pages",
	name: "consulting",
	format: "mdx",
	path: "content/consulting",
	ui: {
		router: ({ document }) => {
			return `/consulting/${document._sys.filename}`;
		},
	},
	fields: [
		// @ts-ignore
		seoSchema,
		{
			type: "object",
			label: "CTA Header",
			name: "booking",
			fields: [
				{
					type: "string",
					label: "Title",
					name: "title",
				},
				{
					type: "string",
					label: "Subtitle",
					name: "subTitle",
				},
				{
					type: "string",
					label: "Button Text",
					name: "buttonText",
				},
				{
					type: "image",
					label: "Video Background",
					name: "videoBackground",
				},
			],
		},
		{
			type: "object",
			label: "Solution",
			name: "solution",
			fields: [
				{
					type: "string",
					label: "Project",
					name: "project",
				},
			],
		},
		{
			type: "rich-text",
			label: "Body",
			name: "_body",
			templates: [...Schemas.pageBlocks],
			isBody: true,
		},
		{
			type: "object",
			label: "Benefits",
			name: "benefits",
			fields: [
				{
					type: "object",
					list: true,
					label: "benefit list",
					name: "benefitList",
					ui: {
						itemProps: (item) => {
							return { label: item?.title };
						},
					},
					fields: [
						{
							type: "image",
							label: "Image URL",
							name: "image",
						},
						{
							type: "string",
							label: "Title",
							name: "title",
						},
						{
							type: "rich-text",
							label: "Description",
							name: "description",
						},
						{
							type: "string",
							required: false,
							label: "linkName",
							name: "linkName",
						},
						{
							type: "string",
							required: false,
							label: "linkURL",
							name: "linkURL",
						},
					],
				},
				{
					type: "object",
					label: "Rule",
					name: "rule",
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
						{
							type: "string",
							label: "URL",
							name: "url",
						},
					],
				},
			],
		},
		{
			type: "object",
			list: true,
			name: "afterBody",
			label: "After body",
			ui: {
				visualSelector: true,
			},
			templates: [...Schemas.pageBlocks],
		},
		{
			type: "object",
			label: "Testimonial Categories",
			name: "testimonialCategories",
			list: true,
			fields: [
				{
					type: "reference",
					label: "Testimonial Category",
					name: "testimonialCategory",
					collections: ["testimonialCategories"],
				},
			],
		},
		{
			type: "object",
			label: "Technologies",
			name: "technologies",
			fields: [
				{
					type: "string",
					label: "Header",
					name: "header",
				},
				{
					type: "string",
					label: "Subheading",
					name: "subheading",
				},
				{
					type: "object",
					label: "Technology Cards",
					name: "technologyCards",
					ui: {
						itemProps: (item) => ({
							label: item?.technologyCard,
						}),
					},
					list: true,
					fields: [
						{
							type: "reference",
							label: "Technology Card",
							name: "technologyCard",
							collections: ["technologies"],
						},
					],
				},
			],
		},
		{
			type: "object",
			label: "Media cards",
			name: "medias",
			fields: [
				{
					type: "string",
					label: "Header",
					name: "header",
				},
				{
					type: "object",
					label: "Media Cards",
					name: "mediaCards",
					list: true,
					fields: [
						{
							type: "string",
							label: "Type",
							name: "type",
							options: [
								{
									value: "video",
									label: "Video",
								},
								{
									value: "blog",
									label: "Blog",
								},
							],
						},
						{
							type: "rich-text",
							label: "Content",
							name: "content",
						},
					],
				},
			],
		},
		{
			type: "string",
			label: "CTA Footer title",
			description:
				'By default this will use: "Talk to us about your {{TITLE}} project". Title is sourced from Solution > Project',
			name: "callToAction",
			required: false,
		},
	],
};
