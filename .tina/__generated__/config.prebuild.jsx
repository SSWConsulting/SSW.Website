var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// content/global/index.json
var global_default;
var init_global = __esm({
  "content/global/index.json"() {
    global_default = {
      header: {
        name: "SSW Consulting - Sydney, Brisbane, Melbourne, Newcastle",
        title: "SSW - Enterprise Software Development",
        description: "30+ years of Microsoft software and web development experience in Australia, France and China. We build with Angular, React, .NET, Azure, Dynamics 365 CRM.",
        url: "https://www.ssw.com.au/",
        site_name: "SSW - Enterprise Software Development",
        alternate_site_name: "SSW"
      },
      aboutUs: {
        video: {
          url: "https://www.youtube.com/embed/2G7z2mF7Onk",
          thumbnailUrl: "https://i.ytimg.com/vi/2G7z2mF7Onk/maxresdefault.jpg"
        }
      },
      breadcrumbSuffix: "SSW Consulting - Sydney, Brisbane, Melbourne, Newcastle",
      bookingButtonText: "Book a FREE Initial Meeting",
      homePageOfficeList: [
        {
          url: "/offices/sydney",
          name: "SSW Sydney Office",
          streetAddress: "Level 1, 81 - 91 Military Road",
          suburb: "Neutral Bay",
          addressLocality: "Sydney",
          addressRegion: "NSW",
          addressCountry: "Australia",
          postalCode: 2089,
          phone: "+61 2 9953 3000",
          hours: "9am - 6pm AEST",
          days: "Monday - Friday"
        },
        {
          url: "/offices/brisbane",
          name: "SSW Brisbane Office",
          streetAddress: "Level 1, 471 Adelaide Street",
          suburb: "",
          addressLocality: "Brisbane",
          addressRegion: "QLD",
          addressCountry: "Australia",
          postalCode: 4e3,
          phone: "+61 7 3077 7081",
          hours: "9am - 6pm AEST",
          days: "Monday - Friday"
        },
        {
          url: "/offices/melbourne",
          name: "SSW Melbourne Office",
          streetAddress: "Level 1, 370 Little Bourke Street",
          suburb: "",
          addressLocality: "Melbourne",
          addressRegion: "VIC",
          addressCountry: "Australia",
          postalCode: 3e3,
          phone: "+61 3 9005 2034",
          hours: "9am - 6pm AEST",
          days: "Monday - Friday"
        },
        {
          url: "/offices/newcastle",
          name: "SSW Newcastle Office",
          streetAddress: "432 Hunter St",
          suburb: "",
          addressLocality: "Newcastle",
          addressRegion: "NSW",
          addressCountry: "Australia",
          postalCode: 2300,
          phone: "+61 2 9953 3000",
          hours: "9am - 6pm AEST",
          days: "Monday - Friday"
        }
      ],
      bookingPhone: "+61 2 9953 3000",
      socials: [
        {
          type: "phone",
          title: "Call us",
          url: "tel:+61299533000",
          linkText: "CALL US"
        },
        {
          type: "youtube",
          title: "SSW on YouTube",
          url: "https://www.youtube.com/user/sswtechtalks/",
          username: "sswtechtalks"
        },
        {
          type: "linkedin",
          title: "SSW on LinkedIn",
          url: "https://www.linkedin.com/company/ssw/"
        },
        {
          type: "facebook",
          title: "SSW on Facebook",
          url: "https://www.facebook.com/SSW.page"
        },
        {
          type: "instagram",
          title: "SSW on Instagram",
          url: "https://www.instagram.com/ssw_tv",
          username: "ssw_tv"
        },
        {
          type: "twitter",
          title: "SSW on Twitter",
          url: "https://twitter.com/SSW_TV",
          username: "SSW_TV"
        },
        {
          type: "tiktok",
          title: "SSW on TikTok",
          url: "https://www.tiktok.com/@ssw_tv",
          username: "ssw_tv"
        },
        {
          type: "github",
          title: "SSW on GitHub",
          url: "https://www.github.com/sswconsulting",
          username: "sswconsulting"
        },
        {
          type: "meetup",
          url: "https://www.meetup.com/Sydney-NET-User-Group/"
        }
      ],
      clients: {
        clientsList: [
          {
            clientName: "allianz",
            imageUrl: "/images/clientLogos/allianz.jpg"
          },
          {
            clientName: "carnival",
            imageUrl: "/images/clientLogos/carnival.jpg"
          },
          {
            clientName: "cisco",
            imageUrl: "/images/clientLogos/cisco.jpg"
          },
          {
            clientName: "commonwealthbank",
            imageUrl: "/images/clientLogos/commbank.jpg"
          },
          {
            clientName: "symantec",
            imageUrl: "/images/clientLogos/symatec.jpg"
          },
          {
            clientName: "domain",
            imageUrl: "/images/clientLogos/domain.jpg"
          },
          {
            clientName: "eventcinemas",
            imageUrl: "/images/clientLogos/events.jpg"
          },
          {
            clientName: "microsoft",
            imageUrl: "/images/clientLogos/microsoft.jpg"
          },
          {
            clientName: "toll",
            imageUrl: "/images/clientLogos/toll.jpg"
          }
        ]
      },
      apps: {
        sswRewards: {
          link: {
            appStore: "https://apps.apple.com/au/app/ssw-rewards/id1482994853",
            googlePlay: "https://play.google.com/store/apps/details?id=com.ssw.consulting&hl=en&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          }
        }
      },
      youtubeChannelLink: "https://www.youtube.com/@SSWTV",
      officesIndex: [
        {
          office: "content/offices/sydney.mdx"
        },
        {
          office: "content/offices/brisbane.mdx"
        },
        {
          office: "content/offices/melbourne.mdx"
        },
        {
          office: "content/offices/newcastle.mdx"
        },
        {
          office: "content/offices/hangzhou.mdx"
        },
        {
          office: "content/offices/strasbourg.mdx"
        }
      ]
    };
  }
});

// components/button/ripple.tsx
import classNames from "classnames";
var Ripple;
var init_ripple = __esm({
  "components/button/ripple.tsx"() {
    Ripple = ({ className, hover }) => {
      return React.createElement(
        "div",
        {
          className: classNames(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 before:relative before:mt-[100%] before:block before:content-[''] after:absolute after:inset-0 after:rounded-[50%] after:content-['']",
            hover && "animate-ripple after:animate-ripple-pseudo",
            className
          )
        }
      );
    };
  }
});

// components/button/button.tsx
import classNames2 from "classnames";
import { useState } from "react";
var Button, button_default;
var init_button = __esm({
  "components/button/button.tsx"() {
    init_ripple();
    Button = ({
      children,
      ripple,
      defaultClass = "bg-sswRed text-white rounded",
      ...props
    }) => {
      const [hover, setHover] = useState(false);
      const buttonClassName = classNames2(
        ripple && "relative h-[90px] overflow-hidden border-none text-[1.6rem]",
        props["className"],
        defaultClass
      );
      return React.createElement(
        "button",
        {
          type: "button",
          ...props,
          className: buttonClassName,
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false)
        },
        children,
        ripple && React.createElement(Ripple, { hover })
      );
    };
    button_default = Button;
  }
});

// components/button/utilityButton.tsx
import classNames3 from "classnames";
var UtilityButton, utilityButtonSchema;
var init_utilityButton = __esm({
  "components/button/utilityButton.tsx"() {
    init_button();
    UtilityButton = ({
      buttonText,
      onClick,
      className,
      link
    }) => {
      const baseComponent = React.createElement(
        button_default,
        {
          ripple: true,
          className: classNames3(
            "mx-auto mt-8 h-auto max-w-full px-10 py-3",
            className
          ),
          onClick,
          "data-aos": "fade-up"
        },
        buttonText
      );
      if (link) {
        return React.createElement("div", null, React.createElement("a", { href: link, className: "unstyled no-underline" }, baseComponent));
      }
      return baseComponent;
    };
    utilityButtonSchema = {
      name: "UtilityButton",
      label: "Utility Button",
      ui: {
        previewSrc: "/blocks/hero.png",
        itemProps: (item) => ({ label: item?.btnText })
      },
      fields: [
        {
          type: "string",
          label: "Button Text",
          name: "buttonText",
          required: false,
          isBody: true
        },
        {
          type: "string",
          label: "Link",
          name: "link",
          required: false
        }
      ]
    };
  }
});

// components/popup/popup.module.css
var popup_module_default;
var init_popup_module = __esm({
  "components/popup/popup.module.css"() {
    popup_module_default = "./popup.module-FIWROKEC.css";
  }
});

// components/popup/popup.tsx
import classNames4 from "classnames";
import Modal from "react-responsive-modal";
var Popup, popup_default;
var init_popup = __esm({
  "components/popup/popup.tsx"() {
    init_popup_module();
    Popup = ({ isVisible, onClose, children, className = "" }) => {
      return React.createElement("div", null, React.createElement(
        Modal,
        {
          open: isVisible,
          onClose,
          showCloseIcon: false,
          classNames: {
            modalAnimationIn: popup_module_default.formEnterModalAnimation,
            modalAnimationOut: popup_module_default.formLeaveModalAnimation,
            overlay: "bg-black/50",
            modal: classNames4([
              "sm:max-w-2xl sm:m-5 sm:p-5",
              "w-full mx-0",
              "shadow-none bg-black/0",
              className
            ])
          },
          animationDuration: 700,
          center: true
        },
        children
      ));
    };
    popup_default = Popup;
  }
});

// components/successToast/successToast.tsx
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
var SuccessToast, successToast_default;
var init_successToast = __esm({
  "components/successToast/successToast.tsx"() {
    SuccessToast = () => {
      return React.createElement("div", null, React.createElement(
        ToastContainer,
        {
          position: "top-right",
          autoClose: 5e3,
          hideProgressBar: true,
          newestOnTop: true,
          closeOnClick: false,
          rtl: false,
          pauseOnFocusLoss: false,
          draggable: false,
          pauseOnHover: true,
          theme: "dark"
        }
      ));
    };
    successToast_default = SuccessToast;
  }
});

// components/form/formGroup.module.css
var formGroup_module_default;
var init_formGroup_module = __esm({
  "components/form/formGroup.module.css"() {
    formGroup_module_default = "./formGroup.module-ZFP4VTLQ.css";
  }
});

// components/form/formGroupInput.tsx
import classNames5 from "classnames";
import { ErrorMessage, Field, useField } from "formik";
var FormGroupInput, formGroupInput_default;
var init_formGroupInput = __esm({
  "components/form/formGroupInput.tsx"() {
    init_formGroup_module();
    FormGroupInput = ({
      label,
      activeLabelClass,
      fieldClass,
      errorMessageClass,
      handleChange,
      ...props
    }) => {
      const [field, meta] = useField(props);
      !props.placeholder && (props.placeholder = label);
      return React.createElement(
        "div",
        {
          className: classNames5(
            formGroup_module_default["field-wrapper"],
            "relative mb-5 block py-1.5"
          )
        },
        React.createElement("label", { htmlFor: field.name, className: formGroup_module_default[activeLabelClass] }, label),
        React.createElement(Field, { name: field.name }, ({ field: field2 }) => {
          const inputOnChange = (e) => {
            field2.onChange(e);
            !!handleChange && handleChange(field2, e);
          };
          return React.createElement(
            "input",
            {
              ...field2,
              ...props,
              className: classNames5(
                fieldClass || formGroup_module_default["form-control"],
                !!meta.error && formGroup_module_default["is-invalid"]
              ),
              onChange: inputOnChange
            }
          );
        }),
        React.createElement(
          ErrorMessage,
          {
            name: field.name,
            className: errorMessageClass || formGroup_module_default["invalid-feedback"],
            component: "div"
          }
        )
      );
    };
    formGroupInput_default = FormGroupInput;
  }
});

// components/form/formGroupSelect.tsx
import classNames6 from "classnames";
import { ErrorMessage as ErrorMessage2, Field as Field2, useField as useField2 } from "formik";
var FormGroupSelect, formGroupSelect_default;
var init_formGroupSelect = __esm({
  "components/form/formGroupSelect.tsx"() {
    init_formGroup_module();
    FormGroupSelect = ({
      label,
      activeLabelClass,
      fieldClass,
      errorMessageClass,
      handleChange,
      handleClick,
      ...props
    }) => {
      const [field, meta] = useField2(props);
      return React.createElement("div", { className: formGroup_module_default["field-wrapper"] }, React.createElement(
        "label",
        {
          htmlFor: props.id || props.name,
          className: formGroup_module_default[activeLabelClass]
        },
        label
      ), React.createElement(Field2, { name: field.name }, ({ field: field2 }) => {
        const selectOnChange = (e) => {
          field2.onChange(e);
          !!handleChange && handleChange(field2, e);
        };
        return React.createElement(
          "select",
          {
            ...field2,
            ...props,
            className: classNames6(
              fieldClass || formGroup_module_default["form-select"],
              !!meta.error && formGroup_module_default["is-invalid"]
            ),
            onChange: selectOnChange,
            onClick: handleClick
          },
          props.children
        );
      }), React.createElement(
        ErrorMessage2,
        {
          name: props.name,
          className: errorMessageClass || formGroup_module_default["invalid-feedback"],
          component: "div"
        }
      ));
    };
    formGroupSelect_default = FormGroupSelect;
  }
});

// components/form/formGroupTextArea.tsx
import classNames7 from "classnames";
import { ErrorMessage as ErrorMessage3, Field as Field3, useField as useField3 } from "formik";
var FormGroupTextArea, formGroupTextArea_default;
var init_formGroupTextArea = __esm({
  "components/form/formGroupTextArea.tsx"() {
    init_formGroup_module();
    FormGroupTextArea = ({
      label,
      activeLabelClass,
      fieldClass,
      errorMessageClass,
      handleChange,
      ...props
    }) => {
      const [field, meta] = useField3(props);
      !props.placeholder && (props.placeholder = label);
      return React.createElement("div", { className: formGroup_module_default["field-wrapper"] }, React.createElement(
        "label",
        {
          htmlFor: props.id || props.name,
          className: formGroup_module_default[activeLabelClass]
        },
        label
      ), React.createElement(Field3, { name: field.name }, ({ field: field2 }) => {
        const textAreaOnChange = (e) => {
          field2.onChange(e);
          !!handleChange && handleChange(field2, e);
        };
        return React.createElement(
          "textarea",
          {
            ...field2,
            ...props,
            className: classNames7(
              fieldClass || formGroup_module_default["form-control"],
              !!meta.error && formGroup_module_default["is-invalid"]
            ),
            onChange: textAreaOnChange
          }
        );
      }), React.createElement("small", null, "Maximum 2000 characters"), React.createElement(
        ErrorMessage3,
        {
          name: field.name,
          className: errorMessageClass || formGroup_module_default["invalid-feedback"],
          component: "div"
        }
      ));
    };
    formGroupTextArea_default = FormGroupTextArea;
  }
});

// components/util/constants.tsx
var AUSTRALIA, FormCountriesList, CONTACT_FORM_TITLE, VALIDATION_ERROR_MESSAGE, STATE_DEFAULT_VALUE, ACTIVE_INPUT, FORM_INPUT, AustralianStatesList, months, ReferralSource, ReferralSourceList;
var init_constants = __esm({
  "components/util/constants.tsx"() {
    AUSTRALIA = "Australia";
    FormCountriesList = [
      {
        label: "Australia",
        value: "Australia"
      },
      {
        label: "China",
        value: "China"
      },
      {
        label: "Europe",
        value: "Europe"
      },
      {
        label: "South America",
        value: "South America"
      },
      {
        label: "USA",
        value: "USA"
      },
      {
        label: "Other",
        value: "Other"
      }
    ];
    CONTACT_FORM_TITLE = "Get your project started!";
    VALIDATION_ERROR_MESSAGE = {
      FULL_NAME: "Please enter your first name and last name.",
      EMAIL: "Doesn\u2019t look like a valid email.",
      PHONE: "Please enter your phone number.",
      LOCATION: "Select your country.",
      STATES: "Select your state.",
      NOTE: "A message is required.",
      REFERRED_FULL_NAME: "Please enter referred name",
      REFERRED_EMAIL: "Please enter referred email",
      REFERRAL_SOURCE: "Please select referral source."
    };
    STATE_DEFAULT_VALUE = "100000008";
    ACTIVE_INPUT = {
      FullName: "Your Full Name *",
      Email: "Your Email *",
      Phone: "Your Phone *",
      Location: "Your Location",
      States: "State",
      Note: "Message",
      Company: "Your Company",
      ClassShow: "show",
      ReferredCompany: "Referred Company",
      ReferredFullName: "Referred Full Name",
      ReferredEmail: "Referred Email",
      None: "",
      ReferralSource: "Referral Source"
    };
    FORM_INPUT = {
      FullName: "fullName",
      Email: "email",
      Phone: "phone",
      Location: "location",
      States: "states",
      Note: "note",
      Company: "company",
      ClassShow: "show",
      ReferredCompany: "referredCompany",
      ReferredFullName: "referredFullName",
      ReferredEmail: "referredEmail",
      None: "",
      ReferralSource: "referralSource"
    };
    AustralianStatesList = [
      {
        label: "Australian Capital Territory",
        value: "100000003"
      },
      {
        label: "New South Wales",
        value: "100000000"
      },
      {
        label: "Northern Territory",
        value: "100000006"
      },
      {
        label: "Queensland",
        value: "100000002"
      },
      {
        label: "South Australia",
        value: "100000004"
      },
      {
        label: "Tasmania",
        value: "100000007"
      },
      {
        label: "Victoria",
        value: "100000001"
      },
      {
        label: "Western Australia",
        value: "100000005"
      }
    ];
    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    ReferralSource = {
      Conference: 8,
      Google: 1,
      ["Government Suppliers List"]: 20,
      ["Outbound Call"]: 15,
      ["Repeat Business"]: 4,
      [".NET User Group"]: 3,
      ["SSW Training Event"]: 2,
      Referral: 12,
      Signage: 7,
      ["Yellow Pages"]: 9,
      ["SSW TV"]: 17,
      Webinars: 16,
      ["Other search engines"]: 10,
      Other: 14
    };
    ReferralSourceList = Object.keys(ReferralSource).map((key) => {
      return {
        label: key,
        value: ReferralSource[key]
      };
    });
  }
});

// components/bookingForm/bookingFormSubmissionData.ts
var bookingFormSubmissionData;
var init_bookingFormSubmissionData = __esm({
  "components/bookingForm/bookingFormSubmissionData.ts"() {
    bookingFormSubmissionData = (values, isShareForm, contactReCaptcha, sourceWebPageURL) => {
      const subject = isShareForm ? `Share This Page enquiry - ${values.referredCompany} - ${values.fullName}` : `Consulting enquiry - ${values.company} - ${values.fullName}`;
      let body = "Consulting enquiry from " + document.URL + "<br/>";
      body = body + "Company: " + (isShareForm ? values.referredCompany : values.company) + "<br/>";
      body = body + `Country: ${values.location}<br/>`;
      body = body + `State: ${values.states}<br/>`;
      body = body + "Name:  " + (isShareForm ? values.referredFullName : values.fullName) + "<br/>";
      body = body + `Phone: ${values.phone}<br/>`;
      body = body + "Email:   " + (isShareForm ? values.referredEmail : values.email) + "<br/>";
      body = body + (isShareForm ? `Referred By: ${values.fullName} (${values.email})` : `Note: ${values.note}`) + "<br/><br/>";
      const data = {
        Name: isShareForm ? values.referredFullName : values.fullName,
        Topic: subject,
        Company: isShareForm ? values.referredCompany : values.company,
        ...!isShareForm && { Note: values.note },
        Country: values.location,
        State: values.states,
        Email: isShareForm ? values.referredEmail : values.email,
        Phone: values.phone,
        Recaptcha: contactReCaptcha,
        SourceWebPageURL: sourceWebPageURL,
        EmailSubject: subject,
        EmailBody: body + "The associated CRM lead is ",
        ReferralSource: values.referralSource
      };
      return data;
    };
  }
});

// components/bookingForm/validationSchema.tsx
import * as yup from "yup";
var ValidationSchema;
var init_validationSchema = __esm({
  "components/bookingForm/validationSchema.tsx"() {
    init_constants();
    ValidationSchema = (isShowStates, isShareForm) => yup.object().shape({
      fullName: yup.string().required(VALIDATION_ERROR_MESSAGE.FULL_NAME),
      email: yup.string().email().required(VALIDATION_ERROR_MESSAGE.EMAIL),
      phone: yup.string().required(VALIDATION_ERROR_MESSAGE.PHONE),
      location: yup.string().required(VALIDATION_ERROR_MESSAGE.LOCATION),
      states: isShowStates ? yup.string().notOneOf([STATE_DEFAULT_VALUE, ""], VALIDATION_ERROR_MESSAGE.STATES) : yup.string(),
      referralSource: yup.string().required(VALIDATION_ERROR_MESSAGE.REFERRAL_SOURCE),
      note: isShareForm ? yup.string() : yup.string().required(VALIDATION_ERROR_MESSAGE.NOTE),
      referredFullName: isShareForm ? yup.string().required(VALIDATION_ERROR_MESSAGE.REFERRED_FULL_NAME) : yup.string(),
      referredEmail: isShareForm ? yup.string().email().required(VALIDATION_ERROR_MESSAGE.REFERRED_EMAIL) : yup.string()
    });
  }
});

