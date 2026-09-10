import { CustomLink } from "@/components/customLink";
import { cardShell, learnMoreChip } from "@/components/products/shared";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";

const SSWTV_URL = "https://www.youtube.com/@SSWTV";

export const SswTvCard = ({ className }: { className?: string }) => (
  <CustomLink
    href={SSWTV_URL}
    aria-label="Watch SSW TV on YouTube"
    className={cn(
      cardShell,
      "dark min-h-sidebar-card justify-between gap-3 p-5",
      "border-hairline bg-card hover:border-brand hover:bg-card-hover",
      className
    )}
  >
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
      <span className={cn(learnMoreChip, "gap-2")}>
        <FaYoutube aria-hidden className="size-4 text-sswRed" />
        Watch on YouTube
      </span>
    </div>
  </CustomLink>
);
