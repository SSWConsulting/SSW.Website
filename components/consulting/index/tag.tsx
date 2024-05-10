import classNames from "classnames";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useHover } from "usehooks-ts";

const BsArrowRightCircle = dynamic(() =>
  import("react-icons/bs").then((icon) => icon.BsArrowRightCircle)
);

export const Tag = ({ label, tag, selectedTag, setSelectedTag }) => {
  const isSelected = tag === selectedTag;
  const hoverRef = useRef(null);
  const hovered = useHover(hoverRef);

  return (
    <li
      className={classNames(
        "cursor-pointer p-1 ease-in-out",
        "duration-500 hover:bg-gray-100 hover:ease-in-out",
        isSelected ? "text-sswRed" : ""
      )}
      onClick={() => setSelectedTag(tag)}
      ref={hoverRef}
    >
      <div
        className={classNames(
          "inline-block h-3.5 w-6 text-sswRed",
          !hovered && !isSelected && "-translate-x-2",
          hovered && "translate-x-0 duration-300 ease-in"
        )}
      >
        {(isSelected || hovered) && <BsArrowRightCircle />}
      </div>
      <span className="truncate">{label}</span>
    </li>
  );
};