// context/RecaptchaContext.ts
import { createContext } from "react";
var RecaptchaContext;
var init_RecaptchaContext = __esm({
  "context/RecaptchaContext.ts"() {
    RecaptchaContext = createContext(null);
  }
});

// components/bookingForm/bookingForm.tsx
var bookingForm_exports = {};
__export(bookingForm_exports, {
  BookingForm: () => BookingForm
});
import axios from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useMemo, useState as useState2 } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaRegCheckCircle, FaSpinner } from "react-icons/fa";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
var BookingForm;
var init_bookingForm = __esm({
  "components/bookingForm/bookingForm.tsx"() {
    init_formGroupInput();
    init_formGroupSelect();
    init_formGroupTextArea();
    init_constants();
    init_bookingFormSubmissionData();
    init_validationSchema();
    init_RecaptchaContext();
    BookingForm = (props) => {
      const { recaptchaKey } = useContext(RecaptchaContext);
      const [country, setCountry] = useState2("");
      const [activeInputLabel, setActiveInputLabel] = useState2({});
      const appInsights = useAppInsightsContext();
      const { onClose, showSuccessToast } = props;
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
        referralSource: ""
      };
      let sourceWebPageURL;
      if (typeof window !== "undefined") {
        sourceWebPageURL = window.location.href;
      } else {
        sourceWebPageURL = "";
      }
      const [contactReCaptcha, setContactReCaptcha] = useState2("");
      const [loading, setLoading] = useState2(false);
      const handleStates = (country2) => {
        return country2 === AUSTRALIA;
      };
      const isShowStates = useMemo(() => handleStates(country), [country]);
      const [schema, setSchema] = useState2(
        () => ValidationSchema(isShowStates, false)
      );
      const [invalidRecaptcha, setInvalidReptcha] = useState2("");
      useEffect(() => {
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
        setLoading(true);
        const method = { Method: "Create-Lead-UI", Payload: data };
        actions.setSubmitting(false);
        await axios.post("/api/create-lead", data).then((response) => {
          if (response.data && !response.data.success) {
            appInsights?.trackException({ exception: response.data }, method);
            setInvalidReptcha("Invalid ReCaptcha!");
          } else {
            onSuccess();
            actions.resetForm(initialFormValues);
          }
          setLoading(false);
        }).catch((err) => {
          err.data = data;
          appInsights?.trackException({ exception: err }, method);
          console.error(err);
          setLoading(false);
          return alert("Failed to create lead in CRM");
        });
      };
      const onSuccess = () => {
        setInvalidReptcha("");
        if (onClose !== void 0) {
          onClose();
        }
        showSuccessToast();
        setLoading(false);
      };
      const getCommonFieldProps = (fieldName) => ({
        name: fieldName,
        activeLabelClass: activeInputLabel[fieldName] ? ACTIVE_INPUT.ClassShow : ACTIVE_INPUT.None,
        handleChange: ({ name }, e) => handleActiveInputLabel(name, e.currentTarget.value)
      });
      const getDefaultOption = (fieldName) => {
        return {
          name: fieldName,
          value: fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        };
      };
      const locationDefaultOption = getDefaultOption(FORM_INPUT.Location);
      const statesDefaultOption = getDefaultOption(FORM_INPUT.States);
      const referralSourcesDefaultOption = getDefaultOption(
        FORM_INPUT.ReferralSource
      );
      return React.createElement("div", { className: "rounded bg-white font-sans" }, React.createElement("div", { className: "relative rounded p-2" }, React.createElement("div", { className: "m-0 rounded bg-white px-6 pb-5 pt-1" }, React.createElement("h2", { className: "mb-14 mt-1.5 pt-1.5 !text-2xl text-sswRed" }, CONTACT_FORM_TITLE), React.createElement(
        Formik,
        {
          validationSchema: schema,
          initialValues: initialFormValues,
          onSubmit: handleOnSubmit
        },
        ({ values, isSubmitting }) => React.createElement(Form, { noValidate: true }, React.createElement(
          formGroupInput_default,
          {
            label: ACTIVE_INPUT.FullName,
            type: "text",
            ...getCommonFieldProps(FORM_INPUT.FullName)
          }
        ), React.createElement(
          formGroupInput_default,
          {
            label: ACTIVE_INPUT.Email,
            type: "email",
            ...getCommonFieldProps(FORM_INPUT.Email)
          }
        ), React.createElement(
          formGroupInput_default,
          {
            label: ACTIVE_INPUT.Phone,
            type: "phone",
            ...getCommonFieldProps(FORM_INPUT.Phone)
          }
        ), React.createElement(
          formGroupSelect_default,
          {
            label: ACTIVE_INPUT.Location,
            ...getCommonFieldProps(locationDefaultOption.name),
            handleChange: (field, e) => {
              setCountry(e.currentTarget.value);
              handleActiveInputLabel(field.name, e.currentTarget.value);
            }
          },
          React.createElement("option", { className: "hidden", value: "" }, locationDefaultOption.value),
          FormCountriesList.map((country2) => React.createElement(
            "option",
            {
              className: "cursor-pointer !p-1",
              key: country2.value,
              value: country2.value
            },
            country2.label
          ))
        ), isShowStates ? React.createElement(
          formGroupSelect_default,
          {
            label: ACTIVE_INPUT.States,
            ...getCommonFieldProps(statesDefaultOption.name)
          },
          React.createElement("option", { className: "hidden", value: "" }, statesDefaultOption.value),
          AustralianStatesList.map((state) => React.createElement(
            "option",
            {
              key: state.value,
              value: state.value,
              className: "cursor-pointer !p-1"
            },
            state.label
          ))
        ) : React.createElement(
          "input",
          {
            type: "hidden",
            name: statesDefaultOption.name,
            value: values.states = STATE_DEFAULT_VALUE
          }
        ), React.createElement(
          formGroupInput_default,
          {
            label: ACTIVE_INPUT.Company,
            ...getCommonFieldProps(FORM_INPUT.Company)
          }
        ), React.createElement(
          formGroupSelect_default,
          {
            label: ACTIVE_INPUT.ReferralSource,
            name: FORM_INPUT.ReferralSource,
            ...getCommonFieldProps(referralSourcesDefaultOption.name)
          },
          React.createElement("option", { className: "hidden", value: "" }, "How did you hear about us?"),
          ReferralSourceList.map((source) => {
            return React.createElement(
              "option",
              {
                className: "cursor-pointer !p-1",
                key: source.value,
                value: source.value
              },
              source.label
            );
          })
        ), React.createElement(
          formGroupTextArea_default,
          {
            label: ACTIVE_INPUT.Note,
            placeholder: "How can we help you?",
            rows: 4,
            maxLength: 2e3,
            ...getCommonFieldProps(FORM_INPUT.Note)
          }
        ), React.createElement("div", { className: "mb-4 w-full overflow-x-auto" }, React.createElement("div", { className: "h-22 w-88" }, recaptchaKey && React.createElement(
          ReCAPTCHA,
          {
            sitekey: recaptchaKey,
            onChange: (value) => {
              setContactReCaptcha(value);
            }
          }
        )), invalidRecaptcha && React.createElement("span", { className: "text-sm text-red-600" }, invalidRecaptcha)), isSubmitting, React.createElement("div", { className: "flex justify-end" }, React.createElement(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: `done flex w-full sm:w-auto ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"}`
          },
          loading ? React.createElement(FaSpinner, { className: "m-icon animate-spin" }) : React.createElement(FaRegCheckCircle, { className: "m-icon" }),
          loading ? "Processing" : "SUBMIT"
        )))
      ))));
    };
  }
});

// components/bookingButton/bookingButton.tsx
var bookingButton_exports = {};
__export(bookingButton_exports, {
  BookingButton: () => BookingButton,
  bookingButtonSchema: () => bookingButtonSchema
});
import classNames8 from "classnames";
import dynamic from "next/dynamic";
import { useState as useState3 } from "react";
import { toast } from "react-toastify";
var BookingForm2, BookingButton, bookingButtonSchema;
var init_bookingButton = __esm({
  "components/bookingButton/bookingButton.tsx"() {
    init_global();
    init_utilityButton();
    init_popup();
    init_successToast();
    BookingForm2 = dynamic(
      () => Promise.resolve().then(() => (init_bookingForm(), bookingForm_exports)).then((mod) => mod.BookingForm),
      { ssr: false }
    );
    BookingButton = ({
      buttonText,
      containerClass,
      buttonClass
    }) => {
      const [isVisible, setIsVisible] = useState3(false);
      const showBookingForm = () => setIsVisible((curr) => !curr);
      const bookingPhone = global_default.bookingPhone;
      const showSuccessToast = () => {
        toast.success(
          React.createElement("div", { className: "text-left" }, "Form submitted. We'll be in contact as soon as possible.")
        );
      };
      return React.createElement(
        "div",
        {
          className: classNames8(
            "flex w-full flex-col items-center",
            containerClass
          )
        },
        React.createElement(
          UtilityButton,
          {
            className: classNames8(buttonClass, "mt-14"),
            onClick: showBookingForm,
            buttonText
          }
        ),
        React.createElement("h2", { className: "mx-auto max-w-full text-center" }, "or call us on ", bookingPhone),
        React.createElement(popup_default, { isVisible, onClose: setIsVisible }, isVisible && React.createElement(
          BookingForm2,
          {
            onClose: setIsVisible,
            showSuccessToast
          }
        )),
        React.createElement(successToast_default, null)
      );
    };
    bookingButtonSchema = {
      name: "BookingButton",
      label: "Booking Button",
      ui: {
        previewSrc: "/blocks/hero.png",
        itemProps: (item) => ({ label: item?.btnText })
      },
      fields: [
        {
          type: "string",
          label: "Button Text",
          name: "buttonText",
          required: false
        }
      ]
    };
  }
});

// components/util/container.tsx
import React2 from "react";
import { classNames as classNames9 } from "tinacms";
var Container;
var init_container = __esm({
  "components/util/container.tsx"() {
    Container = ({
      children,
      size = "default",
      width = "default",
      padding = "px-8",
      className = "",
      ...props
    }) => {
      const verticalPadding = {
        custom: "",
        xsmall: "py-4",
        small: "py-8",
        medium: "py-12",
        large: "py-24",
        default: "py-12"
      };
      const widthClass = {
        small: "max-w-4xl",
        medium: "max-w-5xl",
        large: "max-w-9xl",
        default: "max-w-9xl",
        custom: ""
      };
      return React2.createElement(
        "div",
        {
          className: classNames9(
            "mx-auto",
            padding,
            widthClass[width],
            verticalPadding[size],
            className
          ),
          ...props
        },
        children
      );
    };
  }
});

// components/util/constants/styles.tsx
var sectionColors;
var init_styles = __esm({
  "components/util/constants/styles.tsx"() {
    sectionColors = {
      default: "bg-white text-black",
      lightgray: "bg-gray-100 text-black",
      red: "bg-sswRed text-white",
      black: "bg-black text-white"
    };
  }
});

// components/util/section.tsx
import React5 from "react";
import classNames12 from "classnames";
var Section;
var init_section = __esm({
  "components/util/section.tsx"() {
    init_styles();
    Section = ({
      children,
      color = "",
      className = "",
      style = {},
      id = ""
    }) => {
      const sectionColorCss = sectionColors[color] || sectionColors.default;
      return React5.createElement(
        "section",
        {
          id,
          className: classNames12(
            "body-font relative flex flex-1 overflow-hidden transition duration-150 ease-out",
            sectionColorCss,
            className
          ),
          style
        },
        children
      );
    };
  }
});

