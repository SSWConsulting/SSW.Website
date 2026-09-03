import { CustomLink } from "@/components/customLink";
import { cardShell, learnMoreChip } from "@/components/products/shared";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";

const SSWTV_URL = "https://www.youtube.com/@SSWTV";

// Replaces the Vimeo "Video On Demand" / "Free SuperPowers Videos" thumbnail
// stack that used to sit in the events sidebar body. Sized to match those
// tiles (~265x200) so it drops into the same slot.
export const SswTvCard = ({ className }: { className?: string }) => (
  <CustomLink
    href={SSWTV_URL}
    aria-label="Watch SSW TV on YouTube"
    className={cn(
      cardShell,
      // `dark` pins every token below to its dark value: this is a media
      // surface rather than a page surface, and it is also the only variant
      // the SSW TV lockup ships in — the light one is a separate PNG.
      "dark min-h-[200px] justify-between gap-3 p-5",
      "border-hairline bg-card hover:border-brand hover:bg-card-hover",
      className
    )}
  >
    {/* The lockup is an image, so the link's aria-label carries the name. */}
    <Image
      src="/images/sswtv-logo.svg"
      alt=""
      aria-hidden
      width={184}
      height={45}
      className="h-8 w-auto self-start"
    />

    <p className="m-0 p-0 text-sm font-light leading-snug text-muted-foreground">
      Past talks, user groups and deep dives — all free to watch.
    </p>

    <div className="flex items-center">
      {/* Span, not a button: the card itself is the link, and both are
          invalid nested inside an <a>. */}
      <span className={cn(learnMoreChip, "gap-2")}>
        <FaYoutube aria-hidden className="size-4 text-sswRed" />
        Watch on YouTube
      </span>
    </div>
  </CustomLink>
);
