import classNames from "classnames";

const verticalPadding = {
  custom: "",
  xsmall: "py-4",
  small: "py-8",
  medium: "py-12",
  large: "py-24",
  default: "py-12",
} as const;
const widthClass = {
  small: "max-w-4xl",
  medium: "max-w-5xl",
  large: "max-w-9xl",
  default: "max-w-9xl",
  custom: "",
} as const;

type ContainerProps = {
  size?: keyof typeof verticalPadding;
  width?: keyof typeof widthClass;
  padding?: string;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Container = ({
  children,
  size = "default",
  width = "default",
  padding = "px-8",
  className = "",
  ...props
}: ContainerProps) => {
  return (
    <div
      className={classNames(
        "mx-auto",
        padding,
        widthClass[width],
        verticalPadding[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
