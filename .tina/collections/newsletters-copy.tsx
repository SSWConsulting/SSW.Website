import { type Collection } from "tinacms";
import { CustomFileUpload } from "../../components/admin/customFileUpload";

export const newsletterCopySchema: Collection = {
  label: "Newsletters Copy",
  name: "newslettersCopy",
  path: "content/newslettersCopy",
  format: "json",
  fields: [
		// File upload field here
		{
			type: "string",
			label: "File",
			name: "file",
			description: "How it do",
			ui: {
				parse: (val) => {
					return String(val || "");
				},
				format: (val) => {
					return String(val || "");
				},
				component: CustomFileUpload,
			}
		},
		{
			type: "image",
			label: "Newsletter images",
			name: "images",
			parse: (media) => { 
				return `/uploads/images/${media}`;
			},
			uploadDir: () => "/public/uploads/newsletters/images",
		}
  ],
};