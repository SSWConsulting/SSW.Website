export const PAGE_TYPE = {
  Home: "Home",
  Consulting: "consulting",
  Thankyou: "Thank you for contacting SSW!",
};

//Page Types for BreadCrumbs data
export const BASE_URL = "/";

//Page Titles for layout component
export const PAGE_TITLE = {
  Consulting:
    "SSW Consulting - .NET, Web, Mobile, CRM, SharePoint, Azure, Power BI, Angular, React, Office 365 and Dynamics",

  Thankyou: "Thank you for consulting SSW!",
};

//Images Import
export const IMAGES_LINKS = {
  Azure: require("../assets/images/bg.jpg"),
};

//Base Image URL
export const BASE_IMAGE_URL = `${process.env.CONTENT_REPO}/raw/${process.env.CONTENT_BRANCH}/assets/images/thumbs/thumb-`;

//Color Schema
export const WHITE_SMOKE = "#f5f5f5";
export const WHITE = "#ffff";

//FORMS
//ContactForm title
export const CONTACT_FORM_TITLE = "Get your project started!";

//ShareForm title
export const SHARE_FORM_TITLE = "Connect someone with SSW";
//FORMS INPUTS
export const FORM_INPUT = {
  FullName: "fullName",
  Email: "Email",
  Phone: "Phone",
  Location: "Location",
  States: "States",
  Note: "Note",
  Company: "Company",
  ClassShow: "show",
  ReferredCompany: "referredCompany",
  ReferredFullName: "referredFullName",
  ReferredEmail: "referredEmail",
  None: "",
};
//FORMS ACTIVE_INPUTS
export const ACTIVE_INPUT = {
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
};

//Validation  Messages
export const VALIDATION_ERROR_MESSAGE = {
  FULL_NAME: "Please enter your first name and last name.",
  EMAIL: "Doesn’t look like a valid email.",
  PHONE: "Please enter your phone number.",
  LOCATION: "Select your country.",
  STATES: "Select your state.",
  NOTE: "A message is required.",
  REFERRED_FULL_NAME: "Please enter referred name",
  REFERRED_EMAIL: "Please enter referred email",
};
export const VALIDATION_SUCCESS_MESSAGE = "Looks good!";

//STATE DEFAULT VALUE
export const STATE_DEFAULT_VALUE = "100000008";

export const AUSTRALIA = "Australia";
//SSW Form Countries List
export const FormCountriesList = [
  {
    label: "Australia",
    value: "Australia",
  },
  {
    label: "China",
    value: "China",
  },
  {
    label: "Europe",
    value: "Europe",
  },
  {
    label: "South America",
    value: "South America",
  },
  {
    label: "USA",
    value: "USA",
  },

  {
    label: "Other",
    value: "Other",
  },
];

//Australian all States list
export const AustralianStatesList = [
  {
    label: "Australian Capital Territory",
    value: "100000003",
  },
  {
    label: "New South Wales",
    value: "100000000",
  },
  {
    label: "Northern Territory",
    value: "100000006",
  },
  {
    label: "Queensland",
    value: "100000002",
  },
  {
    label: "South Australia",
    value: "100000004",
  },
  {
    label: "Tasmania",
    value: "100000007",
  },
  {
    label: "Victoria",
    value: "100000001",
  },
  {
    label: "Western Australia",
    value: "100000005",
  },
];
