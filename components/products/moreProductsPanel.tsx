import { cn } from "@/lib/utils";
import { FC } from "react";

// Tailwind's JIT only generates classes it can see as literal strings in the
// source, so the computed spans are looked up in these maps rather than built
// by interpolation — `xl:col-span-${n}` would compile to nothing.
//
// Below md the grid is a single column and every card already fills its row, so
// the default span is correct and no base-tier map is needed.
const MID_SPAN_CLASS: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
};
const WIDE_SPAN_CLASS: Record<number, string> = {
  1: "xl:col-span-1",
  2: "xl:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
};

type MoreProductsPanelProps = {
  // Grid cells the products ahead of this panel occupy, counting the two brand
  // cards as 2 each at the tiers where they span two columns.
  cellsAtMidTier: number;
  cellsAtWidestTier: number;
};

// Fills the gap left at the end of the last row so the grid doesn't end on a
// ragged edge. The span is derived from how many cells the products occupy at
// each tier rather than hardcoded, so it stays correct as products are added to
// or removed from the CMS.
export const MoreProductsPanel: FC<MoreProductsPanelProps> = ({
  cellsAtMidTier,
  cellsAtWidestTier,
}) => {
  // A remainder of 0 means the last row is already full, so the panel takes a
  // whole row of its own rather than collapsing to zero width.
  const spanFor = (cells: number, columns: number) => {
    const remainder = cells % columns;
    return remainder === 0 ? columns : columns - remainder;
  };

  return (
    <div
      className={cn(
        // Dashed, and deliberately without hover or lift: this is a state, not
        // a destination.
        // No gap utility: this holds a single line, so a gap doesn't apply.
        "flex min-h-24 flex-col items-center justify-center rounded-card border-0.75 border-dashed border-stroke-weak p-6 text-center dark:border-hairline",
        MID_SPAN_CLASS[spanFor(cellsAtMidTier, 2)],
        WIDE_SPAN_CLASS[spanFor(cellsAtWidestTier, 4)]
      )}
    >
      <p className="m-0 p-0 text-sm font-medium text-foreground">
        More products coming
      </p>
    </div>
  );
};