// .tina/__generated__/types.ts
import { createClient } from "tinacms/dist/client";
function gql(strings, ...args) {
  let str = "";
  strings.forEach((string2, i) => {
    str += string2 + (args[i] || "");
  });
  return str;
}
function getSdk(requester) {
  return {
    contentQuery(variables, options) {
      return requester(ContentQueryDocument, variables, options);
    },
    consultingContentQuery(variables, options) {
      return requester(ConsultingContentQueryDocument, variables, options);
    },
    videoProductionContentQuery(variables, options) {
      return requester(VideoProductionContentQueryDocument, variables, options);
    },
    officeContentQuery(variables, options) {
      return requester(OfficeContentQueryDocument, variables, options);
    },
    trainingContentQuery(variables, options) {
      return requester(TrainingContentQueryDocument, variables, options);
    },
    allTestimonialsQuery(variables, options) {
      return requester(AllTestimonialsQueryDocument, variables, options);
    },
    testimonalsQuery(variables, options) {
      return requester(TestimonalsQueryDocument, variables, options);
    },
    technologyCardContentQuery(variables, options) {
      return requester(TechnologyCardContentQueryDocument, variables, options);
    },
    employmentPageQuery(variables, options) {
      return requester(EmploymentPageQueryDocument, variables, options);
    },
    officeIndexQuery(variables, options) {
      return requester(OfficeIndexQueryDocument, variables, options);
    },
    productContentQuery(variables, options) {
      return requester(ProductContentQueryDocument, variables, options);
    },
    industryContentQuery(variables, options) {
      return requester(IndustryContentQueryDocument, variables, options);
    },
    presetsQuery(variables, options) {
      return requester(PresetsQueryDocument, variables, options);
    },
    marketing(variables, options) {
      return requester(MarketingDocument, variables, options);
    },
    marketingConnection(variables, options) {
      return requester(MarketingConnectionDocument, variables, options);
    },
    global(variables, options) {
      return requester(GlobalDocument, variables, options);
    },
    globalConnection(variables, options) {
      return requester(GlobalConnectionDocument, variables, options);
    },
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    },
    consultingIndex(variables, options) {
      return requester(ConsultingIndexDocument, variables, options);
    },
    consultingIndexConnection(variables, options) {
      return requester(ConsultingIndexConnectionDocument, variables, options);
    },
    consultingCategory(variables, options) {
      return requester(ConsultingCategoryDocument, variables, options);
    },
    consultingCategoryConnection(variables, options) {
      return requester(ConsultingCategoryConnectionDocument, variables, options);
    },
    consultingTag(variables, options) {
      return requester(ConsultingTagDocument, variables, options);
    },
    consultingTagConnection(variables, options) {
      return requester(ConsultingTagConnectionDocument, variables, options);
    },
    consulting(variables, options) {
      return requester(ConsultingDocument, variables, options);
    },
    consultingConnection(variables, options) {
      return requester(ConsultingConnectionDocument, variables, options);
    },
    videoProduction(variables, options) {
      return requester(VideoProductionDocument, variables, options);
    },
    videoProductionConnection(variables, options) {
      return requester(VideoProductionConnectionDocument, variables, options);
    },
    testimonials(variables, options) {
      return requester(TestimonialsDocument, variables, options);
    },
    testimonialsConnection(variables, options) {
      return requester(TestimonialsConnectionDocument, variables, options);
    },
    testimonialCategories(variables, options) {
      return requester(TestimonialCategoriesDocument, variables, options);
    },
    testimonialCategoriesConnection(variables, options) {
      return requester(TestimonialCategoriesConnectionDocument, variables, options);
    },
    technologies(variables, options) {
      return requester(TechnologiesDocument, variables, options);
    },
    technologiesConnection(variables, options) {
      return requester(TechnologiesConnectionDocument, variables, options);
    },
    offices(variables, options) {
      return requester(OfficesDocument, variables, options);
    },
    officesConnection(variables, options) {
      return requester(OfficesConnectionDocument, variables, options);
    },
    opportunities(variables, options) {
      return requester(OpportunitiesDocument, variables, options);
    },
    opportunitiesConnection(variables, options) {
      return requester(OpportunitiesConnectionDocument, variables, options);
    },
    employment(variables, options) {
      return requester(EmploymentDocument, variables, options);
    },
    employmentConnection(variables, options) {
      return requester(EmploymentConnectionDocument, variables, options);
    },
    officeIndex(variables, options) {
      return requester(OfficeIndexDocument, variables, options);
    },
    officeIndexConnection(variables, options) {
      return requester(OfficeIndexConnectionDocument, variables, options);
    },
    productsIndex(variables, options) {
      return requester(ProductsIndexDocument, variables, options);
    },
    productsIndexConnection(variables, options) {
      return requester(ProductsIndexConnectionDocument, variables, options);
    },
    products(variables, options) {
      return requester(ProductsDocument, variables, options);
    },
    productsConnection(variables, options) {
      return requester(ProductsConnectionDocument, variables, options);
    },
    training(variables, options) {
      return requester(TrainingDocument, variables, options);
    },
    trainingConnection(variables, options) {
      return requester(TrainingConnectionDocument, variables, options);
    },
    newsletters(variables, options) {
      return requester(NewslettersDocument, variables, options);
    },
    newslettersConnection(variables, options) {
      return requester(NewslettersConnectionDocument, variables, options);
    },
    presenter(variables, options) {
      return requester(PresenterDocument, variables, options);
    },
    presenterConnection(variables, options) {
      return requester(PresenterConnectionDocument, variables, options);
    },
    locations(variables, options) {
      return requester(LocationsDocument, variables, options);
    },
    locationsConnection(variables, options) {
      return requester(LocationsConnectionDocument, variables, options);
    },
    industry(variables, options) {
      return requester(IndustryDocument, variables, options);
    },
    industryConnection(variables, options) {
      return requester(IndustryConnectionDocument, variables, options);
    },
    presets(variables, options) {
      return requester(PresetsDocument, variables, options);
    },
    presetsConnection(variables, options) {
      return requester(PresetsConnectionDocument, variables, options);
    },
    presetsCategory(variables, options) {
      return requester(PresetsCategoryDocument, variables, options);
    },
    presetsCategoryConnection(variables, options) {
      return requester(PresetsCategoryConnectionDocument, variables, options);
    }
  };
}
var GlobalPartsFragmentDoc, LayoutQueryFragmentFragmentDoc, MarketingPartsFragmentDoc, PagePartsFragmentDoc, ConsultingIndexPartsFragmentDoc, ConsultingCategoryPartsFragmentDoc, ConsultingTagPartsFragmentDoc, ConsultingPartsFragmentDoc, VideoProductionPartsFragmentDoc, TestimonialsPartsFragmentDoc, TestimonialCategoriesPartsFragmentDoc, TechnologiesPartsFragmentDoc, OfficesPartsFragmentDoc, OpportunitiesPartsFragmentDoc, EmploymentPartsFragmentDoc, OfficeIndexPartsFragmentDoc, ProductsIndexPartsFragmentDoc, ProductsPartsFragmentDoc, TrainingPartsFragmentDoc, NewslettersPartsFragmentDoc, PresenterPartsFragmentDoc, LocationsPartsFragmentDoc, IndustryPartsFragmentDoc, PresetsPartsFragmentDoc, PresetsCategoryPartsFragmentDoc, ContentQueryDocument, ConsultingContentQueryDocument, VideoProductionContentQueryDocument, OfficeContentQueryDocument, TrainingContentQueryDocument, AllTestimonialsQueryDocument, TestimonalsQueryDocument, TechnologyCardContentQueryDocument, EmploymentPageQueryDocument, OfficeIndexQueryDocument, ProductContentQueryDocument, IndustryContentQueryDocument, PresetsQueryDocument, MarketingDocument, MarketingConnectionDocument, GlobalDocument, GlobalConnectionDocument, PageDocument, PageConnectionDocument, ConsultingIndexDocument, ConsultingIndexConnectionDocument, ConsultingCategoryDocument, ConsultingCategoryConnectionDocument, ConsultingTagDocument, ConsultingTagConnectionDocument, ConsultingDocument, ConsultingConnectionDocument, VideoProductionDocument, VideoProductionConnectionDocument, TestimonialsDocument, TestimonialsConnectionDocument, TestimonialCategoriesDocument, TestimonialCategoriesConnectionDocument, TechnologiesDocument, TechnologiesConnectionDocument, OfficesDocument, OfficesConnectionDocument, OpportunitiesDocument, OpportunitiesConnectionDocument, EmploymentDocument, EmploymentConnectionDocument, OfficeIndexDocument, OfficeIndexConnectionDocument, ProductsIndexDocument, ProductsIndexConnectionDocument, ProductsDocument, ProductsConnectionDocument, TrainingDocument, TrainingConnectionDocument, NewslettersDocument, NewslettersConnectionDocument, PresenterDocument, PresenterConnectionDocument, LocationsDocument, LocationsConnectionDocument, IndustryDocument, IndustryConnectionDocument, PresetsDocument, PresetsConnectionDocument, PresetsCategoryDocument, PresetsCategoryConnectionDocument, generateRequester, queries;
var init_types = __esm({
  ".tina/__generated__/types.ts"() {
    GlobalPartsFragmentDoc = gql`
    fragment GlobalParts on Global {
  header {
    __typename
    name
    title
    description
    url
    site_name
    alternate_site_name
  }
  youtubeChannelLink
  breadcrumbSuffix
  bookingButtonText
  bookingPhone
  homePageOfficeList {
    __typename
    url
    name
    streetAddress
    suburb
    addressLocality
    addressRegion
    addressCountry
    postalCode
    phone
    hours
    days
  }
  socials {
    __typename
    type
    title
    url
    username
    linkText
  }
  clients {
    __typename
    clientsList {
      __typename
      clientName
      imageUrl
    }
  }
}
    `;
    LayoutQueryFragmentFragmentDoc = gql`
    fragment LayoutQueryFragment on Query {
  global(relativePath: "index.json") {
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
    MarketingPartsFragmentDoc = gql`
    fragment MarketingParts on Marketing {
  title
  backgroundImage
  mediaComponent
  body
  textSide
}
    `;
    PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  breadcrumbs
  beforeBody {
    __typename
    ... on PageBeforeBodyAboutUs {
      backgroundColor
    }
    ... on PageBeforeBodyAgreementForm {
      backgroundColor
      fields {
        __typename
        id
        label
        placeholder
        resizeable
      }
    }
    ... on PageBeforeBodyBookingButton {
      buttonText
    }
    ... on PageBeforeBodyBuiltOnAzure {
      backgroundColor
    }
    ... on PageBeforeBodyCarousel {
      items {
        __typename
        label
        link
        openIn
        imgSrc
      }
      backgroundColor
      delay
      showOnMobileDevices
    }
    ... on PageBeforeBodyCitation {
      author
      article
    }
    ... on PageBeforeBodyClientLogos {
      altText
    }
    ... on PageBeforeBodyContent {
      title
      content
      size
      align
      backgroundColor
    }
    ... on PageBeforeBodyContentCard {
      prose
      content
    }
    ... on PageBeforeBodyCustomImage {
      src
      altText
      height
      width
      link
    }
    ... on PageBeforeBodyDynamicColumns {
      colBody
      colCount
    }
    ... on PageBeforeBodyFlag {
      country
    }
    ... on PageBeforeBodyFixedColumns {
      firstColBody
      secondColBody
    }
    ... on PageBeforeBodyFixedTabsLayout {
      firstTab
      firstHeading
      firstBody
      secondTab
      secondHeading
      secondBody
    }
    ... on PageBeforeBodyGoogleMaps {
      embedUrl
      embedWidth
      embedHeight
    }
    ... on PageBeforeBodyHero {
      tagline
      headline
      text
      actions {
        __typename
        label
        type
        icon
        link
      }
      image {
        __typename
        src
        alt
      }
      color
    }
    ... on PageBeforeBodyInternalCarousel {
      items {
        __typename
        label
        imgSrc
      }
      header
      paragraph
      website
      technologies {
        __typename
        name
      }
    }
    ... on PageBeforeBodyNewslettersTable {
      headerText
    }
    ... on PageBeforeBodyRecurringEvent {
      applyLinkRedirect
      day
    }
    ... on PageBeforeBodyServiceCards {
      bigCardsLabel
      bigCards {
        __typename
        title
        description
        link
        color
        imgSrc
      }
      smallCardsLabel
      smallCards {
        __typename
        title
        link
        color
        imgSrc
      }
      links {
        __typename
        label
        link
      }
      backgroundColor
    }
    ... on PageBeforeBodySubNewsletterRow {
      headerText
      subscribeButtonText
      subscribeSubTitle
    }
    ... on PageBeforeBodyTableLayout {
      tablePresets {
        __typename
        preset {
          ... on Presets {
            name
            className
            categories {
              __typename
              category {
                ... on PresetsCategory {
                  name
                }
                ... on Document {
                  _sys {
                    filename
                    basename
                    breadcrumbs
                    path
                    relativePath
                    extension
                  }
                  id
                }
              }
            }
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      mdxTable
    }
    ... on PageBeforeBodyTrainingInformation {
      trainingInformationItems {
        __typename
        header
        body
      }
    }
    ... on PageBeforeBodyTrainingLearningOutcome {
      header
      listItems {
        __typename
        title
        content
        icon
      }
    }
    ... on PageBeforeBodyTweetEmbed {
      url
    }
    ... on PageBeforeBodyUpcomingEvents {
      title
      numberOfEvents
    }
    ... on PageBeforeBodyUtilityButton {
      buttonText
      link
    }
    ... on PageBeforeBodyVerticalImageLayout {
      imageSrc
      altText
      imageLink
      height
      width
      message
    }
    ... on PageBeforeBodyVerticalListItem {
      content
      icon
      iconScale
      afterBody
    }
    ... on PageBeforeBodyVideoEmbed {
      url
      videoWidth
      removeMargin
    }
    ... on PageBeforeBodyEventBooking {
      duration
      price
      discountPrice
      discountNote
      eventList {
        __typename
        city
        date
        bookingURL
      }
    }
    ... on PageBeforeBodyPresenterBlock {
      header
      presenterList {
        __typename
        presenter {
          ... on Presenter {
            profileImg
            presenter {
              __typename
              name
              peopleProfileURL
            }
            about
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      otherEvent {
        __typename
        title
        eventURL
      }
    }
    ... on PageBeforeBodyLocationBlock {
      title
      locationList {
        __typename
        location {
          ... on Locations {
            header
            addressLine1
            addressLine2
            addressLine3
            directionURL
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      chapelWebsite {
        __typename
        title
        URL
      }
    }
    ... on PageBeforeBodyAgenda {
      header
      align
      textColor
      agendaItemList {
        __typename
        placeholder
        body
      }
    }
  }
  _body
  sideBar {
    __typename
    ... on PageSideBarAboutUs {
      backgroundColor
    }
    ... on PageSideBarAgreementForm {
      backgroundColor
      fields {
        __typename
        id
        label
        placeholder
        resizeable
      }
    }
    ... on PageSideBarBookingButton {
      buttonText
    }
    ... on PageSideBarBuiltOnAzure {
      backgroundColor
    }
    ... on PageSideBarCarousel {
      items {
        __typename
        label
        link
        openIn
        imgSrc
      }
      backgroundColor
      delay
      showOnMobileDevices
    }
    ... on PageSideBarCitation {
      author
      article
    }
    ... on PageSideBarClientLogos {
      altText
    }
    ... on PageSideBarContent {
      title
      content
      size
      align
      backgroundColor
    }
    ... on PageSideBarContentCard {
      prose
      content
    }
    ... on PageSideBarCustomImage {
      src
      altText
      height
      width
      link
    }
    ... on PageSideBarDynamicColumns {
      colBody
      colCount
    }
    ... on PageSideBarFlag {
      country
    }
    ... on PageSideBarFixedColumns {
      firstColBody
      secondColBody
    }
    ... on PageSideBarFixedTabsLayout {
      firstTab
      firstHeading
      firstBody
      secondTab
      secondHeading
      secondBody
    }
    ... on PageSideBarGoogleMaps {
      embedUrl
      embedWidth
      embedHeight
    }
    ... on PageSideBarHero {
      tagline
      headline
      text
      actions {
        __typename
        label
        type
        icon
        link
      }
      image {
        __typename
        src
        alt
      }
      color
    }
    ... on PageSideBarInternalCarousel {
      items {
        __typename
        label
        imgSrc
      }
      header
      paragraph
      website
      technologies {
        __typename
        name
      }
    }
    ... on PageSideBarNewslettersTable {
      headerText
    }
    ... on PageSideBarRecurringEvent {
      applyLinkRedirect
      day
    }
    ... on PageSideBarServiceCards {
      bigCardsLabel
      bigCards {
        __typename
        title
        description
        link
        color
        imgSrc
      }
      smallCardsLabel
      smallCards {
        __typename
        title
        link
        color
        imgSrc
      }
      links {
        __typename
        label
        link
      }
      backgroundColor
    }
    ... on PageSideBarSubNewsletterRow {
      headerText
      subscribeButtonText
      subscribeSubTitle
    }
    ... on PageSideBarTableLayout {
      tablePresets {
        __typename
        preset {
          ... on Presets {
            name
            className
            categories {
              __typename
              category {
                ... on PresetsCategory {
                  name
                }
                ... on Document {
                  _sys {
                    filename
                    basename
                    breadcrumbs
                    path
                    relativePath
                    extension
                  }
                  id
                }
              }
            }
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      mdxTable
    }
    ... on PageSideBarTrainingInformation {
      trainingInformationItems {
        __typename
        header
        body
      }
    }
    ... on PageSideBarTrainingLearningOutcome {
      header
      listItems {
        __typename
        title
        content
        icon
      }
    }
    ... on PageSideBarTweetEmbed {
      url
    }
    ... on PageSideBarUpcomingEvents {
      title
      numberOfEvents
    }
    ... on PageSideBarUtilityButton {
      buttonText
      link
    }
    ... on PageSideBarVerticalImageLayout {
      imageSrc
      altText
      imageLink
      height
      width
      message
    }
    ... on PageSideBarVerticalListItem {
      content
      icon
      iconScale
      afterBody
    }
    ... on PageSideBarVideoEmbed {
      url
      videoWidth
      removeMargin
    }
    ... on PageSideBarEventBooking {
      duration
      price
      discountPrice
      discountNote
      eventList {
        __typename
        city
        date
        bookingURL
      }
    }
    ... on PageSideBarPresenterBlock {
      header
      presenterList {
        __typename
        presenter {
          ... on Presenter {
            profileImg
            presenter {
              __typename
              name
              peopleProfileURL
            }
            about
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      otherEvent {
        __typename
        title
        eventURL
      }
    }
    ... on PageSideBarLocationBlock {
      title
      locationList {
        __typename
        location {
          ... on Locations {
            header
            addressLine1
            addressLine2
            addressLine3
            directionURL
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      chapelWebsite {
        __typename
        title
        URL
      }
    }
    ... on PageSideBarAgenda {
      header
      align
      textColor
      agendaItemList {
        __typename
        placeholder
        body
      }
    }
  }
  afterBody {
    __typename
    ... on PageAfterBodyAboutUs {
      backgroundColor
    }
    ... on PageAfterBodyAgreementForm {
      backgroundColor
      fields {
        __typename
        id
        label
        placeholder
        resizeable
      }
    }
    ... on PageAfterBodyBookingButton {
      buttonText
    }
    ... on PageAfterBodyBuiltOnAzure {
      backgroundColor
    }
    ... on PageAfterBodyCarousel {
      items {
        __typename
        label
        link
        openIn
        imgSrc
      }
      backgroundColor
      delay
      showOnMobileDevices
    }
    ... on PageAfterBodyCitation {
      author
      article
    }
    ... on PageAfterBodyClientLogos {
      altText
    }
    ... on PageAfterBodyContent {
      title
      content
      size
      align
      backgroundColor
    }
    ... on PageAfterBodyContentCard {
      prose
      content
    }
    ... on PageAfterBodyCustomImage {
      src
      altText
      height
      width
      link
    }
    ... on PageAfterBodyDynamicColumns {
      colBody
      colCount
    }
    ... on PageAfterBodyFlag {
      country
    }
    ... on PageAfterBodyFixedColumns {
      firstColBody
      secondColBody
    }
    ... on PageAfterBodyFixedTabsLayout {
      firstTab
      firstHeading
      firstBody
      secondTab
      secondHeading
      secondBody
    }
    ... on PageAfterBodyGoogleMaps {
      embedUrl
      embedWidth
      embedHeight
    }
    ... on PageAfterBodyHero {
      tagline
      headline
      text
      actions {
        __typename
        label
        type
        icon
        link
      }
      image {
        __typename
        src
        alt
      }
      color
    }
    ... on PageAfterBodyInternalCarousel {
      items {
        __typename
        label
        imgSrc
      }
      header
      paragraph
      website
      technologies {
        __typename
        name
      }
    }
    ... on PageAfterBodyNewslettersTable {
      headerText
    }
    ... on PageAfterBodyRecurringEvent {
      applyLinkRedirect
      day
    }
    ... on PageAfterBodyServiceCards {
      bigCardsLabel
      bigCards {
        __typename
        title
        description
        link
        color
        imgSrc
      }
      smallCardsLabel
      smallCards {
        __typename
        title
        link
        color
        imgSrc
      }
      links {
        __typename
        label
        link
      }
      backgroundColor
    }
    ... on PageAfterBodySubNewsletterRow {
      headerText
      subscribeButtonText
      subscribeSubTitle
    }
    ... on PageAfterBodyTableLayout {
      tablePresets {
        __typename
        preset {
          ... on Presets {
            name
            className
            categories {
              __typename
              category {
                ... on PresetsCategory {
                  name
                }
                ... on Document {
                  _sys {
                    filename
                    basename
                    breadcrumbs
                    path
                    relativePath
                    extension
                  }
                  id
                }
              }
            }
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      mdxTable
    }
    ... on PageAfterBodyTrainingInformation {
      trainingInformationItems {
        __typename
        header
        body
      }
    }
    ... on PageAfterBodyTrainingLearningOutcome {
      header
      listItems {
        __typename
        title
        content
        icon
      }
    }
    ... on PageAfterBodyTweetEmbed {
      url
    }
    ... on PageAfterBodyUpcomingEvents {
      title
      numberOfEvents
    }
    ... on PageAfterBodyUtilityButton {
      buttonText
      link
    }
    ... on PageAfterBodyVerticalImageLayout {
      imageSrc
      altText
      imageLink
      height
      width
      message
    }
    ... on PageAfterBodyVerticalListItem {
      content
      icon
      iconScale
      afterBody
    }
    ... on PageAfterBodyVideoEmbed {
      url
      videoWidth
      removeMargin
    }
    ... on PageAfterBodyEventBooking {
      duration
      price
      discountPrice
      discountNote
      eventList {
        __typename
        city
        date
        bookingURL
      }
    }
    ... on PageAfterBodyPresenterBlock {
      header
      presenterList {
        __typename
        presenter {
          ... on Presenter {
            profileImg
            presenter {
              __typename
              name
              peopleProfileURL
            }
            about
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      otherEvent {
        __typename
        title
        eventURL
      }
    }
    ... on PageAfterBodyLocationBlock {
      title
      locationList {
        __typename
        location {
          ... on Locations {
            header
            addressLine1
            addressLine2
            addressLine3
            directionURL
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      chapelWebsite {
        __typename
        title
        URL
      }
    }
    ... on PageAfterBodyAgenda {
      header
      align
      textColor
      agendaItemList {
        __typename
        placeholder
        body
      }
    }
  }
}
    `;
    ConsultingIndexPartsFragmentDoc = gql`
    fragment ConsultingIndexParts on ConsultingIndex {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  sidebar {
    __typename
    label
    tag {
      ... on ConsultingTag {
        name
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  categories {
    __typename
    category {
      ... on ConsultingCategory {
        name
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
    pages {
      __typename
      title
      description
      logo
      page {
        ... on Consulting {
          seo {
            __typename
            title
            description
            canonical
            images {
              __typename
              url
              width
              height
              alt
            }
          }
          booking {
            __typename
            title
            subTitle
            buttonText
            videoBackground
          }
          solution {
            __typename
            project
          }
          callToAction
          testimonialCategories {
            __typename
            testimonialCategory {
              ... on TestimonialCategories {
                name
                description
              }
              ... on Document {
                _sys {
                  filename
                  basename
                  breadcrumbs
                  path
                  relativePath
                  extension
                }
                id
              }
            }
          }
          _body
          afterBody {
            __typename
            ... on ConsultingAfterBodyAboutUs {
              backgroundColor
            }
            ... on ConsultingAfterBodyAgreementForm {
              backgroundColor
              fields {
                __typename
                id
                label
                placeholder
                resizeable
              }
            }
            ... on ConsultingAfterBodyBookingButton {
              buttonText
            }
            ... on ConsultingAfterBodyBuiltOnAzure {
              backgroundColor
            }
            ... on ConsultingAfterBodyCarousel {
              items {
                __typename
                label
                link
                openIn
                imgSrc
              }
              backgroundColor
              delay
              showOnMobileDevices
            }
            ... on ConsultingAfterBodyCitation {
              author
              article
            }
            ... on ConsultingAfterBodyClientLogos {
              altText
            }
            ... on ConsultingAfterBodyContent {
              title
              content
              size
              align
              backgroundColor
            }
            ... on ConsultingAfterBodyContentCard {
              prose
              content
            }
            ... on ConsultingAfterBodyCustomImage {
              src
              altText
              height
              width
              link
            }
            ... on ConsultingAfterBodyDynamicColumns {
              colBody
              colCount
            }
            ... on ConsultingAfterBodyFlag {
              country
            }
            ... on ConsultingAfterBodyFixedColumns {
              firstColBody
              secondColBody
            }
            ... on ConsultingAfterBodyFixedTabsLayout {
              firstTab
              firstHeading
              firstBody
              secondTab
              secondHeading
              secondBody
            }
            ... on ConsultingAfterBodyGoogleMaps {
              embedUrl
              embedWidth
              embedHeight
            }
            ... on ConsultingAfterBodyHero {
              tagline
              headline
              text
              actions {
                __typename
                label
                type
                icon
                link
              }
              image {
                __typename
                src
                alt
              }
              color
            }
            ... on ConsultingAfterBodyInternalCarousel {
              items {
                __typename
                label
                imgSrc
              }
              header
              paragraph
              website
              technologies {
                __typename
                name
              }
            }
            ... on ConsultingAfterBodyNewslettersTable {
              headerText
            }
            ... on ConsultingAfterBodyRecurringEvent {
              applyLinkRedirect
              day
            }
            ... on ConsultingAfterBodyServiceCards {
              bigCardsLabel
              bigCards {
                __typename
                title
                description
                link
                color
                imgSrc
              }
              smallCardsLabel
              smallCards {
                __typename
                title
                link
                color
                imgSrc
              }
              links {
                __typename
                label
                link
              }
              backgroundColor
            }
            ... on ConsultingAfterBodySubNewsletterRow {
              headerText
              subscribeButtonText
              subscribeSubTitle
            }
            ... on ConsultingAfterBodyTableLayout {
              tablePresets {
                __typename
                preset {
                  ... on Presets {
                    name
                    className
                    categories {
                      __typename
                    }
                  }
                  ... on Document {
                    _sys {
                      filename
                      basename
                      breadcrumbs
                      path
                      relativePath
                      extension
                    }
                    id
                  }
                }
              }
              mdxTable
            }
            ... on ConsultingAfterBodyTrainingInformation {
              trainingInformationItems {
                __typename
                header
                body
              }
            }
            ... on ConsultingAfterBodyTrainingLearningOutcome {
              header
              listItems {
                __typename
                title
                content
                icon
              }
            }
            ... on ConsultingAfterBodyTweetEmbed {
              url
            }
            ... on ConsultingAfterBodyUpcomingEvents {
              title
              numberOfEvents
            }
            ... on ConsultingAfterBodyUtilityButton {
              buttonText
              link
            }
            ... on ConsultingAfterBodyVerticalImageLayout {
              imageSrc
              altText
              imageLink
              height
              width
              message
            }
            ... on ConsultingAfterBodyVerticalListItem {
              content
              icon
              iconScale
              afterBody
            }
            ... on ConsultingAfterBodyVideoEmbed {
              url
              videoWidth
              removeMargin
            }
            ... on ConsultingAfterBodyEventBooking {
              duration
              price
              discountPrice
              discountNote
              eventList {
                __typename
                city
                date
                bookingURL
              }
            }
            ... on ConsultingAfterBodyPresenterBlock {
              header
              presenterList {
                __typename
                presenter {
                  ... on Presenter {
                    profileImg
                    presenter {
                      __typename
                      name
                      peopleProfileURL
                    }
                    about
                  }
                  ... on Document {
                    _sys {
                      filename
                      basename
                      breadcrumbs
                      path
                      relativePath
                      extension
                    }
                    id
                  }
                }
              }
              otherEvent {
                __typename
                title
                eventURL
              }
            }
            ... on ConsultingAfterBodyLocationBlock {
              title
              locationList {
                __typename
                location {
                  ... on Locations {
                    header
                    addressLine1
                    addressLine2
                    addressLine3
                    directionURL
                  }
                  ... on Document {
                    _sys {
                      filename
                      basename
                      breadcrumbs
                      path
                      relativePath
                      extension
                    }
                    id
                  }
                }
              }
              chapelWebsite {
                __typename
                title
                URL
              }
            }
            ... on ConsultingAfterBodyAgenda {
              header
              align
              textColor
              agendaItemList {
                __typename
                placeholder
                body
              }
            }
          }
          benefits {
            __typename
            benefitList {
              __typename
              image
              title
              description
              linkName
              linkURL
            }
            rule {
              __typename
              name
              url
            }
          }
          technologies {
            __typename
            header
            subheading
            technologyCards {
              __typename
              technologyCard {
                ... on Technologies {
                  name
                  readMoreSlug
                  thumbnail
                  body
                }
                ... on Document {
                  _sys {
                    filename
                    basename
                    breadcrumbs
                    path
                    relativePath
                    extension
                  }
                  id
                }
              }
            }
          }
          medias {
            __typename
            header
            mediaCards {
              __typename
              type
              content
            }
          }
        }
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
      }
      externalUrl
      tags {
        __typename
        tag {
          ... on ConsultingTag {
            name
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
    }
  }
}
    `;
    ConsultingCategoryPartsFragmentDoc = gql`
    fragment ConsultingCategoryParts on ConsultingCategory {
  name
}
    `;
    ConsultingTagPartsFragmentDoc = gql`
    fragment ConsultingTagParts on ConsultingTag {
  name
}
    `;
    ConsultingPartsFragmentDoc = gql`
    fragment ConsultingParts on Consulting {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  booking {
    __typename
    title
    subTitle
    buttonText
    videoBackground
  }
  solution {
    __typename
    project
  }
  callToAction
  testimonialCategories {
    __typename
    testimonialCategory {
      ... on TestimonialCategories {
        name
        description
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  _body
  afterBody {
    __typename
    ... on ConsultingAfterBodyAboutUs {
      backgroundColor
    }
    ... on ConsultingAfterBodyAgreementForm {
      backgroundColor
      fields {
        __typename
        id
        label
        placeholder
        resizeable
      }
    }
    ... on ConsultingAfterBodyBookingButton {
      buttonText
    }
    ... on ConsultingAfterBodyBuiltOnAzure {
      backgroundColor
    }
    ... on ConsultingAfterBodyCarousel {
      items {
        __typename
        label
        link
        openIn
        imgSrc
      }
      backgroundColor
      delay
      showOnMobileDevices
    }
    ... on ConsultingAfterBodyCitation {
      author
      article
    }
    ... on ConsultingAfterBodyClientLogos {
      altText
    }
    ... on ConsultingAfterBodyContent {
      title
      content
      size
      align
      backgroundColor
    }
    ... on ConsultingAfterBodyContentCard {
      prose
      content
    }
    ... on ConsultingAfterBodyCustomImage {
      src
      altText
      height
      width
      link
    }
    ... on ConsultingAfterBodyDynamicColumns {
      colBody
      colCount
    }
    ... on ConsultingAfterBodyFlag {
      country
    }
    ... on ConsultingAfterBodyFixedColumns {
      firstColBody
      secondColBody
    }
    ... on ConsultingAfterBodyFixedTabsLayout {
      firstTab
      firstHeading
      firstBody
      secondTab
      secondHeading
      secondBody
    }
    ... on ConsultingAfterBodyGoogleMaps {
      embedUrl
      embedWidth
      embedHeight
    }
    ... on ConsultingAfterBodyHero {
      tagline
      headline
      text
      actions {
        __typename
        label
        type
        icon
        link
      }
      image {
        __typename
        src
        alt
      }
      color
    }
    ... on ConsultingAfterBodyInternalCarousel {
      items {
        __typename
        label
        imgSrc
      }
      header
      paragraph
      website
      technologies {
        __typename
        name
      }
    }
    ... on ConsultingAfterBodyNewslettersTable {
      headerText
    }
    ... on ConsultingAfterBodyRecurringEvent {
      applyLinkRedirect
      day
    }
    ... on ConsultingAfterBodyServiceCards {
      bigCardsLabel
      bigCards {
        __typename
        title
        description
        link
        color
        imgSrc
      }
      smallCardsLabel
      smallCards {
        __typename
        title
        link
        color
        imgSrc
      }
      links {
        __typename
        label
        link
      }
      backgroundColor
    }
    ... on ConsultingAfterBodySubNewsletterRow {
      headerText
      subscribeButtonText
      subscribeSubTitle
    }
    ... on ConsultingAfterBodyTableLayout {
      tablePresets {
        __typename
        preset {
          ... on Presets {
            name
            className
            categories {
              __typename
              category {
                ... on PresetsCategory {
                  name
                }
                ... on Document {
                  _sys {
                    filename
                    basename
                    breadcrumbs
                    path
                    relativePath
                    extension
                  }
                  id
                }
              }
            }
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      mdxTable
    }
    ... on ConsultingAfterBodyTrainingInformation {
      trainingInformationItems {
        __typename
        header
        body
      }
    }
    ... on ConsultingAfterBodyTrainingLearningOutcome {
      header
      listItems {
        __typename
        title
        content
        icon
      }
    }
    ... on ConsultingAfterBodyTweetEmbed {
      url
    }
    ... on ConsultingAfterBodyUpcomingEvents {
      title
      numberOfEvents
    }
    ... on ConsultingAfterBodyUtilityButton {
      buttonText
      link
    }
    ... on ConsultingAfterBodyVerticalImageLayout {
      imageSrc
      altText
      imageLink
      height
      width
      message
    }
    ... on ConsultingAfterBodyVerticalListItem {
      content
      icon
      iconScale
      afterBody
    }
    ... on ConsultingAfterBodyVideoEmbed {
      url
      videoWidth
      removeMargin
    }
    ... on ConsultingAfterBodyEventBooking {
      duration
      price
      discountPrice
      discountNote
      eventList {
        __typename
        city
        date
        bookingURL
      }
    }
    ... on ConsultingAfterBodyPresenterBlock {
      header
      presenterList {
        __typename
        presenter {
          ... on Presenter {
            profileImg
            presenter {
              __typename
              name
              peopleProfileURL
            }
            about
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      otherEvent {
        __typename
        title
        eventURL
      }
    }
    ... on ConsultingAfterBodyLocationBlock {
      title
      locationList {
        __typename
        location {
          ... on Locations {
            header
            addressLine1
            addressLine2
            addressLine3
            directionURL
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      chapelWebsite {
        __typename
        title
        URL
      }
    }
    ... on ConsultingAfterBodyAgenda {
      header
      align
      textColor
      agendaItemList {
        __typename
        placeholder
        body
      }
    }
  }
  benefits {
    __typename
    benefitList {
      __typename
      image
      title
      description
      linkName
      linkURL
    }
    rule {
      __typename
      name
      url
    }
  }
  technologies {
    __typename
    header
    subheading
    technologyCards {
      __typename
      technologyCard {
        ... on Technologies {
          name
          readMoreSlug
          thumbnail
          body
        }
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
      }
    }
  }
  medias {
    __typename
    header
    mediaCards {
      __typename
      type
      content
    }
  }
}
    `;
    VideoProductionPartsFragmentDoc = gql`
    fragment VideoProductionParts on VideoProduction {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  booking {
    __typename
    title
    subTitle
    buttonText
    videoBackground
  }
  solution {
    __typename
    project
  }
  callToAction
  _body
  afterBody {
    __typename
    ... on VideoProductionAfterBodyAboutUs {
      backgroundColor
    }
    ... on VideoProductionAfterBodyAgreementForm {
      backgroundColor
      fields {
        __typename
        id
        label
        placeholder
        resizeable
      }
    }
    ... on VideoProductionAfterBodyBookingButton {
      buttonText
    }
    ... on VideoProductionAfterBodyBuiltOnAzure {
      backgroundColor
    }
    ... on VideoProductionAfterBodyCarousel {
      items {
        __typename
        label
        link
        openIn
        imgSrc
      }
      backgroundColor
      delay
      showOnMobileDevices
    }
    ... on VideoProductionAfterBodyCitation {
      author
      article
    }
    ... on VideoProductionAfterBodyClientLogos {
      altText
    }
    ... on VideoProductionAfterBodyContent {
      title
      content
      size
      align
      backgroundColor
    }
    ... on VideoProductionAfterBodyContentCard {
      prose
      content
    }
    ... on VideoProductionAfterBodyCustomImage {
      src
      altText
      height
      width
      link
    }
    ... on VideoProductionAfterBodyDynamicColumns {
      colBody
      colCount
    }
    ... on VideoProductionAfterBodyFlag {
      country
    }
    ... on VideoProductionAfterBodyFixedColumns {
      firstColBody
      secondColBody
    }
    ... on VideoProductionAfterBodyFixedTabsLayout {
      firstTab
      firstHeading
      firstBody
      secondTab
      secondHeading
      secondBody
    }
    ... on VideoProductionAfterBodyGoogleMaps {
      embedUrl
      embedWidth
      embedHeight
    }
    ... on VideoProductionAfterBodyHero {
      tagline
      headline
      text
      actions {
        __typename
        label
        type
        icon
        link
      }
      image {
        __typename
        src
        alt
      }
      color
    }
    ... on VideoProductionAfterBodyInternalCarousel {
      items {
        __typename
        label
        imgSrc
      }
      header
      paragraph
      website
      technologies {
        __typename
        name
      }
    }
    ... on VideoProductionAfterBodyNewslettersTable {
      headerText
    }
    ... on VideoProductionAfterBodyRecurringEvent {
      applyLinkRedirect
      day
    }
    ... on VideoProductionAfterBodyServiceCards {
      bigCardsLabel
      bigCards {
        __typename
        title
        description
        link
        color
        imgSrc
      }
      smallCardsLabel
      smallCards {
        __typename
        title
        link
        color
        imgSrc
      }
      links {
        __typename
        label
        link
      }
      backgroundColor
    }
    ... on VideoProductionAfterBodySubNewsletterRow {
      headerText
      subscribeButtonText
      subscribeSubTitle
    }
    ... on VideoProductionAfterBodyTableLayout {
      tablePresets {
        __typename
        preset {
          ... on Presets {
            name
            className
            categories {
              __typename
              category {
                ... on PresetsCategory {
                  name
                }
                ... on Document {
                  _sys {
                    filename
                    basename
                    breadcrumbs
                    path
                    relativePath
                    extension
                  }
                  id
                }
              }
            }
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      mdxTable
    }
    ... on VideoProductionAfterBodyTrainingInformation {
      trainingInformationItems {
        __typename
        header
        body
      }
    }
    ... on VideoProductionAfterBodyTrainingLearningOutcome {
      header
      listItems {
        __typename
        title
        content
        icon
      }
    }
    ... on VideoProductionAfterBodyTweetEmbed {
      url
    }
    ... on VideoProductionAfterBodyUpcomingEvents {
      title
      numberOfEvents
    }
    ... on VideoProductionAfterBodyUtilityButton {
      buttonText
      link
    }
    ... on VideoProductionAfterBodyVerticalImageLayout {
      imageSrc
      altText
      imageLink
      height
      width
      message
    }
    ... on VideoProductionAfterBodyVerticalListItem {
      content
      icon
      iconScale
      afterBody
    }
    ... on VideoProductionAfterBodyVideoEmbed {
      url
      videoWidth
      removeMargin
    }
    ... on VideoProductionAfterBodyEventBooking {
      duration
      price
      discountPrice
      discountNote
      eventList {
        __typename
        city
        date
        bookingURL
      }
    }
    ... on VideoProductionAfterBodyPresenterBlock {
      header
      presenterList {
        __typename
        presenter {
          ... on Presenter {
            profileImg
            presenter {
              __typename
              name
              peopleProfileURL
            }
            about
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      otherEvent {
        __typename
        title
        eventURL
      }
    }
    ... on VideoProductionAfterBodyLocationBlock {
      title
      locationList {
        __typename
        location {
          ... on Locations {
            header
            addressLine1
            addressLine2
            addressLine3
            directionURL
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      chapelWebsite {
        __typename
        title
        URL
      }
    }
    ... on VideoProductionAfterBodyAgenda {
      header
      align
      textColor
      agendaItemList {
        __typename
        placeholder
        body
      }
    }
  }
}
    `;
    TestimonialsPartsFragmentDoc = gql`
    fragment TestimonialsParts on Testimonials {
  name
  avatar
  company
  rating
  body
  categories {
    __typename
    category {
      ... on TestimonialCategories {
        name
        description
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
}
    `;
    TestimonialCategoriesPartsFragmentDoc = gql`
    fragment TestimonialCategoriesParts on TestimonialCategories {
  name
  description
}
    `;
    TechnologiesPartsFragmentDoc = gql`
    fragment TechnologiesParts on Technologies {
  name
  readMoreSlug
  thumbnail
  body
}
    `;
    OfficesPartsFragmentDoc = gql`
    fragment OfficesParts on Offices {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  coverImg
  thumbnail
  sideImg
  url
  name
  streetAddress
  suburb
  addressLocality
  addressRegion
  addressCountry
  postalCode
  phone
  hours
  days
  sidebarSecondaryPlace {
    __typename
    name
    url
  }
  aboutUs
  map
  directionsUrl
  directions
  parking
  publicTransport
  team
  photos
  _body
}
    `;
    OpportunitiesPartsFragmentDoc = gql`
    fragment OpportunitiesParts on Opportunities {
  title
  employmentType
  status
  locations
  hideApply
  _body
}
    `;
    EmploymentPartsFragmentDoc = gql`
    fragment EmploymentParts on Employment {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  booking {
    __typename
    title
    subTitle
    bookingBody
    videoBackground
  }
  _body
  benefits {
    __typename
    benefitList {
      __typename
      image
      title
      description
      linkName
      linkURL
    }
  }
  benefitsBody
  afterBody
  opportunitiesBody
  opportunities {
    __typename
    opportunityRef {
      ... on Opportunities {
        title
        employmentType
        status
        locations
        hideApply
        _body
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  callToActionBody
}
    `;
    OfficeIndexPartsFragmentDoc = gql`
    fragment OfficeIndexParts on OfficeIndex {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  officesIndex {
    __typename
    office {
      ... on Offices {
        seo {
          __typename
          title
          description
          canonical
          images {
            __typename
            url
            width
            height
            alt
          }
        }
        coverImg
        thumbnail
        sideImg
        url
        name
        streetAddress
        suburb
        addressLocality
        addressRegion
        addressCountry
        postalCode
        phone
        hours
        days
        sidebarSecondaryPlace {
          __typename
          name
          url
        }
        aboutUs
        map
        directionsUrl
        directions
        parking
        publicTransport
        team
        photos
        _body
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
}
    `;
    ProductsIndexPartsFragmentDoc = gql`
    fragment ProductsIndexParts on ProductsIndex {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  productsList {
    __typename
    name
    url
    description
    logo
  }
}
    `;
    ProductsPartsFragmentDoc = gql`
    fragment ProductsParts on Products {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  _body
}
    `;
    TrainingPartsFragmentDoc = gql`
    fragment TrainingParts on Training {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  trainingHeaderCarousel {
    __typename
    trainingHeaderCarouselItem {
      __typename
      tagline
      secondaryTagline
      heroBackground
      person
      link {
        __typename
        linkText
        url
        icon
      }
    }
  }
  title
  showTestimonials
  _body {
    __typename
    ... on Training_bodyAboutUs {
      backgroundColor
    }
    ... on Training_bodyAgreementForm {
      backgroundColor
      fields {
        __typename
        id
        label
        placeholder
        resizeable
      }
    }
    ... on Training_bodyBookingButton {
      buttonText
    }
    ... on Training_bodyBuiltOnAzure {
      backgroundColor
    }
    ... on Training_bodyCarousel {
      items {
        __typename
        label
        link
        openIn
        imgSrc
      }
      backgroundColor
      delay
      showOnMobileDevices
    }
    ... on Training_bodyCitation {
      author
      article
    }
    ... on Training_bodyClientLogos {
      altText
    }
    ... on Training_bodyContent {
      title
      content
      size
      align
      backgroundColor
    }
    ... on Training_bodyContentCard {
      prose
      content
    }
    ... on Training_bodyCustomImage {
      src
      altText
      height
      width
      link
    }
    ... on Training_bodyDynamicColumns {
      colBody
      colCount
    }
    ... on Training_bodyFlag {
      country
    }
    ... on Training_bodyFixedColumns {
      firstColBody
      secondColBody
    }
    ... on Training_bodyFixedTabsLayout {
      firstTab
      firstHeading
      firstBody
      secondTab
      secondHeading
      secondBody
    }
    ... on Training_bodyGoogleMaps {
      embedUrl
      embedWidth
      embedHeight
    }
    ... on Training_bodyHero {
      tagline
      headline
      text
      actions {
        __typename
        label
        type
        icon
        link
      }
      image {
        __typename
        src
        alt
      }
      color
    }
    ... on Training_bodyInternalCarousel {
      items {
        __typename
        label
        imgSrc
      }
      header
      paragraph
      website
      technologies {
        __typename
        name
      }
    }
    ... on Training_bodyNewslettersTable {
      headerText
    }
    ... on Training_bodyRecurringEvent {
      applyLinkRedirect
      day
    }
    ... on Training_bodyServiceCards {
      bigCardsLabel
      bigCards {
        __typename
        title
        description
        link
        color
        imgSrc
      }
      smallCardsLabel
      smallCards {
        __typename
        title
        link
        color
        imgSrc
      }
      links {
        __typename
        label
        link
      }
      backgroundColor
    }
    ... on Training_bodySubNewsletterRow {
      headerText
      subscribeButtonText
      subscribeSubTitle
    }
    ... on Training_bodyTableLayout {
      tablePresets {
        __typename
        preset {
          ... on Presets {
            name
            className
            categories {
              __typename
              category {
                ... on PresetsCategory {
                  name
                }
                ... on Document {
                  _sys {
                    filename
                    basename
                    breadcrumbs
                    path
                    relativePath
                    extension
                  }
                  id
                }
              }
            }
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      mdxTable
    }
    ... on Training_bodyTrainingInformation {
      trainingInformationItems {
        __typename
        header
        body
      }
    }
    ... on Training_bodyTrainingLearningOutcome {
      header
      listItems {
        __typename
        title
        content
        icon
      }
    }
    ... on Training_bodyTweetEmbed {
      url
    }
    ... on Training_bodyUpcomingEvents {
      title
      numberOfEvents
    }
    ... on Training_bodyUtilityButton {
      buttonText
      link
    }
    ... on Training_bodyVerticalImageLayout {
      imageSrc
      altText
      imageLink
      height
      width
      message
    }
    ... on Training_bodyVerticalListItem {
      content
      icon
      iconScale
      afterBody
    }
    ... on Training_bodyVideoEmbed {
      url
      videoWidth
      removeMargin
    }
    ... on Training_bodyEventBooking {
      duration
      price
      discountPrice
      discountNote
      eventList {
        __typename
        city
        date
        bookingURL
      }
    }
    ... on Training_bodyPresenterBlock {
      header
      presenterList {
        __typename
        presenter {
          ... on Presenter {
            profileImg
            presenter {
              __typename
              name
              peopleProfileURL
            }
            about
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      otherEvent {
        __typename
        title
        eventURL
      }
    }
    ... on Training_bodyLocationBlock {
      title
      locationList {
        __typename
        location {
          ... on Locations {
            header
            addressLine1
            addressLine2
            addressLine3
            directionURL
          }
          ... on Document {
            _sys {
              filename
              basename
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
      }
      chapelWebsite {
        __typename
        title
        URL
      }
    }
    ... on Training_bodyAgenda {
      header
      align
      textColor
      agendaItemList {
        __typename
        placeholder
        body
      }
    }
  }
  footer
  videos {
    __typename
    channelLink
    videoCards {
      __typename
      title
      link
    }
  }
}
    `;
    NewslettersPartsFragmentDoc = gql`
    fragment NewslettersParts on Newsletters {
  newsletters_year
  newsletters {
    __typename
    month
    file
    images
    description
  }
}
    `;
    PresenterPartsFragmentDoc = gql`
    fragment PresenterParts on Presenter {
  profileImg
  presenter {
    __typename
    name
    peopleProfileURL
  }
  about
}
    `;
    LocationsPartsFragmentDoc = gql`
    fragment LocationsParts on Locations {
  header
  addressLine1
  addressLine2
  addressLine3
  directionURL
}
    `;
    IndustryPartsFragmentDoc = gql`
    fragment IndustryParts on Industry {
  seo {
    __typename
    title
    description
    canonical
    images {
      __typename
      url
      width
      height
      alt
    }
  }
  heading
  subHeading
  bannerImg
  whitepaperFile
  _body
}
    `;
    PresetsPartsFragmentDoc = gql`
    fragment PresetsParts on Presets {
  name
  className
  categories {
    __typename
    category {
      ... on PresetsCategory {
        name
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
}
    `;
    PresetsCategoryPartsFragmentDoc = gql`
    fragment PresetsCategoryParts on PresetsCategory {
  name
}
    `;
    ContentQueryDocument = gql`
    query contentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  page(relativePath: $relativePath) {
    ...PageParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${PagePartsFragmentDoc}`;
    ConsultingContentQueryDocument = gql`
    query consultingContentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  consulting(relativePath: $relativePath) {
    ...ConsultingParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${ConsultingPartsFragmentDoc}`;
    VideoProductionContentQueryDocument = gql`
    query videoProductionContentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  videoProduction(relativePath: $relativePath) {
    ...VideoProductionParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${VideoProductionPartsFragmentDoc}`;
    OfficeContentQueryDocument = gql`
    query officeContentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  offices(relativePath: $relativePath) {
    ...OfficesParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${OfficesPartsFragmentDoc}`;
    TrainingContentQueryDocument = gql`
    query trainingContentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  training(relativePath: $relativePath) {
    ...TrainingParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${TrainingPartsFragmentDoc}`;
    AllTestimonialsQueryDocument = gql`
    query allTestimonialsQuery {
  testimonialsConnection {
    Testimonials: edges {
      Testimonial: node {
        name
        avatar
        body
        company
        rating
      }
    }
  }
}
    `;
    TestimonalsQueryDocument = gql`
    query testimonalsQuery($categories: [String!]) {
  testimonialsConnection(
    filter: {categories: {category: {testimonialCategories: {name: {in: $categories}}}}}
  ) {
    edges {
      node {
        name
        avatar
        body
        company
        rating
      }
    }
  }
}
    `;
    TechnologyCardContentQueryDocument = gql`
    query technologyCardContentQuery($cardNames: [String!]) {
  ...LayoutQueryFragment
  technologiesConnection(filter: {name: {in: $cardNames}}) {
    edges {
      node {
        ... on Technologies {
          name
          readMoreSlug
          thumbnail
          body
        }
      }
    }
  }
}
    ${LayoutQueryFragmentFragmentDoc}`;
    EmploymentPageQueryDocument = gql`
    query employmentPageQuery($relativePath: String!) {
  ...LayoutQueryFragment
  employment(relativePath: $relativePath) {
    ...EmploymentParts
  }
  opportunitiesConnection {
    edges {
      node {
        ...OpportunitiesParts
      }
    }
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${EmploymentPartsFragmentDoc}
${OpportunitiesPartsFragmentDoc}`;
    OfficeIndexQueryDocument = gql`
    query officeIndexQuery($relativePath: String!) {
  officeIndex(relativePath: $relativePath) {
    seo {
      title
      description
      canonical
      images {
        url
        width
        height
        alt
      }
    }
    officesIndex {
      office {
        ... on Offices {
          url
          name
          streetAddress
          suburb
          addressLocality
          addressRegion
          addressCountry
          postalCode
          phone
          days
          thumbnail
        }
      }
    }
  }
}
    `;
    ProductContentQueryDocument = gql`
    query productContentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  products(relativePath: $relativePath) {
    ...ProductsParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${ProductsPartsFragmentDoc}`;
    IndustryContentQueryDocument = gql`
    query industryContentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  industry(relativePath: $relativePath) {
    ...IndustryParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${IndustryPartsFragmentDoc}`;
    PresetsQueryDocument = gql`
    query presetsQuery($categories: [String!], $name: [String!]) {
  presetsConnection(
    filter: {categories: {category: {presetsCategory: {name: {in: $categories}}}}, name: {in: $name}}
  ) {
    edges {
      node {
        name
        className
      }
    }
  }
}
    `;
    MarketingDocument = gql`
    query marketing($relativePath: String!) {
  marketing(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...MarketingParts
  }
}
    ${MarketingPartsFragmentDoc}`;
    MarketingConnectionDocument = gql`
    query marketingConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: MarketingFilter) {
  marketingConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...MarketingParts
      }
    }
  }
}
    ${MarketingPartsFragmentDoc}`;
    GlobalDocument = gql`
    query global($relativePath: String!) {
  global(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
    GlobalConnectionDocument = gql`
    query globalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalFilter) {
  globalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalParts
      }
    }
  }
}
    ${GlobalPartsFragmentDoc}`;
    PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
    PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
    ConsultingIndexDocument = gql`
    query consultingIndex($relativePath: String!) {
  consultingIndex(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ConsultingIndexParts
  }
}
    ${ConsultingIndexPartsFragmentDoc}`;
    ConsultingIndexConnectionDocument = gql`
    query consultingIndexConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ConsultingIndexFilter) {
  consultingIndexConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ConsultingIndexParts
      }
    }
  }
}
    ${ConsultingIndexPartsFragmentDoc}`;
    ConsultingCategoryDocument = gql`
    query consultingCategory($relativePath: String!) {
  consultingCategory(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ConsultingCategoryParts
  }
}
    ${ConsultingCategoryPartsFragmentDoc}`;
    ConsultingCategoryConnectionDocument = gql`
    query consultingCategoryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ConsultingCategoryFilter) {
  consultingCategoryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ConsultingCategoryParts
      }
    }
  }
}
    ${ConsultingCategoryPartsFragmentDoc}`;
    ConsultingTagDocument = gql`
    query consultingTag($relativePath: String!) {
  consultingTag(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ConsultingTagParts
  }
}
    ${ConsultingTagPartsFragmentDoc}`;
    ConsultingTagConnectionDocument = gql`
    query consultingTagConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ConsultingTagFilter) {
  consultingTagConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ConsultingTagParts
      }
    }
  }
}
    ${ConsultingTagPartsFragmentDoc}`;
    ConsultingDocument = gql`
    query consulting($relativePath: String!) {
  consulting(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ConsultingParts
  }
}
    ${ConsultingPartsFragmentDoc}`;
    ConsultingConnectionDocument = gql`
    query consultingConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ConsultingFilter) {
  consultingConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ConsultingParts
      }
    }
  }
}
    ${ConsultingPartsFragmentDoc}`;
    VideoProductionDocument = gql`
    query videoProduction($relativePath: String!) {
  videoProduction(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...VideoProductionParts
  }
}
    ${VideoProductionPartsFragmentDoc}`;
    VideoProductionConnectionDocument = gql`
    query videoProductionConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: VideoProductionFilter) {
  videoProductionConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...VideoProductionParts
      }
    }
  }
}
    ${VideoProductionPartsFragmentDoc}`;
    TestimonialsDocument = gql`
    query testimonials($relativePath: String!) {
  testimonials(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialsParts
  }
}
    ${TestimonialsPartsFragmentDoc}`;
    TestimonialsConnectionDocument = gql`
    query testimonialsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialsFilter) {
  testimonialsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialsParts
      }
    }
  }
}
    ${TestimonialsPartsFragmentDoc}`;
    TestimonialCategoriesDocument = gql`
    query testimonialCategories($relativePath: String!) {
  testimonialCategories(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialCategoriesParts
  }
}
    ${TestimonialCategoriesPartsFragmentDoc}`;
    TestimonialCategoriesConnectionDocument = gql`
    query testimonialCategoriesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialCategoriesFilter) {
  testimonialCategoriesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialCategoriesParts
      }
    }
  }
}
    ${TestimonialCategoriesPartsFragmentDoc}`;
    TechnologiesDocument = gql`
    query technologies($relativePath: String!) {
  technologies(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TechnologiesParts
  }
}
    ${TechnologiesPartsFragmentDoc}`;
    TechnologiesConnectionDocument = gql`
    query technologiesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TechnologiesFilter) {
  technologiesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TechnologiesParts
      }
    }
  }
}
    ${TechnologiesPartsFragmentDoc}`;
    OfficesDocument = gql`
    query offices($relativePath: String!) {
  offices(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OfficesParts
  }
}
    ${OfficesPartsFragmentDoc}`;
    OfficesConnectionDocument = gql`
    query officesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OfficesFilter) {
  officesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OfficesParts
      }
    }
  }
}
    ${OfficesPartsFragmentDoc}`;
    OpportunitiesDocument = gql`
    query opportunities($relativePath: String!) {
  opportunities(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OpportunitiesParts
  }
}
    ${OpportunitiesPartsFragmentDoc}`;
    OpportunitiesConnectionDocument = gql`
    query opportunitiesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OpportunitiesFilter) {
  opportunitiesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OpportunitiesParts
      }
    }
  }
}
    ${OpportunitiesPartsFragmentDoc}`;
    EmploymentDocument = gql`
    query employment($relativePath: String!) {
  employment(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EmploymentParts
  }
}
    ${EmploymentPartsFragmentDoc}`;
    EmploymentConnectionDocument = gql`
    query employmentConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EmploymentFilter) {
  employmentConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EmploymentParts
      }
    }
  }
}
    ${EmploymentPartsFragmentDoc}`;
    OfficeIndexDocument = gql`
    query officeIndex($relativePath: String!) {
  officeIndex(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OfficeIndexParts
  }
}
    ${OfficeIndexPartsFragmentDoc}`;
    OfficeIndexConnectionDocument = gql`
    query officeIndexConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OfficeIndexFilter) {
  officeIndexConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OfficeIndexParts
      }
    }
  }
}
    ${OfficeIndexPartsFragmentDoc}`;
    ProductsIndexDocument = gql`
    query productsIndex($relativePath: String!) {
  productsIndex(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProductsIndexParts
  }
}
    ${ProductsIndexPartsFragmentDoc}`;
    ProductsIndexConnectionDocument = gql`
    query productsIndexConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProductsIndexFilter) {
  productsIndexConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProductsIndexParts
      }
    }
  }
}
    ${ProductsIndexPartsFragmentDoc}`;
    ProductsDocument = gql`
    query products($relativePath: String!) {
  products(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProductsParts
  }
}
    ${ProductsPartsFragmentDoc}`;
    ProductsConnectionDocument = gql`
    query productsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProductsFilter) {
  productsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProductsParts
      }
    }
  }
}
    ${ProductsPartsFragmentDoc}`;
    TrainingDocument = gql`
    query training($relativePath: String!) {
  training(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TrainingParts
  }
}
    ${TrainingPartsFragmentDoc}`;
    TrainingConnectionDocument = gql`
    query trainingConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TrainingFilter) {
  trainingConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TrainingParts
      }
    }
  }
}
    ${TrainingPartsFragmentDoc}`;
    NewslettersDocument = gql`
    query newsletters($relativePath: String!) {
  newsletters(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NewslettersParts
  }
}
    ${NewslettersPartsFragmentDoc}`;
    NewslettersConnectionDocument = gql`
    query newslettersConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NewslettersFilter) {
  newslettersConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NewslettersParts
      }
    }
  }
}
    ${NewslettersPartsFragmentDoc}`;
    PresenterDocument = gql`
    query presenter($relativePath: String!) {
  presenter(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PresenterParts
  }
}
    ${PresenterPartsFragmentDoc}`;
    PresenterConnectionDocument = gql`
    query presenterConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PresenterFilter) {
  presenterConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PresenterParts
      }
    }
  }
}
    ${PresenterPartsFragmentDoc}`;
    LocationsDocument = gql`
    query locations($relativePath: String!) {
  locations(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LocationsParts
  }
}
    ${LocationsPartsFragmentDoc}`;
    LocationsConnectionDocument = gql`
    query locationsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LocationsFilter) {
  locationsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LocationsParts
      }
    }
  }
}
    ${LocationsPartsFragmentDoc}`;
    IndustryDocument = gql`
    query industry($relativePath: String!) {
  industry(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...IndustryParts
  }
}
    ${IndustryPartsFragmentDoc}`;
    IndustryConnectionDocument = gql`
    query industryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: IndustryFilter) {
  industryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...IndustryParts
      }
    }
  }
}
    ${IndustryPartsFragmentDoc}`;
    PresetsDocument = gql`
    query presets($relativePath: String!) {
  presets(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PresetsParts
  }
}
    ${PresetsPartsFragmentDoc}`;
    PresetsConnectionDocument = gql`
    query presetsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PresetsFilter) {
  presetsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PresetsParts
      }
    }
  }
}
    ${PresetsPartsFragmentDoc}`;
    PresetsCategoryDocument = gql`
    query presetsCategory($relativePath: String!) {
  presetsCategory(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PresetsCategoryParts
  }
}
    ${PresetsCategoryPartsFragmentDoc}`;
    PresetsCategoryConnectionDocument = gql`
    query presetsCategoryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PresetsCategoryFilter) {
  presetsCategoryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PresetsCategoryParts
      }
    }
  }
}
    ${PresetsCategoryPartsFragmentDoc}`;
    generateRequester = (client2) => {
      const requester = async (doc, vars, _options) => {
        const data = await client2.request({
          query: doc,
          variables: vars
        });
        return { data: data?.data, query: doc, variables: vars || {} };
      };
      return requester;
    };
    queries = (client2) => {
      const requester = generateRequester(client2);
      return getSdk(requester);
    };
  }
});

// .tina/__generated__/client.ts
import { createClient as createClient2 } from "tinacms/dist/client";
var client, client_default;
var init_client = __esm({
  ".tina/__generated__/client.ts"() {
    init_types();
    client = createClient2({ url: "http://localhost:4001/graphql", token: "undefined", queries });
    client_default = client;
  }
});

// helpers/embeds.ts
var MATCH_URL_YOUTUBE, getYouTubeId;
var init_embeds = __esm({
  "helpers/embeds.ts"() {
    MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
    getYouTubeId = (url) => {
      if (!url)
        return "";
      const match = url.match(MATCH_URL_YOUTUBE);
      return match && match[1];
    };
  }
});

// components/embeds/youtubeEmbed.tsx
var youtubeEmbed_exports = {};
__export(youtubeEmbed_exports, {
  YouTubeEmbed: () => YouTubeEmbed
});
var YouTubeEmbed;
var init_youtubeEmbed = __esm({
  "components/embeds/youtubeEmbed.tsx"() {
    init_embeds();
    YouTubeEmbed = ({
      className,
      width,
      height,
      url,
      autoplay
    }) => {
      return React.createElement(
        "iframe",
        {
          className,
          width,
          height,
          src: `https://www.youtube.com/embed/${getYouTubeId(url || "")}?autoplay=${autoplay ? 1 : 0}`,
          title: "YouTube video player",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowFullScreen: true
        }
      );
    };
  }
});

