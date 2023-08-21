import Image from "next/image";
import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export type PaymentBlockProps = {
  bankName: string;
  accountName: string;
  bsbNumber: string;
  accountNumber: string;
  swiftNumber: string;
  abn: string;
  acn: string;
};

export const PaymentBlockConstants = {
  BANK_NAME: "Bank Name",
  ACCOUNT_NAME: "Account Name",
  BSB_NUMBER: "BSB Number",
  ACCOUNT_NUMBER: "Account Number",
  SWIFT_NUMBER: "SWIFT Number",
  ABN: "ABN",
  ACN: "ACN",
};

export const PaymentBlock = ({ data }) => {
  if (!data.payments) return <></>;

  const { title, subTitle, creditImgSrc, altText } = data;
  const payments: PaymentBlockProps = data.payments;
  const headerClass = "col-span-1 bg-gray-300 px-4 py-0.5 font-bold";
  const bodyClass = "col-span-2 bg-gray-100 px-4 py-0.5";

  return (
    <div className="prose mx-auto mb-2 w-full max-w-9xl p-8 text-center">
      <h2>{title}</h2>
      <p>{subTitle}</p>
      <div className="mx-auto my-4 grid max-w-4xl grid-cols-3 gap-0.5 py-4 text-left">
        <div className={headerClass}>{PaymentBlockConstants.BANK_NAME}</div>
        <div className={bodyClass}>{payments.bankName}</div>
        <div className={headerClass}>{PaymentBlockConstants.ACCOUNT_NAME}</div>
        <div className={bodyClass}>{payments.accountName}</div>
        <div className={headerClass}>{PaymentBlockConstants.BSB_NUMBER}</div>
        <div className={bodyClass}>{payments.bsbNumber}</div>
        <div className={headerClass}>
          {PaymentBlockConstants.ACCOUNT_NUMBER}
        </div>
        <div className={bodyClass}>{payments.accountNumber}</div>
        <div className={headerClass}>{PaymentBlockConstants.SWIFT_NUMBER}</div>
        <div className={bodyClass}>{payments.swiftNumber}</div>
        <div className={headerClass}>{PaymentBlockConstants.ABN}</div>
        <div className={bodyClass}>{payments.abn}</div>
        <div className={headerClass}>{PaymentBlockConstants.ACN}</div>
        <div className={bodyClass}>{payments.acn}</div>
      </div>
      <p className="mx-auto max-w-4xl">
        <TinaMarkdown content={data.footer} />
      </p>
      {creditImgSrc && (
        <Image
          src={creditImgSrc}
          alt={altText}
          height={150}
          className={"mx-auto my-3"}
          width={150}
        />
      )}
    </div>
  );
};

export const paymentBlockConstants = {
  value: "paymentBlock",
  title: "title",
  subTitle: "subTitle",
  payments: "payments",
  footer: "footer",
  creditImgSrc: "creditImgSrc",
  altTxt: "altTxt",
};

export const paymentBlockSchema: Template = {
  label: "Payment Block",
  name: paymentBlockConstants.value,
  fields: [
    {
      type: "string",
      label: "Title",
      name: paymentBlockConstants.title,
    },
    {
      type: "string",
      label: "Sub Title",
      name: paymentBlockConstants.subTitle,
    },
    {
      type: "reference",
      label: "Payment Links",
      name: paymentBlockConstants.payments,
      collections: ["paymentDetails"],
    },
    {
      type: "rich-text",
      label: "Footer",
      name: paymentBlockConstants.footer,
    },
    {
      type: "image",
      label: "Credit Cards Image",
      name: paymentBlockConstants.creditImgSrc,
    },
    {
      type: "string",
      label: "Alt Text",
      name: paymentBlockConstants.altTxt,
    },
  ],
};
