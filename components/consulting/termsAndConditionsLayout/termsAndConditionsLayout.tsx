import { FC } from "react";
// import { useTina } from "tinacms/dist/react";
// import { client } from "../../../.tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { termsAndConditionsProps } from "./termsAndConditionsProps";
import { Section } from "../../util/section";

const TermsAndConditionsLayout: FC<{ data: termsAndConditionsProps }> = ({ data }) => {
  console.log(data);
  const { _body, seo, rates, terms } = data;

  return (
    <>
      <Section className="mx-auto w-full max-w-9xl px-8 font-sans text-3xl">
        {seo?.title}
      </Section>
      <Section className="mx-auto w-full max-w-9xl py-5 px-8 text-xs">
        <TinaMarkdown
          content={_body}
        />
      </Section>
      <Section className="mx-auto w-full max-w-9xl flex-col px-8">
        <div className="pt-3 font-sans text-xl">
          {rates.title}
        </div>
        <table className="my-4 border-1 border-gray-300 text-xs leading-normal">
          <thead>
            <tr className="border-b-2 border-sswRed bg-gray-75">
              <th scope="col" className="p-2 text-left">Resource</th>
              <th scope="col" className="p-2">Standard Hourly Rate</th>
              <th scope="col" className="p-2">Standard Daily Rate</th>
              <th scope="col" className="p-2">Prepaid Hourly Rate</th>
              <th scope="col" className="p-2">Prepaid Daily Rate</th>
            </tr>
          </thead>
          <tbody>
            {rates.rateList.map(item => {
              return (
                <tr
                  className="border-b-1 border-gray-300 even:bg-gray-75"
                >
                  <th scope="row" data-label="Resource" className="p-2 text-left">{item.resource}</th>
                  <td data-label="Standard Hourly Rate" className="p-2 text-center">
                    {item.standardHourlyRate.AUD} + {item.standardHourlyRate.GST}
                  </td>
                  <td data-label="Standard Daily Rate" className="p-2 text-center">
                    {item.standardDailyRate.AUD} + {item.standardDailyRate.GST}
                  </td>
                  <td data-label="Prepaid Hourly Rate" className="p-2 text-center">
                    {item.prepaidHourlyRate.AUD} + {item.prepaidHourlyRate.GST}
                  </td>
                  <td data-label="Prepaid Daily Rate" className="p-2 text-center">
                    <strong>{item.prepaidDailyRate.AUD}</strong> + {item.prepaidDailyRate.GST}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="mb-2.5 w-fit cursor-pointer border-b-1 border-dotted border-gray-450 text-gray-900"
          onClick={() => window.open(rates.link.address, `${rates.link.text}`)}>
          {rates.link.text}
        </div>
      </Section>
      <Section className="mx-auto w-full max-w-9xl flex-col px-8">
        <div className="mx-auto mt-5 mb-2.5 w-full max-w-9xl font-sans text-2xl text-sswRed">
          {terms.title}
        </div>
        <div className="mx-auto mb-2.5 w-full max-w-9xl text-xs text-gray-900">
          {terms.introduction}
        </div>
      </Section>
      <Section className="mx-auto w-full max-w-9xl py-5 px-8 text-xs">
        <div className="columns-2">
          <TinaMarkdown
            content={terms.content}
          />
        </div>
      </Section>
    </>
  );
};

export default TermsAndConditionsLayout;
