"use client";

import { Globe, Moon, Search as SearchIcon, Sun } from "lucide-react";
import Link from "next/link";
import { ArrowCircle } from "@/components/blocks/v3/shared/arrowCircle";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useHomeTheme } from "./homeTheme";

const SEARCH_SITE = "www.ssw.com.au";
const CONTACT_URL = "/company/contact-us";

const REGIONS = [
  { label: "Australia", url: "https://www.ssw.com.au" },
  { label: "China", url: "https://www.ssw.cn" },
  { label: "France", url: "https://www.ssw.fr" },
];

const ICON_BUTTON =
  "flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:text-sswRed";

// Static so it never disagrees between SSR (seeded dark) and the client's
// resolved theme — the sun/moon glyph already conveys the current mode.
const THEME_TOGGLE_LABEL = "Toggle light or dark mode";

// Popovers render in a portal so the mega menu's `overflow-hidden` can't clip
// them; the wrapper re-applies `dark` so they still resolve the theme tokens
// once they're outside the homepage scope.
function Portal({
  isDark,
  children,
}: {
  isDark: boolean;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div className={isDark ? "dark" : undefined}>{children}</div>,
    document.body
  );
}

function SearchButton({ isDark }: { isDark: boolean }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term.trim()) {
      window.open(
        `https://www.google.com.au/search?q=site:${SEARCH_SITE}%20${encodeURIComponent(
          term
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
    setOpen(false);
    setTerm("");
  };

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className={ICON_BUTTON}
      >
        <SearchIcon className="size-6" aria-hidden="true" />
      </button>
      {open && (
        <Portal isDark={isDark}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="fixed inset-0 z-1000 flex items-start justify-center bg-black/50 p-6 pt-24"
            onClick={() => setOpen(false)}
          >
            <form
              onSubmit={submit}
              onClick={(e) => e.stopPropagation()}
              className={`flex w-full max-w-xl items-center gap-2 rounded-xl p-2 text-foreground shadow-2xl ${
                isDark ? "bg-sswDarkGray" : "bg-white"
              }`}
            >
              <SearchIcon
                className="ml-2 size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search ssw.com.au…"
                className="h-11 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-sswRed px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sswDarkRed"
              >
                Search
              </button>
            </form>
          </div>
        </Portal>
      )}
    </>
  );
}

function RegionGlobe({ isDark }: { isDark: boolean }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
    setOpen((o) => !o);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label="Select region"
        aria-expanded={open}
        onClick={toggle}
        className={ICON_BUTTON}
      >
        <Globe className="size-6" aria-hidden="true" />
      </button>
      {open && pos && (
        <Portal isDark={isDark}>
          <div
            className="fixed inset-0 z-1000"
            onClick={() => setOpen(false)}
          />
          <div
            className={`fixed z-1000 flex min-w-40 flex-col rounded-lg border p-1 text-foreground shadow-xl ${
              isDark
                ? "border-white/10 bg-sswDarkGray"
                : "border-hairline bg-white"
            }`}
            style={{ top: pos.top, right: pos.right }}
          >
            {REGIONS.map((region) => (
              <a
                key={region.label}
                href={region.url}
                className="rounded px-3 py-2 text-sm !no-underline transition-colors hover:text-sswRed"
              >
                {region.label}
              </a>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
}

// The homepage's Figma menu actions: search, language, a sun/moon theme toggle,
// a divider, then the "Let's Talk" pill. Injected via the mega menu's
// `rightSideActionsOverride` so it only replaces the actions on the homepage.
export function HomeNavActions() {
  const { isDark, toggleTheme } = useHomeTheme();

  return (
    <div className="flex items-center gap-2 text-foreground max-sm:w-full max-sm:justify-between max-sm:pb-4 max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-4">
      <div className="flex items-center">
        <SearchButton isDark={isDark} />
        <RegionGlobe isDark={isDark} />
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={THEME_TOGGLE_LABEL}
          title={THEME_TOGGLE_LABEL}
          className={ICON_BUTTON}
        >
          <Sun className="size-6 dark:hidden" aria-hidden="true" />
          <Moon className="hidden size-6 dark:block" aria-hidden="true" />
        </button>
      </div>

      <span className="h-7 w-px shrink-0 bg-hairline max-sm:hidden dark:bg-white/25" />

      <Link
        href={CONTACT_URL}
        className="unstyled group flex h-12 shrink-0 items-center gap-2 rounded-full bg-sswRed py-1 pl-4 pr-1 font-medium text-white"
      >
        Let&apos;s Talk
        <ArrowCircle
          className="size-10 bg-white text-sswRed group-hover:scale-110"
          iconClassName="size-5"
        />
      </Link>
    </div>
  );
}
