import classNames from "classnames";
import { useMemo, useState } from "react";
import { BiDownArrow } from "react-icons/bi";

type ReadMoreProps = {
  text: string;
  length: number;
  className?: string;
};

export const ReadMore = ({ text, length, className }: ReadMoreProps) => {
  const [dropdownClicked, setDropdownClicked] = useState(false);

  const formattedText = useMemo(() => {
    if (dropdownClicked) {
      return text;
    } else {
      return text.slice(0, length) + "...";
    }
  }, [dropdownClicked, text]);

  return (
    <div className={classNames("flex flex-col", className)}>
      {formattedText}{" "}
      <button
        className="flex grow-0 flex-row bg-gray-200"
        onClick={() => setDropdownClicked((prev) => !prev)}
      >
        Read more <BiDownArrow />
      </button>
    </div>
  );
};
