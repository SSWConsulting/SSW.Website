import React from "react";
import { Template } from "tinacms";
import { Formik, Field, Form } from "formik";
import Button from "../button/button";

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
				<Form>
					<div className="my-10 bg-gray-75 p-8">
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
						<button className="done mx-auto my-4 py-2 px-3" onClick={() => window.print()} type="submit">
							Print and sign
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

const FormField = ({ label, id, placeholder }) => {
	return (
		<div className="relative inline-block h-auto w-full pb-3 sm:inline-flex md:grid-cols-4 ">
			<div className="float-left py-2.5 pr-2 font-bold sm:w-1/4 sm:text-right">
				<label className="mb-1" htmlFor={id}>
					{label}
				</label>
			</div>
			<div className="float-left inline-flex w-full sm:w-3/4">
				<Field
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
			name: "foo",
			label: "foo",
			type: "string",
		},
	],
};
