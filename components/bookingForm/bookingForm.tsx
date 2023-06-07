import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useContext, useMemo, useState } from "react";
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

import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import {
  RecaptchaContext,
  RecaptchaContextType,
} from "../../context/RecaptchaContext";

export const BookingForm = ({ onClose }) => {
  const { recaptchaKey } = useContext<RecaptchaContextType>(RecaptchaContext);

  //Show FormStates and Active label
  const [contactSuccess, setContactSuccess] = useState(false);
  const [country, setCountry] = useState("");
  const [activeInputLabel, setActiveInputLabel] = useState({});
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

    const method = { Method: "Create-Lead-UI", Payload: data };
    actions.setSubmitting(false);

    await axios
      .post("/api/create-lead", data)
      .then((response) => {
        if (response.data && !response.data.success) {
          appInsights?.trackException({ exception: response.data }, method);
          setInvalidReptcha("Invalid ReCaptcha!");
        } else {
          onSuccess();
        }
      })
      .catch((err) => {
        err.data = data;
        appInsights?.trackException({ exception: err }, method);
        console.error(err);
        return alert("Failed to create lead in CRM");
      });
  };

  const onSuccess = () => {
    setInvalidReptcha("");
    setContactSuccess(true);
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
    <div className="rounded-none bg-gray-125 font-sans">
      <div className="relative p-4">
        <div className="m-0 bg-white px-6 pb-5 pt-1">
          {contactSuccess && <div>
            <div className="pb-5 text-lg font-bold">
              Submitted
            </div>
            <div className="pb-5 pt-1">
              Thank you, your form has been submitted successfully. <br />
              We will be in contact as soon as possible.In the meantime, check out our other services and meet our amazing team.
            </div>
            <div className="text-end">
              <button
                className="bg-sswRed px-3 py-1.5 text-white"
                onClick={() => onClose((curr) => !curr)}
              >
                OK
              </button>
            </div>
          </div>}

          {!contactSuccess && <div>
            <h2 className="mb-14 mt-1.5 pt-1.5 !text-2xl text-sswRed">
              {CONTACT_FORM_TITLE}
            </h2>
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
          }
        </div>
      </div>
    </div>
  );
};