// components/videoModal.tsx
import dynamic2 from "next/dynamic";
import Image5 from "next/image";
import { useState as useState7 } from "react";
import { FaPlayCircle } from "react-icons/fa";
var YouTubeEmbed2, VideoModal, PlayArrow;
var init_videoModal = __esm({
  "components/videoModal.tsx"() {
    init_embeds();
    YouTubeEmbed2 = dynamic2(
      () => Promise.resolve().then(() => (init_youtubeEmbed(), youtubeEmbed_exports)).then((mod) => mod.YouTubeEmbed),
      {
        ssr: false
      }
    );
    VideoModal = ({ children = null, url }) => {
      const id = url ? getYouTubeId(url) : null;
      const [clicked, setClicked] = useState7(false);
      const [imageSrc, setImageSrc] = useState7(
        `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      );
      return React.createElement("div", null, React.createElement("div", { className: "overflow-hidden rounded" }, React.createElement("div", { className: "relative mx-auto aspect-video h-full w-full" }, !clicked ? React.createElement("div", { className: "h-full w-full ", onClick: () => setClicked(true) }, React.createElement(
        Image5,
        {
          src: imageSrc,
          fill: true,
          alt: "YouTube video player",
          onError: () => {
            if (imageSrc.includes("maxresdefault")) {
              setImageSrc(
                `https://img.youtube.com/vi/${id}/mqdefault.jpg`
              );
            }
          }
        }
      ), React.createElement(PlayArrow, null)) : React.createElement(
        YouTubeEmbed2,
        {
          className: "absolute left-0 top-0",
          url: url || "",
          width: "100%",
          height: "100%",
          autoplay: true
        }
      )), children));
    };
    PlayArrow = () => {
      return React.createElement(
        FaPlayCircle,
        {
          className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-sswRed",
          size: 70
        }
      );
    };
  }
});

