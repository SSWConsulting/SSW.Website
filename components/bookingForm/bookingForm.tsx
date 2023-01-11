import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import FormGroupInput from "../form/formGroupInput";
import {
  ACTIVE_INPUT,
  AUSTRALIA,
  FORM_INPUT,
  STATE_DEFAULT_VALUE,
} from "../util/constants";
import { ValidationSchema } from "./validationSchema";

export const BookingForm = () => {
  //Show FormStates and Active label
  const [contactSuccess, setContactSuccess] = useState(false);
  const [country, setCountry] = useState("");
  const [activeInputLabel, setActiveInputLabel] = useState({});

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

  const handleOnSubmit = (values, actions) => {
    console.log("form submit", values);
  };

  return (
    <div className="rounded-none bg-[#eee]">
      <div className="relative p-[15px]">
        <div className="m-0 bg-white p-[0.25rem_1.5rem_1.25rem]">
          <h2 className="mt-[5px] mb-8 pt-[5px] text-[1.8rem] text-sswRed">
            Get your project started!
          </h2>

          <Formik
            validationSchema={schema}
            initialValues={initialFormValues}
            onSubmit={handleOnSubmit}
          >
            <FormGroupInput
              name={FORM_INPUT.FullName}
              type="text"
              label={ACTIVE_INPUT.FullName}
              activeLabelClass={
                activeInputLabel[ACTIVE_INPUT.FullName]
                  ? ACTIVE_INPUT.ClassShow
                  : ACTIVE_INPUT.None
              }
              handleChange={(e) => {
                handleActiveInputLabel(
                  ACTIVE_INPUT.FullName,
                  e.currentTarget.value
                );
              }}
            />
          </Formik>
        </div>
      </div>
    </div>
  );
};
