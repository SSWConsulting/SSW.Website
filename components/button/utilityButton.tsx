import classNames from "classnames";
import type { Template } from "tinacms";
import Button from "./button";

const sizes = {
  small: "px-4 py-2 text-sm",
  medium: "px-10 py-3",
} as const;

interface UtilityButtonProps {
  buttonText?: string;
  onClick?: () => void;
  className?: string;
  link?: string;
  size?: keyof typeof sizes;
  noAnimate?: boolean;
}

export const UtilityButton = ({
  buttonText,
  onClick,
  className,
  link,
  size,
  noAnimate,
}: UtilityButtonProps) => {
  const baseComponent = (
    <Button
      ripple
      className={classNames(
        "mx-auto mt-8 h-auto max-w-full",
        sizes[size ?? "medium"],
        className
      )}
      onClick={onClick}
      data-aos={noAnimate ? undefined : "fade-up"}
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
    {
      type: "string",
      label: "Size",
      name: "size",
      required: false,
      options: Object.keys(sizes),
    },
    {
      type: "boolean",
      label: "No Animation",
      name: "noAnimate",
      required: false,
    },
  ],
};