// components/blocks/videoEmbed.tsx
var videoEmbed_exports = {};
__export(videoEmbed_exports, {
  VideoEmbed: () => VideoEmbed,
  videoEmbedBlockSchema: () => videoEmbedBlockSchema
});
import classNames14 from "classnames";
var VideoEmbed, videoEmbedBlockSchema;
var init_videoEmbed = __esm({
  "components/blocks/videoEmbed.tsx"() {
    init_videoModal();
    VideoEmbed = ({ data }) => {
      const width = data.videoWidth || "w-3/4";
      const margin = data.removeMargin ? "" : "m-8";
      return React.createElement("div", { className: classNames14("relative mx-auto aspect-video", width, margin) }, React.createElement(VideoModal, { url: data.url }));
    };
    videoEmbedBlockSchema = {
      name: "VideoEmbed",
      label: "Video Embed",
      ui: {
        previewSrc: "/blocks/videoEmbedContent.png"
      },
      fields: [
        {
          type: "string",
          label: "Video URL",
          name: "url",
          description: "Only YouTube URLs are supported. To embed videos from other sources, please raise an issue",
          required: true
        },
        {
          type: "string",
          label: "Width",
          description: "Default is 75%",
          name: "videoWidth",
          required: false,
          options: [
            {
              value: "w-full",
              label: "100%"
            },
            {
              value: "w-3/4",
              label: "75%"
            },
            {
              value: "w-1/2",
              label: "50%"
            },
            {
              value: "w-1/4",
              label: "25%"
            }
          ]
        },
        {
          type: "boolean",
          label: "Remove margin",
          name: "removeMargin",
          required: false
        }
      ]
    };
  }
});

// components/blocks/carousel.tsx
var carousel_exports = {};
__export(carousel_exports, {
  Carousel: () => Carousel,
  carouselBlock: () => carouselBlock,
  carouselBlockSchema: () => carouselBlockSchema
});
import Image10 from "next/image";
import { useRouter } from "next/router";
import * as React8 from "react";
import { tinaField as tinaField5 } from "tinacms/dist/react";
import { Carousel as CarouselImplementation } from "react-responsive-carousel";
var Carousel, createCarouselItemImage, createCarouselIndicator, carouselBlock, carouselBlockSchema;
var init_carousel = __esm({
  "components/blocks/carousel.tsx"() {
    init_container();
    init_section();
    Carousel = ({ data }) => {
      const router = useRouter();
      const openItem = ({ link, openIn }) => {
        if (openIn === "newWindow") {
          window.open(link, "_blank");
          return;
        } else if (openIn === "sameWindow") {
          router.push(link);
          return;
        } else if (openIn === "modal") {
          window.open(link, "_blank");
          return;
        } else {
          console.log(`unknown openIn value '${openIn}'`);
        }
      };
      return React8.createElement(
        Section,
        {
          className: `${data.showOnMobileDevices ? "flex" : "hidden md:flex"}`,
          color: data.backgroundColor
        },
        React8.createElement(
          Container,
          {
            size: "custom",
            className: "w-full",
            "data-tina-field": tinaField5(data, carouselBlock.delay)
          },
          React8.createElement(
            CarouselImplementation,
            {
              autoPlay: true,
              infiniteLoop: true,
              showArrows: false,
              showThumbs: false,
              showStatus: false,
              stopOnHover: true,
              interval: data.delay * 1e3,
              onClickItem: (x) => {
                if (data.items[x].link) {
                  openItem(data.items[x]);
                }
              },
              renderIndicator: createCarouselIndicator
            },
            data.items && data.items.map(
              (props, index) => createCarouselItemImage(props, index, data)
            )
          )
        )
      );
    };
    createCarouselItemImage = (props, index, carouselSchema) => {
      const { imgSrc, label } = props;
      return React8.createElement(
        "div",
        {
          key: index,
          "data-tina-field": tinaField5(
            carouselSchema,
            carouselBlock.items.value + `[${index}]`
          )
        },
        React8.createElement(
          Image10,
          {
            src: imgSrc ?? "",
            alt: label,
            height: 388,
            width: 1080,
            sizes: "100vw"
          }
        ),
        React8.createElement("p", { className: "legend sr-only" }, label)
      );
    };
    createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
      if (isSelected) {
        return React8.createElement(
          "li",
          {
            className: "mx-1 my-0 inline-block h-7 w-7 bg-sswRed",
            "aria-label": `Selected: ${label} ${index + 1}`,
            title: `Selected: ${label} ${index + 1}`
          }
        );
      }
      return React8.createElement(
        "li",
        {
          className: "mx-1 my-0 inline-block h-7 w-7 bg-gray-500",
          onClick: onClickHandler,
          onKeyDown: onClickHandler,
          value: index,
          key: index,
          role: "button",
          tabIndex: 0,
          title: `${label} ${index + 1}`,
          "aria-label": `${label} ${index + 1}`
        }
      );
    };
    carouselBlock = {
      items: {
        value: "items",
        label: "label",
        link: "link",
        imgSrc: "imgSrc"
      },
      delay: "delay"
    };
    carouselBlockSchema = {
      name: "Carousel",
      label: "Carousel",
      ui: {
        previewSrc: "/blocks/hero.png"
      },
      fields: [
        {
          label: "Items",
          name: carouselBlock.items.value,
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Item description",
              link: "/",
              openIn: "sameWindow"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: carouselBlock.items.label
            },
            {
              type: "string",
              label: "URL",
              name: carouselBlock.items.link
            },
            {
              type: "string",
              label: "Open in",
              name: "openIn",
              options: [
                { label: "Same window", value: "sameWindow" },
                { label: "Modal", value: "modal" },
                { label: "New window", value: "newWindow" }
              ]
            },
            {
              type: "image",
              label: "Image",
              name: carouselBlock.items.imgSrc,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              uploadDir: () => "/carousel"
            }
          ]
        },
        {
          type: "string",
          label: "Background Color",
          name: "backgroundColor",
          options: [
            { label: "Default", value: "default" },
            { label: "Light Gray", value: "lightgray" },
            { label: "Red", value: "red" },
            { label: "Black", value: "black" }
          ]
        },
        {
          type: "number",
          label: "Delay (Seconds)",
          name: carouselBlock.delay,
          required: true
        },
        {
          type: "boolean",
          label: "Show on mobile devices",
          name: "showOnMobileDevices"
        }
      ]
    };
  }
});

