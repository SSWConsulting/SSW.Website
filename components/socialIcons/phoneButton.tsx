import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { CustomLink } from "../customLink";

type PhoneButtonProps = {
  className?: string;
  desktop: {
    text: string;
    url: string;
  };
  mobile: {
    text: string;
    url: string;
  };
};

export const PhoneButton = ({
  className,
  mobile,
  desktop,
}: PhoneButtonProps) => {
  const url =
    (isMobile ? mobile.url : desktop.url) ||
    "https://ssw.com.au/company/contact-us";
  const text = (isMobile ? mobile.text : desktop.text) || "CONTACT US";

  return (
    <div
      className={classNames(
        className,
        "flex flex-grow flex-wrap gap-2 sm:flex-grow-0"
      )}
    >
      <CustomLink
        href={url}
        className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center rounded-lg bg-ssw-red px-5 text-xl hover:opacity-70 max-sm:my-5 sm:w-fit"
      >
        <FaPhoneAlt color="white" className="text-2xl" />
        <span className="ml-2 inline text-sm font-bold text-white">{text}</span>
      </CustomLink>
    </div>
  );
};
