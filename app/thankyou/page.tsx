import { Metadata } from "next";
import ThankyouPage from ".";

export const revalidate = 3600; // 1 hour

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Thank you for working with SSW",
};

export default async function Thankyou() {
  return <ThankyouPage />;
}
