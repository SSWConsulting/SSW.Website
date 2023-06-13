import { wrapFieldsWithMeta, type Collection, useCMS, Schema, Field, FieldPlugin, TinaField, useForm, useCMSEvent, Input, Button } from "tinacms";
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
					return String(val || "");
				},
				format: (val) => {
					return String(val || "");
				},
				component: ({ input, meta, field }) => {

					const cms = useCMS();
					
					const fileUploadRef = React.useRef(null);

					const [fileName, setFileName] = React.useState<string>(input.value);

					React.useEffect(() => {
						// @ts-ignore
						input.onChange(fileName);
					}, [fileName])

					// @ts-ignore
					input.onChange(fileName);

					const handleSubmit = async () => {
							
						const file = fileUploadRef?.current?.files[0];
						if (!file) return;
						
						setFileName(file.name);
						console.log(file);
						const [media] = await cms.media.persist([{ directory: "newsletters", file: file }])
						cms.media.store.list({ directory: "newsletters" }).then((res) => {
							console.log(res);
						})
					}

					return (
						<div>
							<Input type="file" ref={fileUploadRef} onChange={(e) => {
								setFileName(e.target.files[0].name);
							}} />
							<Button type="submit" onClick={() => handleSubmit().then(() => console.log("success"))}>Upload File</Button>
							{/* 
							// Component that made Tina display the component, not needed anymore
							<Input
								id="saturation"
								type="text"
								className="hidden" 
								// This will pass along props.input.onChange to set our form values as this input changes.
								{...input}
								onChange={(e) => { 
									setFileName(e.target.value); 
									// @ts-ignore
									input.onChange(fileName); 
								}}
							/> */}
							
						</div>
					)
				}
			}
		},
  ],
};