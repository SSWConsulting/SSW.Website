import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import FormGroupInput from "../form/formGroupInput";
import FormGroupSelect from "../form/formGroupSelect";
import FormGroupTextArea from "../form/formGroupTextArea";
import {
  ACTIVE_INPUT,
  AUSTRALIA,
  AustralianStatesList,
  CONTACT_FORM_TITLE,
  FORM_INPUT,
  FormCountriesList,
  STATE_DEFAULT_VALUE,
} from "../util/constants";
import { bookingFormSubmissionData } from "./bookingFormSubmissionData";
import { ValidationSchema } from "./validationSchema";

import { Open_Sans } from "next/font/google";
import classNames from "classnames";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";

const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
});

export const BookingForm = ({ recaptchaKey }) => {
  //Show FormStates and Active label
  const [contactSuccess, setContactSuccess] = useState(false);
  const [country, setCountry] = useState("");
  const [activeInputLabel, setActiveInputLabel] = useState({});
  const router = useRouter();
  const appInsights = useAppInsightsContext();

  const initialFormValues = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    states: STATE_DEFAULT_VALUE,
    note: "",
    company: "",
    referredCompany: "",
    referredFullName: "",
    referredEmail: "",
  };

  //Condition to avoid SSR (Server-Side Rendering) for getting page path
  let sourceWebPageURL: string;
  if (typeof window !== "undefined") {
    sourceWebPageURL = window.location.href;
  } else {
    sourceWebPageURL = "";
  }

  //ReCaptcha
  const [contactReCaptcha, setContactReCaptcha] = useState("");

  //returns true if country is Australia
  const handleStates = (country: string) => {
    return country === AUSTRALIA;
  };

  //useMemo is call, whenever country value is changed
  const isShowStates = useMemo(() => handleStates(country), [country]);

  //Changing state of Validation Schema
  const [schema, setSchema] = useState(() =>
    ValidationSchema(isShowStates, false)
  );

  const [invalidRecaptcha, setInvalidReptcha] = useState("");

  useEffect(() => {
    // every time isShowState changes, recreate the schema and set it in the state
    setSchema(ValidationSchema(isShowStates, false));
  }, [isShowStates]);

  const handleActiveInputLabel = (targetInput, value) => {
    if (targetInput !== FORM_INPUT.States && !!value.trim()) {
      setActiveInputLabel({ ...activeInputLabel, [targetInput]: true });
    } else if (targetInput === FORM_INPUT.States && isShowStates) {
      setActiveInputLabel({ ...activeInputLabel, [targetInput]: true });
    } else {
      setActiveInputLabel({ ...activeInputLabel, [targetInput]: false });
    }
  };

  const handleOnSubmit = async (values, actions) => {
    const data = bookingFormSubmissionData(
      values,
      false,
      contactReCaptcha,
      sourceWebPageURL
    );

    const method = { "Method": "Create-Lead" };
    actions.setSubmitting(false);

    await axios
      .post("/api/create-lead", data)
      .then((response) => {
        if (response.data && !response.data.success) {
          response.data = { ...response.data, data };
          appInsights.trackException(response.data, method);
          setInvalidReptcha("Invalid ReCaptcha!");
        } else {
          onSuccess();
        }
      })
      .catch((err) => {
        console.error(err);
        return alert("Failed to create lead in CRM");
      });
  };

  const onSuccess = () => {
    setInvalidReptcha("");
    setContactSuccess(true);
    setTimeout(function () {
      setContactSuccess(false);
      router.push("/thankyou/");
    }, 1000);
  };

  const getCommonFieldProps = (fieldName: string) => ({
    name: fieldName,
    activeLabelClass: activeInputLabel[fieldName]
      ? ACTIVE_INPUT.ClassShow
      : ACTIVE_INPUT.None,
    handleChange: ({ name }, e) =>
      handleActiveInputLabel(name, e.currentTarget.value),
  });

  const getDefaultOption = (fieldName: string) => {
    return {
      name: fieldName,
      value: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
    };
  };
  const locationDefaultOption = getDefaultOption(FORM_INPUT.Location);
  const statesDefaultOption = getDefaultOption(FORM_INPUT.States);

  return (
    <div
      className={classNames(
        "rounded-none bg-gray-125 font-sans",
        openSans.variable
      )}
    >
      <div className="relative p-4">
        <div className="m-0 bg-white px-6 pb-5 pt-1">
          <h2 className="mb-14 mt-1.5 pt-1.5 !text-2xl text-sswRed">
            {CONTACT_FORM_TITLE}
          </h2>
          {!!contactSuccess && (
            <div
              className={
                "relative mb-8 rounded border-1 border-solid border-green-100 bg-green-50 p-4 text-green-900"
              }
              role="alert"
            >
              An email has been sent to the SSW Sales team and someone will be
              in contact with you soon
            </div>
          )}

          <Formik
            validationSchema={schema}
            initialValues={initialFormValues}
            onSubmit={handleOnSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form noValidate>
                <FormGroupInput
                  label={ACTIVE_INPUT.FullName}
                  type="text"
                  {...getCommonFieldProps(FORM_INPUT.FullName)}
                />

                <FormGroupInput
                  label={ACTIVE_INPUT.Email}
                  type="email"
                  {...getCommonFieldProps(FORM_INPUT.Email)}
                />

                <FormGroupInput
                  label={ACTIVE_INPUT.Phone}
                  type="phone"
                  {...getCommonFieldProps(FORM_INPUT.Phone)}
                />

                <FormGroupSelect
                  label={ACTIVE_INPUT.Location}
                  {...getCommonFieldProps(locationDefaultOption.name)}
                  handleChange={(field, e) => {
                    setCountry(e.currentTarget.value);
                    handleActiveInputLabel(field.name, e.currentTarget.value);
                  }}
                >
                  <option className="hidden" value="">
                    {locationDefaultOption.value}
                  </option>
                  {FormCountriesList.map((country) => (
                    <option
                      className="cursor-pointer !p-1"
                      key={country.value}
                      value={country.value}
                    >
                      {country.label}
                    </option>
                  ))}
                </FormGroupSelect>

                {isShowStates ? (
                  <FormGroupSelect
                    label={ACTIVE_INPUT.States}
                    {...getCommonFieldProps(statesDefaultOption.name)}
                  >
                    <option className="hidden" value="">
                      {statesDefaultOption.value}
                    </option>
                    {AustralianStatesList.map((state) => (
                      <option
                        key={state.value}
                        value={state.value}
                        className="cursor-pointer !p-1"
                      >
                        {state.label}
                      </option>
                    ))}
                  </FormGroupSelect>
                ) : (
                  <input
                    type="hidden"
                    name={statesDefaultOption.name}
                    value={(values.states = STATE_DEFAULT_VALUE)}
                  />
                )}

                <FormGroupInput
                  label={ACTIVE_INPUT.Company}
                  {...getCommonFieldProps(FORM_INPUT.Company)}
                />

                <FormGroupTextArea
                  label={ACTIVE_INPUT.Note}
                  placeholder="How can we help you?"
                  rows={4}
                  maxLength={2000}
                  {...getCommonFieldProps(FORM_INPUT.Note)}
                />

                <div className="mb-4 w-full overflow-x-auto">
                  <div className="h-22 w-88">
                    {recaptchaKey && (
                      <ReCAPTCHA
                        sitekey={recaptchaKey}
                        onChange={(value) => {
                          setContactReCaptcha(value);
                        }}
                      />
                    )}
                  </div>
                  {invalidRecaptcha && (
                    <span className="text-sm text-red-600">
                      {invalidRecaptcha}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="done px-3 py-1.5"
                >
                  SUBMIT
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
