"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHomeTheme } from "./homeTheme";

// Floating light/dark switch for the v3 homepage. Placed bottom-left to stay clear
// of the bottom-right chat widget. Final home is the megamenu header once its
// extension point is sorted (see homeTheme.tsx notes).
export const ThemeToggle = ({ className }: { className?: string }) => {
  const { isDark, toggleTheme } = useHomeTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "fixed bottom-6 left-6 z-1000 flex size-11 items-center justify-center rounded-full border border-hairline bg-background text-foreground shadow-lg transition-colors hover:text-sswRed",
        className
      )}
    >
      {isDark ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
};