// components/blocks/internalCarousel.tsx
var internalCarousel_exports = {};
__export(internalCarousel_exports, {
  InternalCarousel: () => InternalCarousel,
  internalCarouselBlockSchema: () => internalCarouselBlockSchema
});
import Image11 from "next/image";
import * as React9 from "react";
import { TinaMarkdown as TinaMarkdown9 } from "tinacms/dist/rich-text";
import { Carousel as CarouselImplementation2 } from "react-responsive-carousel";
var InternalCarousel, createCarouselItemImage2, createCarouselIndicator2, renderBody, createTechBlock, internalCarouselBlockSchema;
var init_internalCarousel = __esm({
  "components/blocks/internalCarousel.tsx"() {
    init_container();
    InternalCarousel = ({ data }) => {
      return React9.createElement(Container, { size: "custom", className: "px-0 md:w-3/4" }, React9.createElement(
        CarouselImplementation2,
        {
          autoPlay: true,
          infiniteLoop: true,
          showArrows: false,
          showThumbs: false,
          showStatus: false,
          stopOnHover: true,
          renderIndicator: createCarouselIndicator2
        },
        data.items?.map(createCarouselItemImage2)
      ), renderBody(data));
    };
    createCarouselItemImage2 = ({ imgSrc, label }, index) => {
      return React9.createElement("div", { key: index }, React9.createElement(Image11, { src: imgSrc, alt: label, height: 0, width: 0, sizes: "100vw" }), React9.createElement("p", { className: "legend sr-only" }, label));
    };
    createCarouselIndicator2 = (onClickHandler, isSelected, index, label) => {
      if (isSelected) {
        return React9.createElement(
          "li",
          {
            className: "mx-1 my-0 inline-block h-6 w-6 bg-sswRed md:h-7 md:w-7",
            "aria-label": `Selected: ${label} ${index + 1}`,
            title: `Selected: ${label} ${index + 1}`
          }
        );
      }
      return React9.createElement(
        "li",
        {
          className: "mx-1 my-0 inline-block h-6 w-6 bg-gray-500 md:h-7 md:w-7",
          onClick: onClickHandler,
          onKeyDown: onClickHandler,
          value: index,
          key: index,
          role: "button",
          tabIndex: 0,
          title: `${label} ${index + 1}`,
          "aria-label": `${label} ${index + 1}`
        }
      );
    };
    renderBody = ({ header, paragraph, website, technologies }) => {
      return React9.createElement("div", { key: header, className: header ? "" : "hidden" }, React9.createElement("div", { className: "mt-2 flex justify-between text-left font-semibold text-sswRed prose-p:py-0" }, React9.createElement("h4", null, header), React9.createElement("span", { className: website ? "" : "hidden" }, React9.createElement("a", { href: website, target: "_blank", rel: "noopener noreferrer" }, "Visit Website"))), React9.createElement("div", { className: "text-left prose-p:py-2" }, React9.createElement(TinaMarkdown9, { content: paragraph })), React9.createElement("div", { className: "flex flex-wrap" }, technologies?.map(createTechBlock)), React9.createElement("div", { className: "mb-7 mt-3 h-1 w-full bg-sswRed" }));
    };
    createTechBlock = ({ name }, index) => {
      return React9.createElement(
        "div",
        {
          className: "my-0.5 mr-1 min-w-fit bg-sswRed px-2 py-1 text-left",
          key: index
        },
        name
      );
    };
    internalCarouselBlockSchema = {
      name: "InternalCarousel",
      label: "Internal Carousel",
      ui: {
        previewSrc: "/blocks/hero.png",
        itemProps: (item) => ({ label: item.items.header })
      },
      fields: [
        {
          label: "Images",
          name: "items",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Image description"
            },
            itemProps: (item) => ({ label: item.imgSrc })
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label"
            },
            {
              type: "image",
              label: "Image",
              name: "imgSrc",
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              uploadDir: () => "/carousel"
            }
          ]
        },
        {
          type: "string",
          label: "Header",
          name: "header"
        },
        {
          type: "rich-text",
          label: "Text",
          name: "paragraph",
          isBody: false
        },
        {
          type: "string",
          label: "Website",
          name: "website"
        },
        {
          type: "object",
          label: "Technologies",
          name: "technologies",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.name };
            }
          },
          fields: [
            {
              type: "string",
              label: "Name",
              name: "name"
            }
          ]
        }
      ]
    };
  }
});

// components/blocks/tableLayout.tsx
var tableLayout_exports = {};
__export(tableLayout_exports, {
  TableLayout: () => TableLayout,
  tableBlockSchema: () => tableBlockSchema
});
import classNames16 from "classnames";
import MarkdownIt from "markdown-it";
import markdownItMultimdTable from "markdown-it-multimd-table";
import path from "path";
import { useEffect as useEffect8, useState as useState12 } from "react";
var md, TableLayout, tableBlockSchema;
var init_tableLayout = __esm({
  "components/blocks/tableLayout.tsx"() {
    init_client();
    md = new MarkdownIt().use(markdownItMultimdTable, {
      multiline: true
    });
    TableLayout = ({ data }) => {
      const [tableClasses, setTableClasses] = useState12([]);
      const [mdxTableString, setMdxTableString] = useState12("");
      const presetNames = data.tablePresets.filter((preset) => preset.preset).map((preset) => path.basename(preset.preset, ".json"));
      useEffect8(() => {
        async function init() {
          const presets = await client_default.queries.presetsQuery({
            categories: ["table"],
            name: presetNames
          });
          const orderedPresetNodes = presets.data.presetsConnection.edges.sort(
            (a, b) => presetNames.indexOf(a.node.name) - presetNames.indexOf(b.node.name)
          );
          const presetClassNames = orderedPresetNodes.map((p) => p.node.className);
          setTableClasses(presetClassNames);
        }
        init();
        const html = md.render(data.mdxTable ?? "");
        setMdxTableString(html);
      }, [data]);
      return React.createElement(
        "div",
        {
          className: classNames16(
            "not-prose child-table:border-1 descendant-th:border-1 descendant-th:border-gray-75  descendant-th:py-2 descendant-th:pl-2 descendant-td:border-y-1 descendant-td:py-1.5 descendant-td:pl-2",
            ...tableClasses
          ),
          dangerouslySetInnerHTML: { __html: mdxTableString }
        }
      );
    };
    tableBlockSchema = {
      label: "Table Layout",
      name: "TableLayout",
      ui: {
        itemProps: (item) => {
          return { label: item?.mdxTable };
        }
      },
      fields: [
        {
          type: "object",
          label: "Table Presets",
          name: "tablePresets",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.preset };
            }
          },
          fields: [
            {
              label: "Table Preset",
              name: "preset",
              type: "reference",
              collections: ["presets"]
            }
          ]
        },
        {
          type: "string",
          label: "Table",
          name: "mdxTable",
          ui: {
            component: "textarea"
          }
        }
      ]
    };
  }
});

// .tina/config.tsx
import { defineStaticConfig } from "tinacms";

// components/blocks/index.ts
init_bookingButton();
init_utilityButton();

// components/embeds/tweetEmbed.tsx
import Script from "next/script";
import { useEffect as useEffect2, useState as useState4 } from "react";
var tweetEmbedSchema = {
  label: "Tweet Embed",
  name: "TweetEmbed",
  fields: [
    {
      type: "string",
      name: "url",
      label: "Tweet URL",
      required: true
    }
  ]
};

// components/subNewsletter/subNewsletterRow.tsx
init_container();

// components/subNewsletter/subNewsletterForm.tsx
import axios2 from "axios";
import React3, { useState as useState5 } from "react";
import { FaRegCheckCircle as FaRegCheckCircle2, FaSpinner as FaSpinner2 } from "react-icons/fa";

// components/subNewsletter/subNewsletterRow.tsx
var subNewsletterRowSchema = {
  name: "SubNewsletterRow",
  label: "Subscribe To Newsletters Row",
  fields: [
    {
      type: "string",
      label: "Override Header Text",
      name: "headerText",
      required: false
    },
    {
      type: "string",
      label: "Override Subscribe Button Text",
      name: "subscribeButtonText",
      required: false
    },
    {
      type: "string",
      label: "Override Subscribe Sub Title",
      name: "subscribeSubTitle",
      required: false
    }
  ]
};

// components/terms-and-conditions/agreementForm.tsx
init_styles();
import React4 from "react";
import classnames from "classnames";
import { FaPrint } from "react-icons/fa";
var agreementFormBlockSchema = {
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
        { label: "Black", value: "black" }
      ]
    },
    {
      type: "object",
      label: "Form fields",
      name: "fields",
      list: true,
      fields: [
        {
          type: "string",
          label: "ID",
          name: "id",
          required: true
        },
        {
          type: "string",
          label: "Label",
          name: "label",
          required: true
        },
        {
          type: "string",
          label: "Placeholder",
          name: "placeholder"
        },
        {
          type: "boolean",
          label: "Resizeable",
          name: "resizeable",
          required: true
        }
      ]
    }
  ]
};

// components/training/eventBooking.tsx
init_container();
import classNames10 from "classnames";
import dayjs from "dayjs";
import { MdLocationOn } from "react-icons/md";
import { tinaField } from "tinacms/dist/react";
var eventBookingBlock = {
  eventBooking: "EventBooking",
  duration: "duration",
  price: "price",
  discountPrice: "discountPrice",
  discountNote: "discountNote",
  suffix: "suffix",
  eventList: {
    value: "eventList",
    city: "city",
    date: "date",
    bookingURL: "bookingURL"
  }
};
var eventBookingSchema = {
  name: eventBookingBlock.eventBooking,
  label: "Events Booking",
  fields: [
    {
      type: "number",
      label: "Duration",
      name: eventBookingBlock.duration
    },
    {
      type: "number",
      label: "Price",
      name: eventBookingBlock.price
    },
    {
      type: "number",
      label: "Discount Price",
      name: eventBookingBlock.discountPrice
    },
    {
      type: "string",
      label: "Discount Note",
      name: eventBookingBlock.discountNote
    },
    {
      type: "object",
      label: "Event",
      name: eventBookingBlock.eventList.value,
      ui: {
        itemProps: (item) => {
          return { label: item?.city };
        }
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "City",
          name: eventBookingBlock.eventList.city
        },
        {
          type: "datetime",
          label: "Date",
          name: eventBookingBlock.eventList.date,
          ui: {
            timeFormat: "MM:DD:YY"
          }
        },
        {
          type: "string",
          label: "Booking URL",
          name: eventBookingBlock.eventList.bookingURL
        }
      ]
    }
  ]
};

// components/training/locationBlock.tsx
import { FaGlobe, FaLocationArrow } from "react-icons/fa";
import { MdLocationOn as MdLocationOn2 } from "react-icons/md";
import { classNames as classNames11 } from "tinacms";
import { tinaField as tinaField2 } from "tinacms/dist/react";

// .tina/collections/location.tsx
var locationSchemaConstants = {
  value: "locations",
  header: "header",
  addressLine1: "addressLine1",
  addressLine2: "addressLine2",
  addressLine3: "addressLine3",
  directionURL: "directionURL"
};
var locationSchema = {
  label: "Locations",
  name: locationSchemaConstants.value,
  format: "mdx",
  path: "content/locations",
  fields: [
    {
      type: "string",
      name: locationSchemaConstants.header,
      label: "Header"
    },
    {
      type: "string",
      name: locationSchemaConstants.addressLine1,
      label: "Address Line 1"
    },
    {
      type: "string",
      name: locationSchemaConstants.addressLine2,
      label: "Address Line 2"
    },
    {
      type: "string",
      name: locationSchemaConstants.addressLine3,
      label: "Address Line 3"
    },
    {
      type: "string",
      name: locationSchemaConstants.directionURL,
      label: "Directions"
    }
  ]
};

// components/training/locationBlock.tsx
init_container();
var locationBlockConstant = {
  value: "LocationBlock",
  title: "title",
  locationList: { value: "locationList", location: "location" },
  chapelWebsite: {
    value: "chapelWebsite",
    title: "title",
    URL: "URL"
  }
};
var locationBlockSchema = {
  name: locationBlockConstant.value,
  label: "Locations",
  fields: [
    {
      type: "string",
      name: locationBlockConstant.title,
      label: "Title"
    },
    {
      type: "object",
      label: "Location List",
      name: locationBlockConstant.locationList.value,
      list: true,
      ui: {
        itemProps: (item) => {
          const location = item?.location;
          if (!location)
            return { label: "Please Attach location" };
          const formattedLabel = location.split("/")[2].replace(".mdx", "").replace(/-/g, " ").toUpperCase();
          return {
            label: formattedLabel
          };
        }
      },
      fields: [
        {
          type: "reference",
          collections: ["locations"],
          label: "Location",
          name: locationBlockConstant.locationList.location
        }
      ]
    },
    {
      type: "object",
      name: locationBlockConstant.chapelWebsite.value,
      label: "Chapel Website",
      fields: [
        {
          type: "string",
          name: locationBlockConstant.chapelWebsite.title,
          label: "Text"
        },
        {
          type: "string",
          name: locationBlockConstant.chapelWebsite.URL,
          label: "URL"
        }
      ]
    }
  ]
};

// components/training/presenterBlock.tsx
import Image from "next/image";
import { tinaField as tinaField3 } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// .tina/collections/presenter.tsx
var presenterSchemaConstants = {
  value: "presenter",
  profileImg: "profileImg",
  presenter: {
    value: "presenter",
    name: "name",
    peopleProfileURL: "peopleProfileURL"
  },
  about: "about"
};
var presenterSchema = {
  label: "Presenters",
  name: "presenter",
  format: "mdx",
  path: "content/presenters",
  fields: [
    {
      type: "image",
      name: presenterSchemaConstants.profileImg,
      label: "Profile Image"
    },
    {
      type: "object",
      name: presenterSchemaConstants.presenter.value,
      label: "Presenter",
      fields: [
        {
          type: "string",
          label: "Full Name",
          name: presenterSchemaConstants.presenter.name
        },
        {
          type: "string",
          label: "People Profile URL",
          name: presenterSchemaConstants.presenter.peopleProfileURL
        }
      ]
    },
    {
      type: "rich-text",
      name: presenterSchemaConstants.about,
      label: "About"
    }
  ]
};

// components/training/presenterBlock.tsx
init_container();
var presenterBlockConstant = {
  value: "PresenterBlock",
  header: "header",
  presenterList: {
    value: "presenterList",
    presenter: "presenter"
  },
  otherEvent: { value: "otherEvent", title: "title", eventURL: "eventURL" }
};
var presenterBlockSchema = {
  name: presenterBlockConstant.value,
  label: "Presenters",
  fields: [
    {
      type: "string",
      label: "Header",
      name: presenterBlockConstant.header
    },
    {
      type: "object",
      name: presenterBlockConstant.presenterList.value,
      label: "Presenters",
      list: true,
      ui: {
        itemProps: (item) => {
          const presenter = item?.presenter;
          if (!presenter)
            return { label: "Please Attach Presenter" };
          const formattedLabel = presenter.split("/")[2].replace(".mdx", "").replace(/-/g, " ").toUpperCase();
          return {
            label: formattedLabel
          };
        }
      },
      fields: [
        {
          type: "reference",
          name: presenterBlockConstant.presenterList.presenter,
          label: "Presenters",
          collections: ["presenter"]
        }
      ]
    },
    {
      type: "object",
      label: "Other Events",
      name: presenterBlockConstant.otherEvent.value,
      fields: [
        {
          type: "string",
          label: "Title",
          name: presenterBlockConstant.otherEvent.title
        },
        {
          type: "string",
          label: "URL",
          name: presenterBlockConstant.otherEvent.eventURL
        }
      ]
    }
  ]
};

// components/training/trainingInformation.tsx
import { TinaMarkdown as TinaMarkdown10 } from "tinacms/dist/rich-text";

// components/blocks/mdxComponentRenderer.tsx
init_utilityButton();
import dynamic3 from "next/dynamic";

// components/training/trainingLearningOutcome.tsx
init_container();

// components/util/horizontalList.tsx
import Image2 from "next/image";
import { TinaMarkdown as TinaMarkdown2 } from "tinacms/dist/rich-text";

// components/training/trainingLearningOutcome.tsx
init_section();
var trainingLearningOutcomeSchema = {
  label: "Training Learning Outcomes",
  name: "TrainingLearningOutcome",
  fields: [
    {
      type: "string",
      label: "Header",
      name: "header"
    },
    {
      type: "object",
      label: "List Items",
      name: "listItems",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "rich-text",
          label: "Content",
          name: "content",
          isBody: true
        },
        {
          type: "image",
          label: "Icon",
          name: "icon",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "/logos"
        }
      ]
    }
  ]
};

// components/blocks/citation.tsx
import React6 from "react";
var citationBlockSchema = {
  name: "Citation",
  label: "Citation",
  fields: [
    {
      type: "string",
      label: "author",
      name: "author"
    },
    {
      type: "string",
      label: "article",
      name: "article",
      required: true
    }
  ]
};

// components/blocks/clientLogos.tsx
init_client();
import React7, { useEffect as useEffect3, useState as useState6 } from "react";
import Image3 from "next/image";
var clientLogosBlockSchema = {
  name: "ClientLogos",
  label: "Client Logos",
  // Todo: Find a way to have no fields - the one below is to satisfy compiler
  fields: [
    {
      type: "string",
      label: "Alt text",
      name: "altText",
      required: true
    }
  ]
};

// components/blocks/contentCard.tsx
import { TinaMarkdown as TinaMarkdown4 } from "tinacms/dist/rich-text";

// components/blocks/verticalListItem.tsx
import Image4 from "next/image";
import { classNames as classNames13 } from "tinacms";
import { TinaMarkdown as TinaMarkdown3 } from "tinacms/dist/rich-text";
var verticalListItemSchema = {
  label: "List Item",
  name: "VerticalListItem",
  fields: [
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      isBody: true
    },
    {
      type: "image",
      label: "Icon",
      name: "icon",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "/icons"
    },
    {
      type: "number",
      label: "Icon Scale",
      name: "iconScale"
    },
    {
      type: "rich-text",
      label: "After Body",
      name: "afterBody",
      required: false
    }
  ]
};

// components/blocks/contentCard.tsx
init_videoEmbed();
var contentCardBlockSchema = {
  name: "ContentCard",
  label: "Content Card",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
    }
  },
  fields: [
    {
      type: "boolean",
      label: "Prose",
      name: "prose"
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      templates: [videoEmbedBlockSchema, verticalListItemSchema]
    }
  ]
};

// components/blocks/customImage.tsx
import Image6 from "next/image";
var customImageBlockSchema = {
  name: "CustomImage",
  label: "Custom Image",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "src",
      required: true
    },
    {
      type: "string",
      label: "Alt text",
      name: "altText",
      required: true
    },
    {
      type: "number",
      label: "Height",
      name: "height",
      required: true
    },
    {
      type: "number",
      label: "Width",
      name: "width",
      required: true
    },
    {
      type: "string",
      label: "Link (optional)",
      name: "link",
      required: false
    }
  ]
};

// components/blocks/dynamicColumns.tsx
import { TinaMarkdown as TinaMarkdown5 } from "tinacms/dist/rich-text";
var largest_col = 12;
var dynamicColumnsSchema = {
  name: "DynamicColumns",
  label: "Dynamic Column Layout",
  fields: [
    {
      type: "rich-text",
      label: "Column text body",
      name: "colBody",
      required: true
    },
    {
      type: "number",
      label: "Number of columns",
      name: "colCount",
      required: true,
      ui: {
        validate: (val) => {
          if (val > largest_col) {
            return `Number must be less than or equal to ${largest_col.toString()}`;
          } else if (val <= 0) {
            return "Number must be greater than 0";
          }
        }
      }
    }
  ]
};

// components/blocks/fixedColumns.tsx
import { TinaMarkdown as TinaMarkdown6 } from "tinacms/dist/rich-text";
var fixedColumnsSchema = {
  name: "FixedColumns",
  label: "Fixed Column Layout (2 columns)",
  fields: [
    {
      type: "rich-text",
      label: "First column text",
      name: "firstColBody",
      required: true,
      templates: [contentCardBlockSchema, customImageBlockSchema]
    },
    {
      type: "rich-text",
      label: "Second column text",
      name: "secondColBody",
      required: true,
      templates: [contentCardBlockSchema, customImageBlockSchema]
    }
  ]
};

// components/blocks/fixedTabsLayout.tsx
init_videoEmbed();
init_button();
import { TinaMarkdown as TinaMarkdown7 } from "tinacms/dist/rich-text";
init_bookingButton();
import { useEffect as useEffect4, useState as useState8 } from "react";
import classNames15 from "classnames";
var fixedTabsBlocks = [
  videoEmbedBlockSchema,
  bookingButtonSchema
];
var fixedTabsLayoutSchema = {
  name: "FixedTabsLayout",
  label: "Fixed Tabs Layout",
  fields: [
    {
      type: "string",
      name: "firstTab",
      label: "First Tab"
    },
    {
      type: "rich-text",
      name: "firstHeading",
      label: "First Heading",
      templates: [...fixedTabsBlocks]
    },
    {
      type: "rich-text",
      name: "firstBody",
      label: "First Body",
      templates: [...fixedTabsBlocks]
    },
    {
      type: "string",
      name: "secondTab",
      label: "Second Tab"
    },
    {
      type: "rich-text",
      name: "secondHeading",
      label: "Second Heading",
      templates: [...fixedTabsBlocks]
    },
    {
      type: "rich-text",
      name: "secondBody",
      label: "Second Body",
      templates: [...fixedTabsBlocks]
    }
  ]
};

// components/blocks/flag.tsx
import Image7 from "next/image";

// components/util/constants/country.tsx
var sswCountries = [
  {
    label: "Australia",
    flagUrl: "/images/logos/australia-flag.svg"
  },
  {
    label: "China",
    flagUrl: "/images/logos/china-flag.svg"
  },
  {
    label: "France",
    flagUrl: "/images/logos/france-flag.svg"
  }
];

// components/blocks/flag.tsx
var flagSchema = {
  name: "Flag",
  label: "Flag Image",
  fields: [
    {
      type: "string",
      label: "Country",
      name: "country",
      options: sswCountries.map((item) => item.label),
      required: true
    }
  ]
};

// components/blocks/googleMapsWrapper.tsx
var googleMapsSchema = {
  label: "Google Maps",
  name: "GoogleMaps",
  fields: [
    {
      type: "string",
      label: "URL",
      name: "embedUrl",
      required: true
    },
    {
      type: "string",
      label: "Width",
      name: "embedWidth"
    },
    {
      type: "string",
      label: "Height",
      name: "embedHeight"
    }
  ]
};

