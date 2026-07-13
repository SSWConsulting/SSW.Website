import { cn } from "@/lib/utils";
import { BsArrowUpRight } from "react-icons/bs";

type ArrowCircleProps = {
  className?: string;
  iconClassName?: string;
};

// White circular button holding an up-right arrow that rotates 45° and scales
// up when the nearest `group` ancestor is hovered. Size, padding, alignment and
// even the hover scale are set per call site via `className` (tailwind-merge
// lets those override the defaults below); `iconClassName` sizes the arrow.
export function ArrowCircle({
  className,
  iconClassName = "size-1/3",
}: ArrowCircleProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 scale-100 items-center justify-center rounded-full bg-white text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-125",
        className
      )}
    >
      <BsArrowUpRight className={iconClassName} />
    </span>
  );
}
