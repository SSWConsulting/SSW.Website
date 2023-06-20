import classNames from "classnames";
import Button from "./button";
import { Template } from "tinacms";

interface UtilityButtonProps {
  buttonText?: string;
  onClick?: () => void;
  className?: string;
  link?: string;
}

export const UtilityButton = ({
  buttonText,
  onClick,
  className,
  link,
}: UtilityButtonProps) => {
  const baseComponent = (
    <Button
      ripple
      className={classNames("mx-auto mt-8 max-w-full p-3", className)}
      onClick={onClick}
      data-aos="fade-up"
    >
      {buttonText}
    </Button>
  );

  if (link) {
    return (
      <div>
        <a href={link} className="unstyled no-underline">
          {baseComponent}
        </a>
      </div>
    );
  }

  return baseComponent;
};

export const utilityButtonSchema: Template = {
  name: "UtilityButton",
  label: "Utility Button",
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
      isBody: true,
    },
    {
      type: "string",
      label: "Link",
      name: "link",
      required: false,
    },
  ],
};
