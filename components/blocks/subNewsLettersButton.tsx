import React from "react";
import Image from "next/image";
import { Template } from "tinacms";
import { AddContactToNewslettersData } from "../../services";
import axios from "axios";

export const SubNewsLettersButton = (data) => {
	const [email, setEmail] = React.useState<string>("");
	const [fullName, setFullName] = React.useState<string>("");
	const [informationMessage, setInformationMessage] =
		React.useState<string>("");
	const [isContactAlreadyExisting, setIsContactAlreadyExisting] =
		React.useState<boolean>(false);
	const [loading, setLoading] = React.useState(false);

	const handleSubscribe = async () => {
		if (email !== "" && fullName !== "") {
			setLoading(true);
			setInformationMessage("Subscription to the newsletter...");
			setIsContactAlreadyExisting(false);
			const payLoad: AddContactToNewslettersData = {
				Email: email,
				FullName: fullName,
			};
			try {
				const addContactToNewsLettersResult = await axios.post(
					"/api/add-contact-to-newsletters",
					payLoad
				);
				setInformationMessage(addContactToNewsLettersResult.data.message);
			} catch (error) {
				setInformationMessage(error.response.data.message);
				setIsContactAlreadyExisting(true);
			}
			setLoading(false);
		}
	};

	const handleOnEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setEmail(event.target.value);
	};

	const handleOnNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setFullName(event.target.value);
	};

	return (
		<div>
			<p className="mb-2">
				Subscribe to our newsletter to receive NETUG updates!
			</p>
			<div className="container sm:w-full sm:max-w-full md:w-1/4">
				<div className="mb-1">
					<input
						className="col-span-3 w-full appearance-none rounded border-1 border-gray-300 py-2 px-3 leading-tight text-gray-700 focus:shadow focus:outline md:col-span-2"
						id="fullName"
						type="text"
						placeholder="Your Full Name"
						onChange={handleOnNameChange}
						value={fullName}
					/>
				</div>
				<div className="mb-1">
					<input
						className="col-span-3 w-full appearance-none rounded border-1 border-gray-300 py-2 px-3 leading-tight text-gray-700 focus:shadow focus:outline md:col-span-2"
						id="email"
						type="email"
						placeholder="Your Email"
						onChange={handleOnEmailChange}
						value={email}
					/>
				</div>
				<div className="flex justify-center">
					<button
						className="box-border flex w-1/2 cursor-pointer items-center justify-center gap-1 bg-sswRed py-2 pl-4 pr-2 font-sans uppercase text-white hover:text-gray-100 hover:opacity-95"
						onClick={handleSubscribe}
					>
						{data.subNewsLettersButtonText ?? "join"}
						<Image
							className="inline-block align-middle leading-8"
							src={"/images/circle-tick.png"}
							alt="circle-tick"
							height={24}
							width={24}
						/>
					</button>
				</div>
				<p
					className={`mt-2 flex justify-center text-sm ${
						isContactAlreadyExisting ? "text-sswRed" : "text-green-500"
					}`}
				>
					<span className={loading ? "text-gray-500" : ""}>
						{informationMessage}
					</span>
				</p>
			</div>
		</div>
	);
};

export const subNewsLettersButtonSchema: Template = {
	label: "Subscribe To NewsLetters Button",
	name: "SubNewsLettersButton",
	ui: {
		itemProps: (item) => {
			return { label: item?.header };
		},
	},
	fields: [
		{
			type: "string",
			label: "subscribe to news letters button text",
			name: "subNewsLettersButtonText",
		},
	],
};
