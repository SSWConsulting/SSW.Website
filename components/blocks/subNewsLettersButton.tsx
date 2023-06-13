import React, { useState } from "react";
import Image from "next/image";
import { Template } from "tinacms";
import axios from "axios";

/**
 * A component for subscribing to newsletters.
 * @param headerText - The text to display above the form.
 * @param subscribeButtonText - The text to display on the subscribe button.
 * @param subscribeSubTitle - The text to display below the headerText.
 */
const placeholder = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Your Email",
};

export const SubNewsLettersButton = ({ headerText, subscribeButtonText, subscribeSubTitle }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isContactExisting, setIsContactExisting] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setInfoMessage("");
    if (email === "" || firstName === "" || lastName === "") {
      setAllInputsFilled(false);
      setInfoMessage("Please fill out all fields.");
      return;
    }

    setAllInputsFilled(true);
    setIsLoading(true);
    setInfoMessage("Subscribing to the newsletter...");
    setIsContactExisting(false);

    const payload = {
      Email: email,
      FirstName: firstName,
      LastName: lastName,
    };

    try {
      const response = await axios.post(
        "/api/add-contact-to-newsletters",
        payload
      );
      resetForm();
      setInfoMessage(response.data.message);
    } catch (err) {
      if (err.response.status === 409) {
        // 409 when contact already exists
        setInfoMessage(JSON.parse(err.response.data.message).message);
      } else {
        setInfoMessage("Oops! Something went wrong.");
      }
      setIsContactExisting(true);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLastName(event.target.value);
  };

  const inputRender = (
    inputValue,
    placeholder,
    id,
    handleInputCallBack
  ): JSX.Element => (
    <div className="mx-1 mb-1 h-14">
      <input
        className="col-span-3 h-full w-full appearance-none rounded border-1 border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:shadow focus:outline md:col-span-2"
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={handleInputCallBack}
        value={inputValue}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-2 mt-6 font-helvetica text-4xl font-medium text-sswBlack" dangerouslySetInnerHTML={{ __html: headerText }}></h2>
      <div className="mb-5 text-base text-sswBlack">{subscribeSubTitle}</div>
      <div className="container flex justify-center sm:w-full sm:max-w-full md:w-3/4">
        {/* <div className=""> */}
        {inputRender(
          firstName,
          placeholder.firstName,
          Object.keys(placeholder)[0],
          handleFirstNameChange
        )}
        {inputRender(
          lastName,
          placeholder.lastName,
          Object.keys(placeholder)[1],
          handleLastNameChange
        )}
        <span className="w-80">
          {inputRender(
            email,
            placeholder.email,
            Object.keys(placeholder)[2],
            handleEmailChange
          )}
        </span>
        {/* </div> */}
        <div className="flex w-32 justify-center">
          <button
            className="box-border flex cursor-pointer items-center justify-center gap-1 rounded-md bg-sswRed py-2 pl-4 pr-2 font-sans uppercase text-white hover:text-gray-100 hover:opacity-95"
            onClick={handleSubscribe}
          >
            {subscribeButtonText}
            <Image
              className="inline-block align-middle leading-8"
              style={{ margin: 0 }}
              src={"/images/icons/circle-tick.png"}
              alt="circle-tick"
              height={24}
              width={24}
            />
          </button>
        </div>
        <p
          className={`mt-2 flex justify-center text-sm ${isContactExisting || !allInputsFilled
            ? "text-sswRed"
            : "text-green-500"
            }`}
        >
          <span className={isLoading ? "text-gray-500" : ""}>
            {infoMessage}
          </span>
        </p>
      </div>
    </div>
  );
};

export const subNewsLettersButtonSchema: Template = {
  name: "SubNewsLettersButton",
  label: "Subscribe To NewsLetters Button",
  fields: [
    {
      type: "string",
      label: "Header text",
      name: "headerText",
    },
    {
      type: "string",
      label: "Subscribe button text",
      name: "subscribeButtonText",
    },
    {
      type: "string",
      label: "Subscribe sub title",
      name: "subscribeSubTitle",
    },
  ],
};
