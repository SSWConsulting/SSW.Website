import { PROD_BASE_URL } from "@/components/util/constants";
import { Metadata } from "next";
import ThankyouPage from ".";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Thank you for working with SSW",
  alternates: {
    canonical: `${PROD_BASE_URL}/thankyou`,
  },
};

export default async function Thankyou() {
  return <ThankyouPage />;
}
