import classNames from "classnames";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type ReadMoreProps = {
  text: string;
  length: number;
  className?: string;
};

const condenseContent = (text: string, length: number) => {
  const formatted = text.split(". ")[0] + ". ...";

  if (formatted.length <= length) return formatted;
  else return formatted.slice(0, length) + "...";
};

export const ReadMore = ({ text, length, className }: ReadMoreProps) => {
  const [dropdownClicked, setDropdownClicked] = useState(false);

  return (
    <div className={classNames("flex flex-col", className)}>
      <div
        dangerouslySetInnerHTML={{
          __html: dropdownClicked ? text : condenseContent(text, length),
        }}
      />
      <button
        className="flex grow-0 flex-row items-center pt-2 text-sm text-gray-800"
        onClick={() => setDropdownClicked((prev) => !prev)}
      >
        Read {dropdownClicked ? "less" : "more"}{" "}
        <MdOutlineKeyboardArrowDown
          className={dropdownClicked && "rotate-180"}
        />
      </button>
    </div>
  );
};
