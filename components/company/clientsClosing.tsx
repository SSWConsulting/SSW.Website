import RippleButton from "@/components/button/rippleButtonV2";
import { cn } from "@/lib/utils";
import { FiArrowUpRight } from "react-icons/fi";

export const ClientsClosing = ({ stacked = false }: { stacked?: boolean }) => (
  <section
    className={cn(
      "flex justify-between gap-8 rounded-card border-0.75 border-stroke-weak bg-card p-8 dark:border-hairline",
      stacked
        ? "h-full flex-col items-start md:p-10"
        : "items-center max-md:flex-col max-md:items-start md:p-12"
    )}
  >
    <div>
      <p className="m-0 text-xs font-semibold uppercase tracking-widest text-brand">
        Your next chapter
      </p>
      <h2 className="m-0 mt-4 p-0 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
        Let&rsquo;s build your
        <br />
        success story.
      </h2>
      <p className="m-0 mt-4 text-muted-foreground">
        Bring us your challenge. We&rsquo;ll help you find the way forward.
      </p>
    </div>
    <RippleButton
      variant="primary"
      href="/company/contact-us"
      className={cn(
        "flex-none text-base font-semibold",
        stacked ? "inline-block" : "inline-flex"
      )}
      fontClassName={stacked ? undefined : "gap-3"}
    >
      <span>Book a free initial call</span>
      <FiArrowUpRight aria-hidden className="size-4" />
    </RippleButton>
  </section>
);
