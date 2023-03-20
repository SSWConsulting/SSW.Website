import React from "react";
import { Template } from "tinacms";
import { sectionColors } from "../util/constants/styles";

const fields = [
	{
		id: "aperson",
		label: "Authorized Person",
		placeholder: "",
	},
	{
		id: "position",
		label: "Position",
		placeholder: "",
	},
	{
		id: "fullcompanyname",
		label: "Person or Full Company Name",
		placeholder: "",
	},
	{
		id: "address",
		label: "Client registered business address",
		placeholder: "",
	},
	{
		id: "signdate",
		label: "Authorized Person",
		placeholder: "Signature & Date",
	},
	{
		id: "abn",
		label: "Client ABN + date of incorporation",
		placeholder: "",
	},
];

export const AgreementForm = ({ data }) => {
	const sectionColorCss =
		sectionColors[data.backgroundColor] || sectionColors.default;
	return (
		<div>
			<div className={`my-10 p-8 ${sectionColorCss}`}>
				{fields.map((field) => (
					<FormField
						id={field.id}
						label={field.label}
						placeholder={field.placeholder}
					/>
				))}
			</div>

			<hr />
			<div className="flex justify-center">
				<button
					className="done mx-auto my-4 py-2 px-3"
					onClick={() => window.print()}
					type="submit"
				>
					Print and sign
				</button>
			</div>
		</div>
	);
};

const FormField = ({ label, id, placeholder }) => {
	return (
		<div className="relative inline-block w-full pb-3 md:flex">
			<div className="w-96 py-2.5 pr-2 text-left font-bold sm:grow-0 md:text-right">
				<label className="mb-1" htmlFor={id}>
					{label}
				</label>
			</div>
			<div className="inline-flex w-full md:grow">
				<input
					className="w-full rounded border-2 border-gray-300 p-2"
					type="text"
					id={id}
					name={id}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export const agreementFormBlockSchema: Template = {
	label: "Agreement Form",
	name: "AgreementForm",
	ui: {},
	fields: [
		{
			type: "string",
			label: "Background Color",
			name: "backgroundColor",
			options: [
				{ label: "Default", value: "default" },
				{ label: "Light Gray", value: "lightgray" },
				{ label: "Red", value: "red" },
				{ label: "Black", value: "black" },
			],
		},
	],
};