// components/blocks/newslettersTable.tsx
init_client();
import { useEffect as useEffect5, useState as useState9 } from "react";
import { FaSpinner as FaSpinner3 } from "react-icons/fa";

// services/client/date.service.ts
init_constants();
var transformIntToMonth = (monthNumber) => {
  return months[monthNumber - 1];
};

// components/blocks/newslettersTable.tsx
var newslettersTableBlockSchema = {
  name: "NewslettersTable",
  label: "Newsletters Table",
  fields: [
    {
      type: "string",
      label: "Header text",
      name: "headerText"
    }
  ]
};

// components/blocks/recurringEvent.tsx
import { useEffect as useEffect6, useState as useState10 } from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
var recurringEventSchema = {
  label: "Recurring Event",
  name: "RecurringEvent",
  fields: [
    {
      type: "string",
      label: "Apply Link Redirect",
      name: "applyLinkRedirect"
    },
    {
      type: "string",
      label: "Day",
      name: "day",
      options: [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" }
      ],
      required: true
    }
  ]
};

// components/blocks/upcomingEvents.tsx
import dayjs2 from "dayjs";
import Image8 from "next/image";
import Link from "next/link";
import { useEffect as useEffect7, useState as useState11 } from "react";
import { tinaField as tinaField4 } from "tinacms/dist/react";
import axios3 from "axios";
var upcomingEventsBlockSchema = {
  name: "UpcomingEvents",
  label: "Upcoming Events",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      title: "Upcoming Events",
      numberOfEvents: 30
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "number",
      label: "Number of Events",
      name: "numberOfEvents"
    }
  ]
};

// components/blocks/verticalImageLayout.tsx
import Image9 from "next/image";
import { TinaMarkdown as TinaMarkdown8 } from "tinacms/dist/rich-text";
var verticalImageLayoutBlockSchema = {
  name: "VerticalImageLayout",
  label: "Vertical Image Layout",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imageSrc",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "/verticalImageLayout"
    },
    {
      type: "string",
      label: "Alt text",
      name: "altText",
      required: true
    },
    {
      type: "string",
      label: "Link",
      name: "imageLink"
    },
    {
      type: "number",
      label: "Height",
      name: "height",
      required: true
    },
    {
      type: "number",
      label: "Width",
      name: "width",
      required: true
    },
    {
      type: "rich-text",
      label: "Message",
      name: "message",
      required: true
    }
  ]
};

// components/blocks/mdxComponentRenderer.tsx
var Carousel2 = dynamic3(
  () => Promise.resolve().then(() => (init_carousel(), carousel_exports)).then((mod) => mod.Carousel),
  {
    ssr: false
  }
);
var InternalCarousel2 = dynamic3(
  () => Promise.resolve().then(() => (init_internalCarousel(), internalCarousel_exports)).then((mod) => mod.InternalCarousel),
  { ssr: false }
);
var BookingButton2 = dynamic3(
  () => Promise.resolve().then(() => (init_bookingButton(), bookingButton_exports)).then((mod) => mod.BookingButton),
  { ssr: false }
);
var TableLayout2 = dynamic3(
  () => Promise.resolve().then(() => (init_tableLayout(), tableLayout_exports)).then((mod) => mod.TableLayout),
  { ssr: false }
);
var VideoEmbed2 = dynamic3(
  () => Promise.resolve().then(() => (init_videoEmbed(), videoEmbed_exports)).then((mod) => mod.VideoEmbed),
  { ssr: false }
);

// components/training/trainingInformation.tsx
init_container();
init_section();
var trainingInformationSchema = {
  label: "Training Information",
  name: "TrainingInformation",
  fields: [
    {
      type: "object",
      label: "Training Information Items",
      name: "trainingInformationItems",
      list: true,
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header"
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
          templates: [verticalListItemSchema, recurringEventSchema]
        }
      ]
    }
  ]
};

// components/blocks/aboutUs.tsx
init_global();
init_container();
init_section();
init_videoModal();
import classNames17 from "classnames";
import dayjs3 from "dayjs";
import Link2 from "next/link";
import { useEffect as useEffect9, useState as useState13 } from "react";
import { BiChevronRightCircle } from "react-icons/bi";
import { tinaField as tinaField6 } from "tinacms/dist/react";
var aboutUsBlockSchema = {
  name: "AboutUs",
  label: "About Us",
  fields: [
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" }
      ]
    }
  ]
};

// components/blocks/agenda.tsx
import { classNames as classNames18 } from "tinacms";
import { tinaField as tinaField7 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown11 } from "tinacms/dist/rich-text";
init_container();
init_section();
var agendaBlockConstant = {
  value: "Agenda",
  header: "header",
  align: "align",
  textColor: "textColor",
  agendaItemList: {
    value: "agendaItemList",
    placeholder: "placeholder",
    body: "body"
  }
};
var agendaSchema = {
  label: "Agenda",
  name: agendaBlockConstant.value,
  fields: [
    {
      type: "string",
      label: "Header",
      name: agendaBlockConstant.header
    },
    {
      type: "string",
      label: "Align Header",
      name: agendaBlockConstant.align,
      options: [
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Left", value: "left" }
      ]
    },
    {
      type: "string",
      label: "Header Color",
      name: agendaBlockConstant.textColor,
      options: [
        { label: "Red", value: "red" },
        { label: "Grey", value: "grey" },
        { label: "Default", value: "default" }
      ]
    },
    {
      type: "object",
      label: "Agenda Items",
      name: agendaBlockConstant.agendaItemList.value,
      ui: {
        itemProps(item) {
          return { label: item?.placeholder };
        }
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "Placeholder Text",
          name: agendaBlockConstant.agendaItemList.placeholder
        },
        {
          type: "rich-text",
          label: "Body",
          name: agendaBlockConstant.agendaItemList.body,
          templates: [verticalListItemSchema]
        }
      ]
    }
  ]
};

// components/blocks/builtOnAzure.tsx
init_container();
init_section();
import Image12 from "next/image";
import Link3 from "next/link";
import { tinaField as tinaField8 } from "tinacms/dist/react";
var builtOnAzureBlockSchema = {
  name: "BuiltOnAzure",
  label: "Built on Azure",
  // Todo: Turn into util field
  fields: [
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" }
      ]
    }
  ]
};

// components/blocks/index.ts
init_carousel();

// components/blocks/content.tsx
init_container();
init_section();
import classNames19 from "classnames";
import { tinaField as tinaField9 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown12 } from "tinacms/dist/rich-text";
var contentBlock = {
  title: "title",
  content: "content"
};
var contentBlockSchema = {
  name: "Content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: contentBlock.title
    },
    {
      type: "rich-text",
      label: "Content",
      name: contentBlock.content,
      templates: [customImageBlockSchema, clientLogosBlockSchema]
    },
    {
      type: "string",
      label: "Text size",
      name: "size",
      options: [
        { label: "small", value: "sm" },
        { label: "normal", value: "base" },
        { label: "large", value: "lg" },
        { label: "extra large", value: "xl" },
        { label: "2x large", value: "2xl" }
      ]
    },
    {
      type: "string",
      label: "Align",
      name: "align",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" }
      ]
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" }
      ]
    }
  ]
};

// components/blocks/hero.tsx
import * as React11 from "react";
import { TinaMarkdown as TinaMarkdown13 } from "tinacms/dist/rich-text";

// components/util/actions.tsx
import Link4 from "next/link";
import * as React10 from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { classNames as classNames20 } from "tinacms";

// components/blocks/hero.tsx
init_container();
init_section();
var heroBlockSchema = {
  name: "Hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
  },
  fields: [
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      label: "Text",
      name: "text",
      type: "rich-text"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Icon",
          name: "icon",
          type: "boolean"
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        }
      ]
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};

// components/blocks/index.ts
init_internalCarousel();

// components/blocks/serviceCards.tsx
init_container();
init_section();
import Image13 from "next/image";
import Link5 from "next/link";
import { tinaField as tinaField10 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown14 } from "tinacms/dist/rich-text";
var serviceCards = {
  bigCardsLabel: "bigCardsLabel",
  bigCards: {
    value: "bigCards",
    title: "title",
    description: "description",
    color: "color",
    link: "link",
    imgSrc: "imgSrc"
  },
  smallCardsLabel: "smallCardsLabel",
  smallCards: {
    value: "smallCards",
    title: "title",
    link: "link",
    color: "color",
    imgSrc: "imgSrc"
  },
  links: {
    value: "links",
    label: "label",
    link: "link"
  },
  backgroundColor: "backgroundColor"
};
var serviceCardsBlockSchema = {
  name: "ServiceCards",
  label: "Service Cards",
  ui: {
    previewSrc: "/blocks/hero.png"
  },
  fields: [
    {
      type: "string",
      label: "Big Cards Label",
      name: serviceCards.bigCardsLabel
    },
    {
      label: "Big Cards",
      name: serviceCards.bigCards.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.title })
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: serviceCards.bigCards.title
        },
        {
          type: "rich-text",
          label: "Description",
          name: serviceCards.bigCards.description
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.bigCards.link
        },
        {
          type: "string",
          label: "Color",
          name: serviceCards.bigCards.color,
          options: [
            { label: "Red", value: "red" },
            { label: "Light Gray", value: "lightgray" },
            { label: "Medium Gray", value: "mediumgray" },
            { label: "Dark Gray", value: "darkgray" }
          ]
        },
        {
          type: "image",
          label: "Image",
          name: serviceCards.bigCards.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "/service-cards"
        }
      ]
    },
    {
      type: "string",
      label: "Small Cards Label",
      name: serviceCards.smallCardsLabel
    },
    {
      label: "Small Cards",
      name: serviceCards.smallCards.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.title })
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: serviceCards.smallCards.title
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.smallCards.link
        },
        {
          type: "string",
          label: "Color",
          name: serviceCards.smallCards.color,
          options: [
            { label: "Red", value: "red" },
            { label: "Light Gray", value: "lightgray" },
            { label: "Medium Gray", value: "mediumgray" },
            { label: "Dark Gray", value: "darkgray" }
          ]
        },
        {
          type: "image",
          label: "Image",
          name: serviceCards.smallCards.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "/service-cards"
        }
      ]
    },
    {
      label: "Links",
      name: serviceCards.links.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: serviceCards.links.label
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.links.link
        }
      ]
    },
    {
      type: "string",
      label: "Background Color",
      name: serviceCards.backgroundColor,
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" }
      ]
    }
  ]
};

// components/blocks/index.ts
init_tableLayout();
init_videoEmbed();
init_bookingButton();
init_utilityButton();
init_carousel();
init_tableLayout();
init_videoEmbed();
var pageBlocks = [
  aboutUsBlockSchema,
  agreementFormBlockSchema,
  bookingButtonSchema,
  builtOnAzureBlockSchema,
  carouselBlockSchema,
  citationBlockSchema,
  clientLogosBlockSchema,
  contentBlockSchema,
  contentCardBlockSchema,
  customImageBlockSchema,
  dynamicColumnsSchema,
  flagSchema,
  fixedColumnsSchema,
  fixedTabsLayoutSchema,
  googleMapsSchema,
  heroBlockSchema,
  internalCarouselBlockSchema,
  newslettersTableBlockSchema,
  recurringEventSchema,
  serviceCardsBlockSchema,
  subNewsletterRowSchema,
  tableBlockSchema,
  trainingInformationSchema,
  trainingLearningOutcomeSchema,
  tweetEmbedSchema,
  upcomingEventsBlockSchema,
  utilityButtonSchema,
  verticalImageLayoutBlockSchema,
  verticalListItemSchema,
  videoEmbedBlockSchema,
  eventBookingSchema,
  presenterBlockSchema,
  locationBlockSchema,
  agendaSchema
];

// components/util/seo.tsx
import { NextSeo } from "next-seo";

// next-seo.config.ts
init_global();
var NEXT_SEO_DEFAULT = {
  defaultTitle: global_default.header.title,
  titleTemplate: "%s",
  description: global_default.header.description,
  themeColor: "#cc4141",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: global_default.header.url,
    title: global_default.header.title,
    description: global_default.header.description,
    siteName: global_default.header.site_name,
    images: [
      {
        url: "/images/ssw-og.jpg",
        width: 1200,
        height: 630,
        alt: "SSW Consulting - Enterprise Software Development"
      }
    ]
  },
  twitter: {
    handle: global_default.socials.find((s) => s.type === "twitter")?.username,
    site: global_default.header.url,
    cardType: "summary_large_image"
  },
  additionalMetaTags: [
    {
      property: "keywords",
      content: ".NET, Web, Mobile, CRM, SharePoint, Azure, Power BI, Angular, React, Blazor, Office 365, Dynamics"
    }
  ]
};

// components/util/seo.tsx
var seoSchema = {
  type: "object",
  label: "SEO Values",
  name: "seo",
  fields: [
    {
      type: "string",
      label: "Title (70 characters)",
      name: "title",
      ui: {
        validate: (value) => {
          if (value && value.length > 70) {
            return "Title should be 70 characters or less";
          }
        }
      }
    },
    {
      type: "string",
      label: "Description (150 characters)",
      name: "description",
      component: "textarea",
      ui: {
        validate: (value) => {
          if (value && value.length > 150) {
            return "Description should be 150 characters or less";
          }
        }
      }
    },
    {
      type: "string",
      label: "Canonical URL",
      name: "canonical"
    },
    {
      label: "Images",
      name: "images",
      list: true,
      type: "object",
      ui: {
        itemProps: (item) => {
          return { label: item.url };
        },
        defaultItem: {
          url: "/images/ssw-og.jpg",
          width: 1200,
          height: 630,
          alt: "SSW Consulting - Enterprise Software Development"
        }
      },
      fields: [
        {
          type: "image",
          label: "Image Url",
          name: "url",
          require: true
        },
        {
          type: "number",
          label: "Width (px)",
          name: "width"
        },
        {
          type: "number",
          label: "Height (px)",
          name: "height"
        },
        {
          type: "string",
          label: "Image Alt Text",
          name: "alt"
        }
      ]
    }
  ]
};

// .tina/collections/consulting.tsx
var consultingIndexSchema = {
  label: "Consulting - Index",
  name: "consultingIndex",
  path: "content/consulting/index",
  format: "json",
  ui: {
    router: ({ document: document2 }) => {
      return "/consulting";
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Sidebar",
      name: "sidebar",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        }
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label"
        },
        {
          type: "reference",
          label: "Associated Tag",
          name: "tag",
          collections: ["consultingTag"]
        }
      ]
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.category?.split("/")[3].replace(".json", "") };
        }
      },
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["consultingCategory"]
        },
        {
          type: "object",
          label: "Pages",
          name: "pages",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            }
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title"
            },
            {
              type: "string",
              label: "Description",
              name: "description",
              ui: {
                component: "textarea"
              }
            },
            {
              type: "image",
              label: "Logo",
              name: "logo",
              // @ts-ignore
              uploadDir: () => "/thumbs"
            },
            {
              type: "reference",
              label: "Page",
              name: "page",
              collections: ["consulting"],
              required: true
            },
            {
              type: "string",
              label: "External URL",
              description: "Takes precedence over page if selected. If using this, you still have to select a (random) page.",
              name: "externalUrl"
            },
            {
              type: "object",
              label: "Tags",
              name: "tags",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.tag };
                }
              },
              fields: [
                {
                  type: "reference",
                  label: "Tag",
                  name: "tag",
                  collections: ["consultingTag"]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
var consultingCategorySchema = {
  label: "Consulting - Categories",
  name: "consultingCategory",
  path: "content/consulting/category",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name"
    }
  ]
};
var consultingTagSchema = {
  label: "Consulting - Tags",
  name: "consultingTag",
  path: "content/consulting/tag",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name"
    }
  ]
};
var consultingSchema = {
  label: "Consulting Pages",
  name: "consulting",
  format: "mdx",
  path: "content/consulting",
  ui: {
    router: ({ document: document2 }) => {
      return `/consulting/${document2._sys.filename}`;
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Booking",
      name: "booking",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "Subtitle",
          name: "subTitle"
        },
        {
          type: "string",
          label: "Button Text",
          name: "buttonText"
        },
        {
          type: "image",
          label: "Video Background",
          name: "videoBackground",
          // @ts-ignore
          uploadDir: () => "/videos"
        }
      ]
    },
    {
      type: "object",
      label: "Solution",
      name: "solution",
      fields: [
        {
          type: "string",
          label: "Project",
          name: "project"
        }
      ]
    },
    {
      type: "string",
      label: "Call to Action",
      description: 'Technology title inserted via {{TITLE}}. E.g. "Talk to us about your {{TITLE}} project"',
      name: "callToAction",
      required: false
    },
    {
      type: "object",
      label: "Testimonial Categories",
      name: "testimonialCategories",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Testimonial Category",
          name: "testimonialCategory",
          collections: ["testimonialCategories"]
        }
      ]
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...pageBlocks],
      isBody: true
    },
    {
      type: "object",
      list: true,
      name: "afterBody",
      label: "After body",
      ui: {
        visualSelector: true
      },
      templates: [...pageBlocks]
    },
    {
      type: "object",
      label: "Benefits",
      name: "benefits",
      fields: [
        {
          type: "object",
          list: true,
          label: "benefit list",
          name: "benefitList",
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            }
          },
          fields: [
            {
              type: "image",
              label: "Image URL",
              name: "image",
              // @ts-ignore
              uploadDir: () => "/benefits"
            },
            {
              type: "string",
              label: "Title",
              name: "title"
            },
            {
              type: "rich-text",
              label: "Description",
              name: "description"
            },
            {
              type: "string",
              required: false,
              label: "linkName",
              name: "linkName"
            },
            {
              type: "string",
              required: false,
              label: "linkURL",
              name: "linkURL"
            }
          ]
        },
        {
          type: "object",
          label: "Rule",
          name: "rule",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.name };
            }
          },
          fields: [
            {
              type: "string",
              label: "Name",
              name: "name"
            },
            {
              type: "string",
              label: "URL",
              name: "url"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Technologies",
      name: "technologies",
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header"
        },
        {
          type: "string",
          label: "Subheading",
          name: "subheading"
        },
        {
          type: "object",
          label: "Technology Cards",
          name: "technologyCards",
          ui: {
            itemProps: (item) => ({
              label: item?.technologyCard
            })
          },
          list: true,
          fields: [
            {
              type: "reference",
              label: "Technology Card",
              name: "technologyCard",
              collections: ["technologies"]
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Media cards",
      name: "medias",
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header"
        },
        {
          type: "object",
          label: "Media Cards",
          name: "mediaCards",
          list: true,
          fields: [
            {
              type: "string",
              label: "Type",
              name: "type",
              options: [
                {
                  value: "video",
                  label: "Video"
                },
                {
                  value: "blog",
                  label: "Blog"
                }
              ]
            },
            {
              type: "rich-text",
              label: "Content",
              name: "content"
            }
          ]
        }
      ]
    }
  ]
};

// .tina/collections/employment.tsx
var employmentSchema = {
  label: "Employment Pages",
  name: "employment",
  format: "mdx",
  path: "content/employment",
  ui: {
    router: ({ document: document2 }) => {
      return "/employment";
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Booking",
      name: "booking",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "Subtitle",
          name: "subTitle"
        },
        {
          type: "rich-text",
          label: "Booking body",
          name: "bookingBody",
          templates: [...pageBlocks]
        },
        {
          type: "image",
          label: "Video Background",
          name: "videoBackground",
          // @ts-ignore
          uploadDir: () => "/videos"
        }
      ]
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...pageBlocks],
      isBody: true
    },
    {
      type: "object",
      label: "Benefits",
      name: "benefits",
      fields: [
        {
          type: "object",
          list: true,
          label: "benefit list",
          name: "benefitList",
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            }
          },
          fields: [
            {
              type: "image",
              label: "Image URL",
              name: "image",
              // @ts-ignore
              uploadDir: () => "/benefits"
            },
            {
              type: "string",
              label: "Title",
              name: "title"
            },
            {
              type: "rich-text",
              label: "Description",
              name: "description"
            },
            {
              type: "string",
              required: false,
              label: "linkName",
              name: "linkName"
            },
            {
              type: "string",
              required: false,
              label: "linkURL",
              name: "linkURL"
            }
          ]
        }
      ]
    },
    {
      type: "rich-text",
      label: "After benefits body",
      name: "benefitsBody",
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "After body",
      name: "afterBody",
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Opportunities body",
      name: "opportunitiesBody",
      templates: [...pageBlocks]
    },
    {
      type: "object",
      label: "Opportunities",
      name: "opportunities",
      list: true,
      required: true,
      ui: {
        itemProps: (item) => {
          const path2 = item.opportunityRef;
          if (!path2)
            return { label: "Opportunity" };
          const pathComponents = path2.split("/");
          const fileName = pathComponents[pathComponents.length - 1];
          const positionName = fileName.split(".")[0];
          const spacesName = positionName.replace("-", " ");
          return { label: spacesName };
        }
      },
      fields: [
        {
          type: "reference",
          label: "Opportunity document",
          name: "opportunityRef",
          collections: ["opportunities"]
        }
      ]
    },
    {
      type: "rich-text",
      label: "Call to action body",
      name: "callToActionBody",
      templates: [...pageBlocks]
    }
  ]
};

