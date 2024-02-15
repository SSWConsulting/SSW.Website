import axios from "axios";
import React, { useState } from "react";
import { FaRegCheckCircle, FaSpinner } from "react-icons/fa";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";

const placeholder = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
};

const Default = {
  headerText:
    "Subscribe to the <span class='font-bold text-sswRed'>SSW Newsletter</span>",
  subscribeButtonText: "Subscribe",
  subscribeSubTitle: "Stay tuned for SSW News & upcoming events",
};

export type SubNewsLettersFormProps = {
  headerText?: string;
  subscribeButtonText?: string;
  subscribeSubTitle?: string;
};

/**
 * A component for subscribing to newsletters.
 * @param headerText - The text to display above the form.
 * @param subscribeButtonText - The text to display on the subscribe button.
 * @param subscribeSubTitle - The text to display below the headerText.
 */
export const SubNewsLettersForm = ({
  headerText = Default.headerText,
  subscribeButtonText = Default.subscribeButtonText,
  subscribeSubTitle = Default.subscribeSubTitle,
}: SubNewsLettersFormProps) => {
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

  return (
    <div className="flex flex-col items-center justify-center">
      <h2
        className="mb-2 mt-6 text-center font-helvetica text-4xl font-medium !text-white"
        dangerouslySetInnerHTML={{
          __html: sanitiseXSS(headerText, spanWhitelist),
        }}
      ></h2>
      <div className="mb-5 text-center text-base text-white mix-blend-difference">
        {subscribeSubTitle}
      </div>
      <div className="container flex flex-wrap justify-center sm:w-full sm:max-w-full md:w-full">
        <span className="w-full sm:w-52">
          <InputBox
            value={firstName}
            placeholder={placeholder.firstName}
            id={Object.keys(placeholder)[0]}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </span>
        <span className="w-full sm:w-52">
          <InputBox
            value={lastName}
            placeholder={placeholder.lastName}
            id={Object.keys(placeholder)[1]}
            onChange={(e) => setLastName(e.target.value)}
          />
        </span>
        <span className="w-full sm:w-80">
          <InputBox
            value={email}
            placeholder={placeholder.email}
            id={Object.keys(placeholder)[2]}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <div className="flex w-32 justify-center">
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className={`done flex h-14 w-full sm:w-auto ${
              isLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer opacity-100"
            }`}
          >
            {isLoading ? (
              <FaSpinner className="m-icon animate-spin" />
            ) : (
              <FaRegCheckCircle className="m-icon" />
            )}
            {subscribeButtonText}
          </button>
        </div>
      </div>
      <p
        className={`mt-2 flex justify-center text-sm ${
          isContactExisting || !allInputsFilled
            ? "text-sswRed"
            : "text-green-500"
        }`}
      >
        <span className={isLoading ? "text-gray-500" : ""}>{infoMessage}</span>
      </p>
    </div>
  );
};

interface InputBoxProps {
  value: string;
  placeholder: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ value, placeholder, id, onChange }: InputBoxProps) => (
  <div className="mb-3 h-14 sm:mx-1">
    <input
      className="col-span-3 size-full appearance-none rounded border-1 border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:shadow focus:outline md:col-span-2"
      id={id}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </div>
);
