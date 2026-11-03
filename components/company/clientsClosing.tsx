import RippleButton from "@/components/button/rippleButtonV2";
import { FiArrowUpRight } from "react-icons/fi";

export const ClientsClosing = () => (
  <section className="flex items-center justify-between gap-8 rounded-card border-0.75 border-stroke-weak bg-card p-8 max-md:flex-col max-md:items-start md:p-12 dark:border-hairline">
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
      className="inline-flex flex-none text-base font-semibold"
      fontClassName="gap-3"
    >
      <span>Book a free initial call</span>
      <FiArrowUpRight aria-hidden className="size-4" />
    </RippleButton>
  </section>
);
