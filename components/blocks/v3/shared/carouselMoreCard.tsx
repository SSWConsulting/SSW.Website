import { cn } from "@/lib/utils";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

// End cap for the finite mobile carousels: a "+ more" tile rendered after the
// last card that links to the section's full page (e.g. /people, /events).
// Only used inside the mobile carousels — the lg+ grids/rows keep the header CTA.
export function CarouselMoreCard({
  href,
  label = "+ more",
  newTab,
  className,
}: {
  href: string;
  label?: string;
  newTab?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={cn(
        "group flex h-full flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center !no-underline",
        className
      )}
    >
      <span className="flex size-12 shrink-0 scale-100 items-center justify-center rounded-full bg-white text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-125">
        <BsArrowUpRight className="size-5" />
      </span>
      <span className="text-lg font-semibold text-white">{label}</span>
    </Link>
  );
}
