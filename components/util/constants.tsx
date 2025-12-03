// TODO: Split up into separate files in /components/util/constants directory

//Page Types for BreadCrumbs data
export const BASE_URL = "/";

export enum LOCAL_STORAGE_KEYS {
  LANDING_PAGE = "LANDING_PAGE",
}

export const PROD_BASE_URL = "https://www.ssw.com.au";

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

//FORMS
//ContactForm title
export const CONTACT_FORM_TITLE = "Get your project started!";

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
  REFERRAL_SOURCE: "Please select referral source.",
};
export const VALIDATION_SUCCESS_MESSAGE = "Looks good!";

//STATE DEFAULT VALUE
export const STATE_DEFAULT_VALUE = "100000008";

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
  ReferralSource: "Referral Source",
};

//FORMS INPUTS
export const FORM_INPUT = {
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
  ReferralSource: "referralSource",
};

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

export const months = [
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
  "December",
];

export const ReferralSource = {
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
  Other: 14,
};

export const ReferralSourceList = Object.keys(ReferralSource).map((key) => {
  return {
    label: key,
    value: ReferralSource[key as keyof typeof ReferralSource],
  };
});

export const sswColors = {
  "#CC4141": "bg-sswRed",
  "#333333": "bg-sswBlack",
  "#AAAAAA": "bg-ssw-gray-light",
  "#797979": "bg-ssw-gray",
};

export const customClasses = {
  none: "",
  "Only mobile top margin (mt-6)": "mt-6 md:mt-0",
  "Top margin (mt-6)": "mt-6",
  "Vertical margin (my-0)": "my-0",
};
