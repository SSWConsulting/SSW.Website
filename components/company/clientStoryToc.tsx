"use client";

import type { StoryHeading } from "@/helpers/clients";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// The heading nearest the top of the viewport is the one being read. The
// observer only fires on crossings, so it tracks which headings sit above the
// reading line and highlights the last of them.
const useActiveHeading = (headings: StoryHeading[]) => {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const update = () => {
      const passed = elements.filter(
        (element) =>
          element.getBoundingClientRect().top < window.innerHeight / 3
      );
      setActive((passed[passed.length - 1] ?? elements[0]).id);
    };
    const observer = new IntersectionObserver(update, {
      rootMargin: "0px 0px -66% 0px",
    });
    elements.forEach((element) => observer.observe(element));
    update();
    return () => observer.disconnect();
  }, [headings]);

  return active;
};

export const ClientStoryToc = ({ headings }: { headings: StoryHeading[] }) => {
  const active = useActiveHeading(headings);

  return (
    <nav aria-label="On this page">
      <p className="m-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ol className="m-0 mt-4 list-none border-l-0.75 border-stroke-weak p-0 dark:border-hairline">
        {headings.map(({ id, text }) => {
          const isActive = id === active;
          return (
            <li key={id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="client-story-toc"
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="absolute inset-y-0 -left-px w-0.5 bg-sswRed"
                />
              )}
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "unstyled block py-2 pl-4 text-sm leading-snug no-underline transition-colors duration-200 hover:text-foreground motion-reduce:transition-none",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
