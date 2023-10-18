import type { Collection } from "tinacms";

export const paymentDetailsBlockConstant = {
  value: "paymentDetails",
  bankName: "bankName",
  accountName: "accountName",
  bsbNumber: "bsbNumber",
  accountNumber: "accountNumber",
  swiftNumber: "swiftNumber",
  abn: "abn",
  acn: "acn",
};

export const paymentDetailsSchema: Collection = {
  label: "Company - Payment Details",
  name: paymentDetailsBlockConstant.value,
  format: "mdx",
  path: "content/payments",
  fields: [
    {
      type: "string",
      label: "Bank Name",
      name: paymentDetailsBlockConstant.bankName,
    },
    {
      type: "string",
      label: "Account Name",
      name: paymentDetailsBlockConstant.accountName,
    },
    {
      type: "string",
      label: "BSB Number",
      name: paymentDetailsBlockConstant.bsbNumber,
    },
    {
      type: "string",
      label: "Account Number",
      name: paymentDetailsBlockConstant.accountNumber,
    },
    {
      type: "string",
      label: "SWIFT Number",
      name: paymentDetailsBlockConstant.swiftNumber,
    },
    {
      type: "string",
      label: "ABN",
      name: paymentDetailsBlockConstant.abn,
    },
    {
      type: "string",
      label: "ACN",
      name: paymentDetailsBlockConstant.acn,
    },
  ],
};
