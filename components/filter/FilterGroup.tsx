import { Transition } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export interface FilterGroupProps {
  selected: number;
  setSelected: (index: number) => void;
  allText: string;
  options: string[];
}

export const FilterGroup = ({
  selected,
  setSelected,
  options,
  allText,
}: FilterGroupProps) => {
  return (
    <div>
      <FilterOption
        index={-1}
        selected={selected}
        setSelected={setSelected}
        className={selected === -1 ? "font-bold" : ""}
      >
        {allText}
      </FilterOption>
      {options.map((curr, index) => (
        <FilterOption
          key={index}
          index={index}
          selected={selected}
          setSelected={setSelected}
          className={selected === index ? "font-bold" : ""}
        >
          {curr}
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
      <Transition
        className="inline"
        show={hovered || index === selected}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Image
          alt="Arrow"
          src="/images/Employment/arrow.png"
          height={10}
          width={10}
          className="absolute m-2 ml-1"
        />
      </Transition>
      <span className={classNames("ml-6", className)}>{children}</span>
    </div>
  );
};
