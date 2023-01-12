import axios from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ConsultingContext } from "../../pages/consulting/[filename]";
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
import { ValidationSchema } from "./validationSchema";
import { bookingFormSubmissionData } from "./bookingFormSubmissionData";

export const BookingForm = () => {
  //Show FormStates and Active label
  const [contactSuccess, setContactSuccess] = useState(false);
  const [country, setCountry] = useState("");
  const [activeInputLabel, setActiveInputLabel] = useState({});
  const consultingContext = useContext(ConsultingContext);

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

  useEffect(() => {
    // every time isShowState changes, recreate the schema and set it in the state
    setSchema(ValidationSchema(isShowStates, false));
  }, [isShowStates]);

  const handleActiveInputLabel = (targetInput, value) => {
    if (
      (targetInput == ACTIVE_INPUT.FullName ||
        targetInput == ACTIVE_INPUT.Email ||
        targetInput == ACTIVE_INPUT.Phone ||
        targetInput == ACTIVE_INPUT.Location ||
        targetInput == ACTIVE_INPUT.Company ||
        targetInput == ACTIVE_INPUT.Note ||
        targetInput == ACTIVE_INPUT.ReferredCompany ||
        targetInput == ACTIVE_INPUT.ReferredFullName ||
        targetInput == ACTIVE_INPUT.ReferredEmail) &&
      !!value.trim()
    ) {
      setActiveInputLabel({ ...activeInputLabel, [targetInput]: true });
    } else if (targetInput == ACTIVE_INPUT.States && isShowStates) {
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
    actions.setSubmitting(false);

    await axios
      .post(`/ssw/api/crm/createlead`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setContactSuccess(true);
        setTimeout(function () {
          setContactSuccess(false);
          //TODO: redirect to thank you page
          // navigate("/thankyou/");
        }, 1000);
      })
      .catch(() => alert("Failed to create lead in CRM"));
  };

  const getCommonFieldProps = (label: string) => ({
    label,
    activeLabelClass: activeInputLabel[label]
      ? ACTIVE_INPUT.ClassShow
      : ACTIVE_INPUT.None,
  });

  const getDefaultOption = (fieldName: string) => {
    return {
      name: fieldName,
      value: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
    };
  };
  const locationDefaultOption = getDefaultOption(
    FORM_INPUT.Location.toLowerCase()
  );
  const statesDefaultOption = getDefaultOption(FORM_INPUT.States.toLowerCase());

  return (
    <div className="rounded-none bg-[#eee]">
      <div className="relative p-[15px]">
        <div className="m-0 bg-white p-[0.25rem_1.5rem_1.25rem]">
          <h2 className="mt-[5px] mb-[2em] pt-[5px] text-[1.8rem] text-sswRed">
            {CONTACT_FORM_TITLE}
          </h2>
          {!!contactSuccess && (
            <div className="alert alert-success mb-8" role="alert">
              An email has been sent to the SSW Sales team and someone will be
              in contact with you soon
            </div>
          )}

          <Formik
            validationSchema={schema}
            initialValues={initialFormValues}
            onSubmit={handleOnSubmit}
          >
            {({ values }) => (
              <Form noValidate>
                <FormGroupInput
                  name={FORM_INPUT.FullName}
                  type="text"
                  {...getCommonFieldProps(ACTIVE_INPUT.FullName)}
                  handleChange={(e) =>
                    handleActiveInputLabel(
                      ACTIVE_INPUT.FullName,
                      e.currentTarget.value
                    )
                  }
                />

                <FormGroupInput
                  name={FORM_INPUT.Email.toLowerCase()}
                  type="email"
                  {...getCommonFieldProps(ACTIVE_INPUT.Email)}
                  handleChange={(e) =>
                    handleActiveInputLabel(
                      ACTIVE_INPUT.Email,
                      e.currentTarget.value
                    )
                  }
                />

                <FormGroupInput
                  name={FORM_INPUT.Phone.toLowerCase()}
                  type="phone"
                  {...getCommonFieldProps(ACTIVE_INPUT.Phone)}
                  handleChange={(e) =>
                    handleActiveInputLabel(
                      ACTIVE_INPUT.Phone,
                      e.currentTarget.value
                    )
                  }
                />

                <FormGroupSelect
                  name={locationDefaultOption.name}
                  {...getCommonFieldProps(ACTIVE_INPUT.Location)}
                  handleClick={(e) => {
                    handleActiveInputLabel(
                      ACTIVE_INPUT.Location,
                      e.currentTarget.value
                    );
                  }}
                  handleChange={(e) => {
                    setCountry(e.currentTarget.value);
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
                    name={statesDefaultOption.name}
                    {...getCommonFieldProps(ACTIVE_INPUT.States)}
                    handleClick={(e) => {
                      handleActiveInputLabel(
                        ACTIVE_INPUT.States,
                        e.currentTarget.value
                      );
                    }}
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
                  name={FORM_INPUT.Company.toLowerCase()}
                  label={FORM_INPUT.Company}
                  {...getCommonFieldProps(ACTIVE_INPUT.Company)}
                  handleChange={(e) => {
                    handleActiveInputLabel(
                      ACTIVE_INPUT.Company,
                      e.currentTarget.value
                    );
                  }}
                />

                <FormGroupTextArea
                  name={FORM_INPUT.Note.toLowerCase()}
                  label={ACTIVE_INPUT.Note}
                  placeholder="Note"
                  rows={4}
                  maxLength={2000}
                  {...getCommonFieldProps(ACTIVE_INPUT.Note)}
                  handleChange={(e) => {
                    handleActiveInputLabel(
                      ACTIVE_INPUT.Note,
                      e.currentTarget.value
                    );
                  }}
                />

                <div className="mb-[1em] h-[78px] w-[304px]">
                  {consultingContext.env.recaptchaKey !== "FALSE" && (
                    <ReCAPTCHA
                      sitekey={consultingContext.env.recaptchaKey}
                      onChange={(value) => {
                        setContactReCaptcha(value);
                      }}
                    />
                  )}
                </div>

                <button type="submit" className="btn done">
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
