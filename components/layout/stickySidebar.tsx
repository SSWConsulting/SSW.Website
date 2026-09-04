import { cn } from "@/lib/utils";

// Shared by the sidebar <h1> and the category <h2>s on both index pages, so
// the two stay in lockstep.
export const sidebarHeadingClass =
  "text-xl font-semibold leading-tight max-md:text-lg xl:text-2xl";

// One row of the sticky index. `extra` carries the per-page bits: /events
// renders <button>s, which need the width and alignment resets an <a> gets for
// free.
export const sidebarNavItem = (isActive: boolean, extra?: string) =>
  cn(
    "unstyled block min-h-9 rounded-lg px-2.5 py-1.5 text-base leading-tight no-underline transition-colors duration-150 motion-reduce:transition-none",
    // A ring, not `outline`: tailwind-merge drops the bare `outline` class,
    // leaving outline-style: none.
    "focus-visible:ring-2 focus-visible:ring-brand",
    "max-md:rounded-full max-md:border-0.75 max-md:border-hairline max-md:bg-gray-100 max-md:px-3 max-md:py-2.5 dark:max-md:bg-card",
    // Active and inactive colours are mutually exclusive, never layered:
    // adding `text-brand` on top of `dark:text-muted-foreground` loses in dark
    // mode, since tailwind-merge keeps both and
    // `.dark .dark:text-muted-foreground` outranks a bare `.text-brand` on
    // specificity.
    isActive
      ? "text-brand dark:text-brand"
      : "text-gray-600 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground",
    extra
  );

type StickySidebarLayoutProps = {
  title: string;
  // The sticky column's nav. Each page builds its own: /consulting renders
  // anchors to in-page sections, /events renders filter buttons.
  sidebar: React.ReactNode;
  // Sits under the nav on desktop, and at the foot of the content column on
  // mobile, where the sticky column collapses to a bar and has no room for it.
  // Passed once; this component mounts both copies.
  promo?: React.ReactNode;
  contentRef?: React.Ref<HTMLDivElement>;
  contentClassName?: string;
  children: React.ReactNode;
};

// The sticky-index + fluid-content shell shared by the /consulting and /events
// index pages. Extracted because both pages carried it character for
// character, and a single spacing change had to be applied to each by hand to
// keep them aligned.
export const StickySidebarLayout = ({
  title,
  sidebar,
  promo,
  contentRef,
  contentClassName,
  children,
}: StickySidebarLayoutProps) => (
  <div className="grid grid-cols-sidebar items-start gap-8 max-xl:grid-cols-sidebar-narrow max-md:grid-cols-1 max-md:gap-4">
    {/* A plain div, not <aside>: the <nav>s below are already their own
        landmarks, and wrapping only files the <h1> under "complementary". */}
    <div
      className={cn(
        "sticky top-headerOffset self-start",
        // top-0 on mobile: the scrim and backdrop-blur are there for cards to
        // slide underneath. Any offset leaves a gap that cards scroll through
        // in full view, above the bar rather than behind it.
        "max-md:top-0 max-md:z-15 max-md:-mx-3 max-md:border-b-0.75 max-md:border-hairline max-md:bg-sunken-scrim max-md:px-3 max-md:pb-2.5 max-md:pt-2 max-md:backdrop-blur"
      )}
    >
      <h1
        className={cn(
          sidebarHeadingClass,
          "m-0 whitespace-nowrap p-0 text-foreground max-md:mb-2"
        )}
      >
        {title}
      </h1>

      {sidebar}

      {/* Capped, not column-width: it keeps the old sidebar tiles'
          proportions instead of stretching to a 400px-wide slab. */}
      {promo && (
        <div className="mt-8 max-w-sidebar-card max-md:hidden">{promo}</div>
      )}
    </div>

    <div ref={contentRef} className={cn("min-w-0", contentClassName)}>
      {children}

      {/* The mobile counterpart of the sidebar promo above: the collapsed
          filter bar has to stay bar-height, so it lands here instead. */}
      {promo && (
        <div className="mt-12 max-w-sidebar-card md:hidden">{promo}</div>
      )}
    </div>
  </div>
);
