import { Metadata } from "next";
import ThankyouPage from ".";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Thank you for consulting with SSW",
};

export default async function Thankyou() {
  return <ThankyouPage />;
}
