import Script from "next/script";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import type { Template } from "tinacms";
import layoutData from "../../content/global/index.json";
import { recaptchaToastId, useRecaptcha } from "../../context/RecaptchaContext";
import { UtilityButton } from "../button/utilityButton";

export interface BookingButtonProps {
  buttonText?: string;
  containerClass?: string;
  buttonClass?: string;
  hideCallUs?: boolean;
}

export const BookingButton = ({ data }) => {
  const {
    containerClass,
    buttonClass,
    buttonText,
    hideCallUs,
  }: BookingButtonProps = data;

  const { error: recaptchaError } = useRecaptcha();

  if (recaptchaError) {
    toast.error("Failed to load recaptcha key.", { toastId: recaptchaToastId });
  }

  const JotFormIframe = `
      var existingURL = window.location.href;
      if(!window.scriptExecuted || window.href != existingURL){
        window.scriptExecuted = true;
        window.href = window.location.href;
        var _sf = new JotformFeedback({
          formId: '233468468973070',
          base: 'https://form.jotform.com/',
          windowTitle: 'Book an initial meeting now',
          backgroundColor: '#BD4B47',
          fontColor: '#FFFFFF',
          type: '0',
          height: 800,
          width: 700,
          openOnLoad: false
        });

        window.handleIFrameMessage = function(e) {
          if (window.addEventListener) {
              window.addEventListener("message", handleIFrameMessage, false);
          } else if (window.attachEvent) {
              window.attachEvent("onmessage", handleIFrameMessage);
          }
        }
    }`;

  const JOTFORM_ID = "233468468973070"; // TODO: Process.env.JOTID

  const bookingPhone = layoutData.bookingPhone;
  const jotFormClass = buttonClass ?? "mt-14" + " " + `lightbox-${JOTFORM_ID}`;

  return (
    <>
      {" "}
      <Script id="" type="text/javascript" defer>
        {JotFormIframe}
      </Script>
      <div
        className={twMerge("flex w-full flex-col items-center", containerClass)}
      >
        <UtilityButton className={jotFormClass} buttonText={buttonText} />
        {!hideCallUs && (
          <h2 className="mx-auto max-w-full text-center">
            or call us on {bookingPhone}
          </h2>
        )}
      </div>
    </>
  );
};

export const bookingButtonSchema: Template = {
  name: "BookingButton",
  label: "Booking Button",
  ui: {
    previewSrc: "/blocks/hero.png",
    itemProps: (item) => ({ label: item?.btnText }),
  },
  fields: [
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: false,
    },
  ],
};
