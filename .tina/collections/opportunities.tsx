import { string } from "sharp/lib/is";
import type { Collection } from "tinacms";
import {
	Employment_Type,
	Locations,
	Job_Status,
} from "../../components/util/constants";

export const opportunitiesSchema: Collection = {
	label: "Current Opportunities",
	name: "Opportunities",
	format: "mdx",
	path: "content/opportunities",
	fields: [
		{
			type: "string",
			label: "Job Title",
			name: "title",
			isTitle: true,
			required: true,
		},
		{
			type: "string",
			label: "Type",
			name: "employementtype",
			options: Employment_Type.map((type) => type.label),
		},
		{
			type: "string",
			label: "Status",
			name: "status",
			options: Job_Status.map((status) => status.label),
		},
		{
			type: "object",
			list: true,
			label: "Locations",
			name: "locationList",
			ui: {
				itemProps: (item) => ({ label: item?.location }),
				validate: (value) => {
					const locations = value?.map((x) => x.location);

					const locArray: string[] = [];
					let duplicated = false;

					locations?.forEach((loc) => {
						if (!locArray.includes(loc)) {
							locArray.push(loc);
						} else {
							duplicated = true;
						}
					});

					if (duplicated) {
						return "You cannot have same location multiple times!";
					}
				},
			},
			fields: [
				{
					type: "string",
					label: "Select Location",
					name: "location",
					options: Locations.map((location) => location.label),
				},
			],
		},
		{
			type: "rich-text",
			label: "Desciption",
			name: "description",
		},
	],
};
