import { wrapFieldsWithMeta, type Collection, useCMS, Schema, Field, FieldPlugin, TinaField, useForm } from "tinacms";
import * as React from "react";
import { FaPray } from "react-icons/fa";



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
					return String(val);
				},
				component: ({ input, meta, field }) => {
					const cms = useCMS();
					console.log(cms);
					console.log(input);
					
					const fileUploadRef = React.useRef(null);

					const handleSubmit = (event) => {
						event?.preventDefault();
							
						const file = fileUploadRef.current.files[0];
						console.log(file);
						cms.media.persist([{ directory: "newsletters", file: file }])
						cms.media.store.list({ directory: "newsletters" }).then((res) => {

							console.log(res);
						})
					}

					return (
						<div>
							<form onSubmit={handleSubmit}> 
								<input
									id="saturation"
									type="text"
									// This will pass along props.input.onChange to set our form values as this input changes.
									{...input}
								/>
								<br />
								<input type="file" ref={fileUploadRef} />
								<button type="submit">Submit</button>
							</form>
						</div>
					)
				}
			}
		},
  ],
};