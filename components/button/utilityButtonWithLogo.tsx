import classNames from "classnames";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";
import Button from "./button";

const sizes = {
  small: "px-4 py-2 text-sm",
  medium: "px-10 py-3",
} as const;

type UtilityButtonWithLogoProps = {
  buttonText?: string | JSX.Element;
  onClick?: () => void;
  className?: string;
  link?: string;
  size?: keyof typeof sizes;
  noAnimate?: boolean;
  uncentered?: boolean;
  removeTopMargin?: boolean;
  openInNewTab?: boolean;
};

export const UtilityButtonWithLogo = ({
  buttonText,
  onClick,
  className,
  link,
  size,
  noAnimate,
  uncentered,
  removeTopMargin,
  openInNewTab,
}: UtilityButtonWithLogoProps) => {
  const baseComponent = (
    <Button
      ripple
      className={classNames(
        "h-auto",
        sizes[size ?? "medium"],
        uncentered ? "" : "mx-auto max-w-full",
        removeTopMargin ? "" : "mt-8",
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
        <CustomLink
          href={link}
          target={openInNewTab ? "_blank" : ""}
          className="unstyled no-underline"
        >
          {baseComponent}
        </CustomLink>
      </div>
    );
  }

  return baseComponent;
};

export const utilityButtonWithLogoSchema: Template = {
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
    {
      type: "boolean",
      label: "Uncentered",
      name: "uncentered",
      required: false,
    },
    {
      type: "boolean",
      label: "Remove top margin",
      name: "removeTopMargin",
      required: false,
    },
    {
      type: "boolean",
      label: "Open in new tab",
      name: "openInNewTab",
      required: false,
    },
  ],
};
