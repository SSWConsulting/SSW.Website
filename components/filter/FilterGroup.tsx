"use client";

import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { NO_SELECTION } from "./FilterBlock";

export interface FilterGroupProps {
  selected: number;
  setSelected: (index: number) => void;
  allText: string;
  options: Option[];
}

export type Option = {
  label: string | Readonly<string>;
  count: number;
};
export const FilterGroup = ({
  selected,
  setSelected,
  options,
  allText,
}: FilterGroupProps) => {
  return (
    <div className="flex flex-col">
      <FilterOption
        index={-1}
        selected={selected}
        setSelected={setSelected}
        className={selected === NO_SELECTION ? "font-bold" : ""}
      >
        {allText}
      </FilterOption>
      {options?.map((curr, index) => (
        <FilterOption
          key={index}
          index={index}
          selected={selected}
          setSelected={setSelected}
          className={selected === index ? "font-bold" : ""}
        >
          {curr.label} ({curr.count})
        </FilterOption>
      ))}
      <hr />
    </div>
  );
};

interface FilterOptionProps {
  index: number;
  selected: number;
  setSelected: (index: number) => void;
  children?: React.ReactNode;
  className?: string;
}

const FilterOption = ({
  index,
  children,
  selected,
  setSelected,
  className,
}: FilterOptionProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      className="m-0.5 inline-block w-64 cursor-pointer rounded-md py-1 hover:bg-gray-100 hover:text-sswRed"
      onClick={() => setSelected(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="inline-block h-3.5 w-6 text-sswRed">
        <Transition
          as={"div"}
          show={hovered || index === selected}
          enter="transition-opacity transition-transform duration-300"
          enterFrom="opacity-0 -translate-x-2"
          enterTo="opacity-100 translate-x-0"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <BsArrowRightCircle />
        </Transition>
      </div>
      <span className={classNames("", className)}>{children}</span>
    </div>
  );
};
