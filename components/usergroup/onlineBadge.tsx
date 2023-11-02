import classNames from "classnames";

type OnlineBadgeProps = {
  online: boolean;
  className?: string;
};

export const OnlineBadge = ({ online, className }: OnlineBadgeProps) => {
  return (
    <div
      className={classNames(
        "mx-4 inline rounded-md bg-sswRed px-3 py-2 text-xs font-semibold uppercase text-white",
        className
      )}
    >
      {online ? "Online" : "In Person"}
    </div>
  );
};
