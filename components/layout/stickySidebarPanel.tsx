"use client";

import { useEffect, useRef } from "react";

// Mirror tailwind.config.js: spacing.headerOffset and the md breakpoint.
const HEADER_OFFSET = 104;
const BOTTOM_GAP = 24;
const DESKTOP_QUERY = "(min-width: 768px)";

// Tall sidebars follow scrolling until either edge reaches the viewport,
// keeping every item reachable. Short sidebars retain the header offset.
export const StickySidebarPanel = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    let top = HEADER_OFFSET;
    let lastY = Math.max(0, window.scrollY);

    const update = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;

      if (!desktop.matches) {
        el.style.top = "";
        return;
      }

      const lowest = Math.min(
        HEADER_OFFSET,
        window.innerHeight - el.offsetHeight - BOTTOM_GAP
      );
      top = Math.min(HEADER_OFFSET, Math.max(lowest, top - delta));
      el.style.top = `${top}px`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    desktop.addEventListener("change", update);
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      desktop.removeEventListener("change", update);
      observer.disconnect();
      el.style.top = "";
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
