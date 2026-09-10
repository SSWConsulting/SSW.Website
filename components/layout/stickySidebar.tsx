import { cn } from "@/lib/utils";

// The padded, centred container both /consulting and /events wrap this layout
// (and their breadcrumbs) in. Shared so a padding tweak lands on both.
export const sidebarPageContainer =
  "mx-auto max-w-8xl px-6 pb-16 pt-4 max-md:px-3 max-md:pb-12 max-md:pt-3";

export const sidebarHeadingClass =
  "text-xl font-semibold leading-tight max-md:text-lg xl:text-2xl";

export const sidebarNavItem = (isActive: boolean, extra?: string) =>
  cn(
    "unstyled block min-h-9 rounded-lg px-2.5 py-1.5 text-base leading-tight no-underline transition-colors duration-150 motion-reduce:transition-none",
    // A ring, not `outline`: tailwind-merge drops the bare `outline` class,
    // leaving outline-style: none. outline-none suppresses the UA ring so it
    // cannot paint over ours.
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
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
  sidebar: React.ReactNode;
  promo?: React.ReactNode;
  contentRef?: React.Ref<HTMLDivElement>;
  contentClassName?: string;
  children: React.ReactNode;
};

export const StickySidebarLayout = ({
  title,
  sidebar,
  promo,
  contentRef,
  contentClassName,
  children,
}: StickySidebarLayoutProps) => (
  <div className="grid grid-cols-sidebar items-start gap-8 max-xl:grid-cols-sidebar-narrow max-md:grid-cols-1 max-md:gap-4">
    <div
      className={cn(
        "sticky top-headerOffset self-start",
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

      {promo && (
        <div className="mt-8 max-w-sidebar-card max-md:hidden">{promo}</div>
      )}
    </div>

    <div ref={contentRef} className={cn("min-w-0", contentClassName)}>
      {children}

      {promo && (
        <div className="mt-12 max-w-sidebar-card md:hidden">{promo}</div>
      )}
    </div>
  </div>
);
