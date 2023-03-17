import React from "react";
import { Template } from "tinacms";
import { Formik, Field, Form } from "formik";

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

export const AgreementForm = () => {
	const initialValues = fields.reduce(
		(total, curr) => ({ ...total, [curr.id]: "" }),
		{}
	);
	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				<Form className="my-10 bg-gray-75 p-10">
					{fields.map((field) => (
						<FormField
							id={field.id}
							label={field.label}
							placeholder={field.placeholder}
						/>
					))}
					<hr />
					<button className="bg-green-100" type="submit">
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
};

const FormField = ({ label, id, placeholder }) => {
	return (
		<div className="h-auto p-10 md:grid-cols-5">
			<div className="relative float-left w-1/4 py-2.5 pr-2 text-right font-bold">
				<label className="mb-1" htmlFor={id}>
					{label}
				</label>
			</div>
			<div className="relative float-left w-3/4">
				<Field
					className="w-full rounded border-2 border-gray-300 p-3"
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
			name: "foo",
			label: "foo",
			type: "string",
		},
	],
};