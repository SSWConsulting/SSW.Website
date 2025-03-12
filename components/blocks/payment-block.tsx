import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { paymentDetailsBlockConstant } from "../../tina/collections/payment-details"; // TODO: Use alias - https://github.com/tinacms/tinacms/issues/4488

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
  if (!data) return <></>;
  const { title, subTitle, creditImgSrc, altText } = data;
  const payments: PaymentBlockProps = data.payments;
  const headerClass =
    "col-span-1 bg-gray-300 px-4 py-0.5 font-bold flex items-center";
  const bodyClass = "col-span-2 bg-gray-100 px-4 py-0.5 flex items-center";

  return (
    <div className="prose mx-auto mb-2 w-full max-w-9xl p-8 text-center">
      <h2 data-tina-field={tinaField(data, paymentBlockConstants.title)}>
        {title}
      </h2>
      <p data-tina-field={tinaField(data, paymentBlockConstants.subTitle)}>
        {subTitle}
      </p>
      {!data?.hidePayments && data?.payments && (
        <div className="mx-auto my-4 grid max-w-4xl grid-cols-3 gap-0.5 py-4 text-left">
          <div className={headerClass}>{PaymentBlockConstants.BANK_NAME}</div>
          <div
            className={bodyClass}
            data-tina-field={tinaField(
              data.payments,
              paymentDetailsBlockConstant.bankName
            )}
          >
            {payments.bankName}
          </div>
          <div className={headerClass}>
            {PaymentBlockConstants.ACCOUNT_NAME}
          </div>
          <div
            className={bodyClass}
            data-tina-field={tinaField(
              data.payments,
              paymentDetailsBlockConstant.accountName
            )}
          >
            {payments.accountName}
          </div>
          <div className={headerClass}>{PaymentBlockConstants.BSB_NUMBER}</div>
          <div
            className={bodyClass}
            data-tina-field={tinaField(
              data.payments,
              paymentDetailsBlockConstant.bsbNumber
            )}
          >
            {payments.bsbNumber}
          </div>
          <div className={headerClass}>
            {PaymentBlockConstants.ACCOUNT_NUMBER}
          </div>
          <div
            className={bodyClass}
            data-tina-field={tinaField(
              data.payments,
              paymentDetailsBlockConstant.accountNumber
            )}
          >
            {payments.accountNumber}
          </div>
          <div className={headerClass}>
            {PaymentBlockConstants.SWIFT_NUMBER}
          </div>
          <div
            className={bodyClass}
            data-tina-field={tinaField(
              data.payments,
              paymentDetailsBlockConstant.swiftNumber
            )}
          >
            {payments.swiftNumber}
          </div>
          <div className={headerClass}>{PaymentBlockConstants.ABN}</div>
          <div
            className={bodyClass}
            data-tina-field={tinaField(
              data.payments,
              paymentDetailsBlockConstant.abn
            )}
          >
            {payments.abn}
          </div>
          <div className={headerClass}>{PaymentBlockConstants.ACN}</div>
          <div
            className={bodyClass}
            data-tina-field={tinaField(
              data.payments,
              paymentDetailsBlockConstant.acn
            )}
          >
            {payments.acn}
          </div>
        </div>
      )}
      <div
        className="mx-auto max-w-4xl"
        data-tina-field={tinaField(data, paymentBlockConstants.footer)}
      >
        <TinaMarkdown content={data.footer} />
      </div>
      {creditImgSrc && (
        <span
          data-tina-field={tinaField(data, paymentBlockConstants.creditImgSrc)}
        >
          <Image
            src={creditImgSrc}
            alt={altText}
            height={150}
            className={"mx-auto my-3"}
            width={150}
          />
        </span>
      )}
    </div>
  );
};

export const paymentBlockConstants = {
  value: "paymentBlock",
  title: "title",
  subTitle: "subTitle",
  payments: "payments",
  hidePayments: "hidePayments",
  footer: "footer",
  creditImgSrc: "creditImgSrc",
  altTxt: "altTxt",
};

export const paymentBlockSchema: Template = {
  label: "Payment Block",
  name: paymentBlockConstants.value,
  ui: {
    previewSrc: "/images/thumbs/tina/payment-block.jpg",
  },
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
      type: "boolean",
      label: "Hide Payment Details",
      name: paymentBlockConstants.hidePayments,
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
