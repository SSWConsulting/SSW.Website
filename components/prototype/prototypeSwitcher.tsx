"use client";

// PROTOTYPE — throwaway. Floating bar for flipping between ?variant= keys.
// Never rendered in production builds.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

type Props = {
  variants: { key: string; name: string }[];
  current: string;
};

export function PrototypeSwitcher({ variants, current }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current)
  );

  const go = (delta: number) => {
    const next = variants[(index + delta + variants.length) % variants.length];
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", next.key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      )
        return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-yellow-300 px-3 py-2 font-mono text-sm text-black shadow-2xl ring-2 ring-black">
      <button
        aria-label="Previous variant"
        onClick={() => go(-1)}
        className="rounded-full p-1 hover:bg-black/10"
      >
        <BiLeftArrowAlt className="size-5" />
      </button>
      <span className="min-w-56 text-center">
        PROTOTYPE {variants[index].key} ({variants[index].name})
      </span>
      <button
        aria-label="Next variant"
        onClick={() => go(1)}
        className="rounded-full p-1 hover:bg-black/10"
      >
        <BiRightArrowAlt className="size-5" />
      </button>
    </div>
  );
}
