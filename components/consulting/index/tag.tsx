import classNames from "classnames";
import { useRef } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { useHover } from "usehooks-ts";

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