// .tina/collections/global.tsx
var globalSchema = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name"
        },
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "Description",
          name: "description"
        },
        {
          type: "string",
          label: "URL",
          name: "url"
        },
        {
          type: "string",
          label: "Site Name",
          name: "site_name"
        },
        {
          type: "string",
          label: "Alternate Site Name",
          name: "alternate_site_name"
        }
      ]
    },
    {
      type: "string",
      label: "Youtube channel link",
      name: "youtubeChannelLink"
    },
    {
      type: "string",
      label: "Breadcrumb Suffix",
      name: "breadcrumbSuffix"
    },
    {
      type: "string",
      label: "Booking Button Text",
      name: "bookingButtonText"
    },
    {
      type: "string",
      label: "Booking Phone No.",
      name: "bookingPhone"
    },
    {
      type: "object",
      label: "Home Page Office Index",
      name: "homePageOfficeList",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.addressLocality };
        }
      },
      fields: [
        {
          type: "string",
          name: "url",
          label: "Url",
          required: true
        },
        {
          type: "string",
          name: "name",
          label: "Name",
          required: true
        },
        {
          type: "string",
          name: "streetAddress",
          label: "Street Address",
          required: true
        },
        {
          type: "string",
          name: "suburb",
          label: "Suburb"
        },
        {
          type: "string",
          name: "addressLocality",
          label: "Address Locality",
          required: true
        },
        {
          type: "string",
          name: "addressRegion",
          label: "Address Region",
          required: true
        },
        {
          type: "string",
          name: "addressCountry",
          label: "Address Country",
          required: true
        },
        {
          type: "number",
          name: "postalCode",
          label: "Post Code",
          required: true
        },
        {
          type: "string",
          name: "phone",
          label: "Phone",
          required: true
        },
        {
          type: "string",
          name: "hours",
          label: "Hours",
          required: true
        },
        {
          type: "string",
          name: "days",
          label: "Days",
          required: true
        }
      ]
    },
    {
      type: "object",
      label: "Socials",
      name: "socials",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.type };
        }
      },
      fields: [
        {
          type: "string",
          label: "Type",
          name: "type",
          options: [
            { label: "Phone", value: "phone" },
            { label: "Facebook", value: "facebook" },
            { label: "Twitter", value: "twitter" },
            { label: "Instagram", value: "instagram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Github", value: "github" },
            { label: "YouTube", value: "youtube" },
            { label: "TikTok", value: "tiktok" }
          ]
        },
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "URL",
          name: "url"
        },
        {
          type: "string",
          label: "Username",
          name: "username"
        },
        {
          type: "string",
          label: "Text",
          name: "linkText"
        }
      ]
    },
    {
      type: "object",
      label: "Clients",
      name: "clients",
      fields: [
        {
          type: "object",
          label: "Clients List",
          name: "clientsList",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.clientName };
            }
          },
          fields: [
            {
              type: "string",
              label: "Client Name",
              name: "clientName"
            },
            {
              type: "string",
              label: "Image URL",
              name: "imageUrl",
              description: "The path of the image from the project root (most of the time, '/images/...')"
            }
          ]
        }
      ]
    }
  ]
};

// .tina/collections/industry.tsx
import React12 from "react";
var industrySolutionsRowSchema = {
  name: "SolutionsRow",
  label: "Industry Solutions Row",
  fields: [
    {
      type: "image",
      label: "1st Card Image",
      name: "imgSrc1",
      // @ts-ignore
      uploadDir: () => "/industry"
    },
    {
      type: "string",
      label: "1st Header",
      name: "header1"
    },
    {
      type: "rich-text",
      label: "1st Body",
      name: "body1"
    },
    {
      type: "image",
      label: "2nd Card Image",
      name: "imgSrc2",
      // @ts-ignore
      uploadDir: () => "/industry"
    },
    {
      type: "string",
      label: "2nd Header",
      name: "header2"
    },
    {
      type: "rich-text",
      label: "2nd Body",
      name: "body2"
    },
    {
      type: "image",
      label: "3rd Card Image",
      name: "imgSrc3",
      // @ts-ignore
      uploadDir: () => "/industry"
    },
    {
      type: "string",
      label: "3rd Header",
      name: "header3"
    },
    {
      type: "rich-text",
      label: "3rd Body",
      name: "body3"
    }
  ]
};
var whitepaperBlockSchema = {
  name: "Whitepaper",
  label: "Whitepaper",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      required: true
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: true
    },
    {
      type: "image",
      label: "Whitepaper File",
      name: "whitepaperFile",
      required: true
    }
  ]
};
var bookingFormBlockSchema = {
  name: "BookingForm",
  label: "Consulting Enquiry Form",
  fields: [
    {
      type: "string",
      label: "Placeholder",
      name: "placeholder",
      ui: {
        component: () => React12.createElement("p", null, "This is a placeholder block for\xA0", React12.createElement("span", { className: "font-bold" }, "Consulting Enquiry Form"))
      }
    }
  ]
};
var contactUsBlockSchema = {
  name: "ContactUs",
  label: "Contact Us",
  fields: [
    {
      type: "string",
      label: "Button Text",
      name: "buttonText"
    },
    {
      type: "string",
      label: "Link",
      name: "link"
    }
  ]
};
var industrySchema = {
  label: "Industry Pages",
  name: "industry",
  format: "mdx",
  path: "content/industry",
  ui: {
    router: ({ document: document2 }) => {
      return `/industry/${document2._sys.filename}`;
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Page heading",
      name: "heading",
      required: true
    },
    {
      type: "string",
      label: "Page Subheading",
      name: "subHeading"
    },
    {
      type: "image",
      label: "Banner Image",
      name: "bannerImg",
      required: true,
      // @ts-ignore
      uploadDir: () => "/industry"
    },
    {
      type: "image",
      label: "Whitepaper File",
      name: "whitepaperFile",
      // @ts-ignore
      uploadDir: () => "/files"
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        ...pageBlocks,
        industrySolutionsRowSchema,
        whitepaperBlockSchema,
        bookingFormBlockSchema,
        contactUsBlockSchema
      ],
      isBody: true
    }
  ]
};

// components/marketing/Marketing.tsx
init_container();
init_section();
import { TinaMarkdown as TinaMarkdown15 } from "tinacms/dist/rich-text";
var sides = ["left", "right"];

// .tina/collections/marketing.tsx
var marketingSchema = {
  label: "Marketing",
  name: "marketing",
  path: "content/marketing",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true
    },
    {
      type: "image",
      label: "Background image",
      name: "backgroundImage",
      required: true,
      // @ts-ignore
      uploadDir: () => "/marketings"
    },
    {
      type: "rich-text",
      label: "Marketing media column",
      name: "mediaComponent",
      required: true,
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true
    },
    {
      type: "string",
      label: "Text side",
      name: "textSide",
      options: sides,
      required: true
    }
  ]
};

// .tina/collections/newsletters.tsx
var newsletterSchema = {
  label: "Newsletters",
  name: "newsletters",
  path: "content/newsletters",
  format: "json",
  fields: [
    {
      type: "string",
      label: "Year",
      name: "newsletters_year"
    },
    {
      type: "object",
      label: "Newsletters",
      name: "newsletters",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.month && item?.description ? `${item?.month} - ${transformIntToMonth(item?.month)} - ${item?.description}` : "New newsletter"
          };
        }
      },
      fields: [
        {
          type: "number",
          name: "month",
          label: "Month",
          required: true
        },
        {
          type: "image",
          name: "file",
          label: "HTML File",
          required: true,
          // @ts-ignore
          uploadDir: (formValues) => {
            return `newsletter-uploads/${formValues.newsletters_year}`;
          }
        },
        {
          type: "image",
          name: "images",
          label: "Images (optional)",
          list: true,
          description: "Must be saved in images/Newsletters. Only add images that have not been used before. There is no need to add images to the /images/newsletters directory if they have already been used in a previous newsletter",
          // @ts-ignore
          uploadDir: () => "/Newsletters"
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          required: true
        }
      ]
    }
  ]
};

// .tina/collections/offices.tsx
var officeIndexSchema = {
  label: "Office - Index",
  name: "officeIndex",
  path: "content/office/index",
  format: "json",
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Offices Index Page",
      name: "officesIndex",
      list: true,
      ui: {
        itemProps: (item) => {
          let label = "Office";
          if (!item || !item.office) {
            return { label };
          }
          const path2 = item.office;
          const pathComponents = path2.split("/");
          const fileName = pathComponents[pathComponents.length - 1];
          const cityName = fileName.split(".")[0];
          const cityNameCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
          return {
            label: cityNameCapitalized
          };
        }
      },
      fields: [
        {
          type: "reference",
          label: "Office",
          name: "office",
          collections: ["offices"],
          required: true
        }
      ]
    }
  ]
};
var officeSchema = {
  label: "Office Pages",
  name: "offices",
  format: "mdx",
  path: "content/offices",
  ui: {
    router: ({ document: document2 }) => {
      return `/offices/${document2._sys.filename}`;
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "image",
      label: "Cover Image",
      name: "coverImg",
      // @ts-ignore
      uploadDir: (args) => `/offices/${args.addressLocality}`
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // @ts-ignore
      uploadDir: () => "/offices/thumbnails"
    },
    {
      type: "image",
      label: "Sidebar Image",
      name: "sideImg",
      // @ts-ignore
      uploadDir: (args) => {
        console.log(args);
        return `/offices/${args.addressLocality}`;
      }
    },
    {
      type: "string",
      name: "url",
      label: "Url"
    },
    {
      type: "string",
      name: "name",
      label: "Name",
      required: true
    },
    {
      type: "string",
      name: "streetAddress",
      label: "Street Address",
      required: true
    },
    {
      type: "string",
      name: "suburb",
      label: "Suburb",
      required: true
    },
    {
      type: "string",
      name: "addressLocality",
      label: "Address Locality",
      required: true
    },
    {
      type: "string",
      name: "addressRegion",
      label: "Address Region",
      required: true
    },
    {
      type: "string",
      name: "addressCountry",
      label: "Address Country",
      options: sswCountries.map((country) => country.label),
      required: true
    },
    {
      type: "number",
      name: "postalCode",
      label: "Post Code",
      required: true
    },
    {
      type: "string",
      name: "phone",
      label: "Phone",
      required: true
    },
    {
      type: "string",
      name: "hours",
      label: "Hours"
    },
    {
      type: "string",
      name: "days",
      label: "Days"
    },
    {
      type: "object",
      name: "sidebarSecondaryPlace",
      label: "Sidebar secondary place URL",
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name"
        },
        {
          type: "string",
          name: "url",
          label: "URL"
        }
      ]
    },
    {
      type: "rich-text",
      label: "About Us",
      name: "aboutUs",
      templates: [...pageBlocks]
    },
    {
      type: "image",
      label: "Map Image",
      name: "map",
      // @ts-ignore
      uploadDir: (args) => `/offices/${args.addressLocality}`,
      templates: [...pageBlocks]
    },
    {
      type: "string",
      label: "Directions URL",
      name: "directionsUrl"
    },
    {
      type: "rich-text",
      label: "Directions",
      name: "directions",
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Parking",
      name: "parking",
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Public Transport",
      name: "publicTransport",
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Team",
      name: "team",
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Photos",
      name: "photos",
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...pageBlocks],
      isBody: true
    }
  ]
};

// components/util/constants/opportunity.tsx
var locations = [
  "Sydney",
  "Brisbane",
  "Melbourne",
  "Newcastle",
  "China"
];
var employmentType = ["Contract", "Permanent", "Work Experience"];
var jobStatus = ["Available", "Filled"];

// .tina/collections/opportunities.tsx
var opportunitiesSchema = {
  label: "Opportunities",
  name: "opportunities",
  format: "mdx",
  path: "content/opportunities",
  fields: [
    {
      type: "string",
      label: "Job Title",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      label: "Type",
      name: "employmentType",
      options: employmentType.map((type) => type)
    },
    {
      type: "string",
      label: "Status",
      name: "status",
      options: jobStatus.map((status) => status)
    },
    {
      type: "string",
      list: true,
      label: "Locations",
      name: "locations",
      options: locations.map((location) => location)
    },
    {
      type: "boolean",
      label: "Hide Apply Button",
      name: "hideApply"
    },
    {
      type: "rich-text",
      label: "Description",
      name: "_body",
      isBody: true,
      templates: [...pageBlocks]
    }
  ]
};

// .tina/collections/pages.tsx
var pagesSchema = {
  label: "Pages",
  name: "page",
  format: "mdx",
  path: "content/pages",
  ui: {
    router: ({ document: document2 }) => {
      if (document2._sys.filename === "home") {
        return `/`;
      }
      return `/${document2._sys.filename}`;
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "boolean",
      name: "breadcrumbs",
      label: "Breadcrumbs enabled"
    },
    {
      type: "object",
      list: true,
      name: "beforeBody",
      label: "Before body",
      ui: {
        visualSelector: true
      },
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...pageBlocks],
      isBody: true
    },
    {
      type: "object",
      list: true,
      name: "sideBar",
      label: "Side Bar",
      ui: {
        visualSelector: true
      },
      templates: [...pageBlocks]
    },
    {
      type: "object",
      list: true,
      name: "afterBody",
      label: "After body",
      ui: {
        visualSelector: true
      },
      templates: [...pageBlocks]
    }
  ]
};

// .tina/collections/presets.tsx
var presetsSchema = {
  label: "Presets (\u26A0\uFE0FDEV ONLY)",
  name: "presets",
  path: "content/presets/index",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name"
    },
    {
      type: "string",
      label: "ClassName",
      name: "className"
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.category };
        }
      },
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["presetsCategory"]
        }
      ]
    }
  ]
};
var presetsCategorySchema = {
  label: "Presets - Categories",
  name: "presetsCategory",
  path: "content/presets/category",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name"
    }
  ]
};

// .tina/collections/products.tsx
var productsIndexSchema = {
  label: "Products - Index",
  name: "productsIndex",
  path: "content/products/index",
  format: "json",
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Products List",
      name: "productsList",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        }
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          isTitle: true,
          required: true
        },
        {
          type: "string",
          label: "URL",
          name: "url"
        },
        {
          type: "string",
          label: "Description",
          name: "description"
        },
        {
          type: "image",
          label: "Logo",
          name: "logo",
          // @ts-ignore
          uploadDir: () => "/products"
        }
      ]
    }
  ]
};
var productsSchema = {
  label: "Products",
  name: "products",
  path: "content/products",
  format: "mdx",
  ui: {
    router: ({ document: document2 }) => {
      return `/products/${document2._sys.filename}`;
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...pageBlocks],
      isBody: true
    }
  ]
};

// .tina/collections/technologies.tsx
var technologiesSchema = {
  label: "Technology Cards",
  name: "technologies",
  format: "mdx",
  path: "content/technologies",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      label: "Read More Slug",
      name: "readMoreSlug"
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // @ts-ignore
      uploadDir: () => "/thumbs"
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true
    }
  ]
};

// .tina/collections/testimonialCategories.tsx
var testimonialCategoriesSchema = {
  label: "Testimonial Categories",
  name: "testimonialCategories",
  format: "mdx",
  path: "content/testimonialCategories",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true,
      isTitle: true
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    }
  ]
};

// components/util/consulting/rating.tsx
import classNames21 from "classnames";
import { AiFillStar } from "react-icons/ai";
import { wrapFieldsWithMeta } from "tinacms";
var ratingSchema = {
  type: "number",
  label: "Rating",
  name: "rating",
  description: "Rating from 0 to 5. Rating of -1 means no rating.",
  // As per https://tina.io/docs/extending-tina/custom-field-components/#custom-component-example
  ui: {
    parse: (val) => Number(val),
    // wrapping our component in wrapFieldsWithMeta renders our label & description.
    component: wrapFieldsWithMeta(({ input }) => {
      return React.createElement("div", null, React.createElement(
        "input",
        {
          name: "rating",
          id: "rating",
          type: "range",
          min: "-1",
          max: "5",
          step: "1",
          ...input
        }
      ), React.createElement("br", null), "Value: ", input.value);
    })
  }
};

// .tina/collections/testimonials.tsx
var testimonialSchema = {
  label: "Testimonials",
  name: "testimonials",
  format: "mdx",
  path: "content/testimonials",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
      required: true,
      // @ts-ignore
      uploadDir: () => "/testimonialAvatars"
    },
    {
      type: "string",
      label: "Company",
      name: "company",
      required: false
    },
    {
      ...ratingSchema,
      required: true
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["testimonialCategories"]
        }
      ]
    }
  ]
};

// components/training/trainingHeader.tsx
init_container();
init_section();
import classNames22 from "classnames";
import Image14 from "next/image";
import { Carousel as Carousel3 } from "react-responsive-carousel";
var trainingHeaderSchema = {
  type: "object",
  label: "Training Header Carousel",
  name: "trainingHeaderCarousel",
  fields: [
    {
      type: "object",
      label: "Training Header Carousel Item",
      name: "trainingHeaderCarouselItem",
      list: true,
      fields: [
        {
          type: "string",
          label: "Tagline",
          name: "tagline",
          required: true
        },
        {
          type: "string",
          label: "Secondary Tagline",
          name: "secondaryTagline"
        },
        {
          type: "image",
          label: "Hero Background",
          name: "heroBackground",
          required: true,
          uploadDir: () => "/background"
        },
        {
          type: "image",
          label: "Person",
          name: "person",
          uploadDir: () => "/people"
        },
        {
          type: "object",
          label: "Link",
          name: "link",
          fields: [
            {
              type: "string",
              label: "Link Text",
              name: "linkText",
              required: true
            },
            {
              type: "string",
              label: "URL",
              name: "url",
              required: true
            },
            {
              type: "image",
              label: "Icon",
              name: "icon"
            }
          ]
        }
      ]
    }
  ]
};

// components/util/videoCards.tsx
init_button();
init_videoModal();
init_container();
init_section();
import Image15 from "next/image";
import { FaPlayCircle as FaPlayCircle2 } from "react-icons/fa";
var videoCardSchema = {
  type: "object",
  label: "Videos",
  name: "videos",
  fields: [
    {
      type: "string",
      label: "Channel Link",
      name: "channelLink"
    },
    {
      type: "object",
      label: "Video Cards",
      name: "videoCards",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "Link",
          name: "link"
        }
      ]
    }
  ]
};

// .tina/collections/training.tsx
var trainingSchema = {
  label: "Training Pages",
  name: "training",
  format: "mdx",
  path: "content/training",
  ui: {
    router: ({ document: document2 }) => {
      return `/training/${document2._sys.filename}`;
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    // @ts-ignore
    trainingHeaderSchema,
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "boolean",
      name: "showTestimonials",
      label: "Show Testimonials"
    },
    {
      type: "object",
      list: true,
      name: "_body",
      label: "Body",
      ui: {
        visualSelector: true
      },
      templates: [...pageBlocks]
    },
    {
      type: "rich-text",
      name: "footer",
      label: "Footer",
      templates: [...pageBlocks]
    },
    // @ts-ignore
    videoCardSchema
  ]
};

// .tina/collections/videoProduction.tsx
var videoProductionSchema = {
  label: "Consulting - Video Production Pages",
  name: "videoProduction",
  format: "mdx",
  path: "content/video-production",
  ui: {
    router: ({ document: document2 }) => {
      return `/consulting/video-production/${document2._sys.filename}`;
    }
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Booking",
      name: "booking",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "Subtitle",
          name: "subTitle"
        },
        {
          type: "string",
          label: "Button Text",
          name: "buttonText"
        },
        {
          type: "image",
          label: "Video Background",
          name: "videoBackground",
          // @ts-ignore
          uploadDir: () => "/videos"
        }
      ]
    },
    {
      type: "object",
      label: "Solution",
      name: "solution",
      fields: [
        {
          type: "string",
          label: "Project",
          name: "project"
        }
      ]
    },
    {
      type: "string",
      label: "Call to Action",
      description: 'Technology title inserted via {{TITLE}}. E.g. "Talk to us about your {{TITLE}} project"',
      name: "callToAction",
      required: false
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...pageBlocks],
      isBody: true
    },
    {
      type: "object",
      list: true,
      name: "afterBody",
      label: "After body",
      ui: {
        visualSelector: true
      },
      templates: [...pageBlocks]
    }
  ]
};

// .tina/config.tsx
var config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
  process.env.HEAD,
  // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "images"
    }
  },
  build: {
    publicFolder: "public",
    // The public asset folder for your framework
    outputFolder: "admin"
    // within the public folder
  },
  cmsCallback: (cms) => {
    cms.flags.set("branch-switcher", true);
    return cms;
  },
  schema: {
    collections: [
      marketingSchema,
      globalSchema,
      pagesSchema,
      consultingIndexSchema,
      consultingCategorySchema,
      consultingTagSchema,
      consultingSchema,
      videoProductionSchema,
      testimonialSchema,
      testimonialCategoriesSchema,
      technologiesSchema,
      officeSchema,
      opportunitiesSchema,
      employmentSchema,
      officeIndexSchema,
      productsIndexSchema,
      productsSchema,
      trainingSchema,
      newsletterSchema,
      presenterSchema,
      locationSchema,
      industrySchema,
      presetsSchema,
      presetsCategorySchema
    ]
  }
});
var config_default = config;
export {
  config_default as default
};
