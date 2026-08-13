"use client";

import { CustomLink } from "@/components/customLink";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { ArrowCircle } from "../blocks/v3/shared/arrowCircle";
import { cardShell, destinationLabel } from "./shared";

// YakShaver's official horizontal dark-mode lockup, already in the repo's
// company-logos download set. 212x41.
const LOCKUP_SRC =
  "/images/company-logos/downloads/YakShaver-Horizontal-Color-Darkmode.svg";

// Their official brand gradient artwork — the bloom's mass sits at the right
// edge of the image and falls off to fully transparent on the left. Rendered
// down the card's right-hand side; see the notes at the usage below.
const GRADIENT_SRC = "/images/YakShaver-Gradient-BG.png";

type YakShaverProductCardProps = {
  product: { name?: string; url?: string; description?: string };
  tinaNode?: Record<string, unknown>;
};

// YakShaver's card: their official dark-mode lockup and brand gradient artwork
// on the same card surface the other nine products use in dark mode.
//
// Two things to know before editing:
//
// 1. THE CARD IS ITS OWN `dark` SCOPE. It carries the `dark` class, so every
//    design token inside it resolves to its dark value regardless of the page
//    theme. That is what lets it use the ordinary `bg-card` / `bg-card-hover` /
//    `text-foreground` tokens and still stay dark in light mode — the surface is
//    therefore *always* the same #101010 / #151515 the standard cards show in
//    dark mode, from the same tokens, with no duplicated literals to drift.
//    Reaching for `bg-card` WITHOUT this scope would be a bug: it resolves to
//    #f9f9f9 in light mode and the card would render near-white.
//    Corollary: any `dark:`-prefixed utility used inside this card is always on.
//
// 2. The gradient artwork's stops are bright — white over them measures roughly
//    2:1 to 4.75:1 and fails. Nothing may sit on top of it. Two independent
//    things keep copy off it: the artwork sits on the right-hand side, and the
//    text column is capped to half the card at the 4-up tier.
export const YakShaverProductCard: FC<YakShaverProductCardProps> = ({
  product,
  tinaNode,
}) => {
  return (
    <CustomLink
      href={product.url ?? ""}
      className={cn(
        cardShell,
        // `dark` makes this card its own always-dark token scope — see note 1 in
        // the component comment. Everything below then uses the same tokens the
        // standard product cards use, so the surface matches them exactly:
        // #101010 at rest, #151515 on hover.
        //
        // cardShell's brand-coloured focus outline is kept as-is here (unlike on
        // the TinaCMS card, which needs a white one): #cc4141 measures 3.99:1
        // against this surface, clearing the 3:1 a focus indicator needs.
        "dark justify-between bg-card",
        // Border matches the standard cards' dark-mode border exactly: because
        // this card is a `dark` scope, `border-hairline` resolves to the same
        // #212121 they use, and `border-brand` to the same #cc4141 on hover
        // (3.99:1 against this surface).
        "border-hairline hover:border-brand",
        // Surface still lifts to card-hover on hover. Flat — no lift, no shadow.
        "hover:bg-card-hover",
        "gap-4 p-6"
      )}
    >
      {/* Their official gradient artwork, filling the card's right-hand side.
          The bloom's mass already sits at the image's right edge and falls off to
          fully transparent on the left, so it needs no flipping and no cropping:
          anchored right at full height it reads as light entering from the card's
          right edge.

          No blend mode. The asset carries a real alpha channel (its dark area is
          alpha 0, and the bloom is a smooth alpha ramp), so normal compositing
          renders it exactly as designed and the image's bounding box leaves no
          visible edge. An earlier revision used `mix-blend-screen` to cope with
          the black surround of a different export of this artwork — with a proper
          alpha channel that would now be wrong, because screen blends additively
          and would wash the bloom brighter than intended.

          `h-full w-auto max-w-none` keeps the artwork's own aspect ratio (Tailwind
          preflight's `img { max-width: 100% }` would otherwise squash it on a
          tall card), so the soft falloff is preserved rather than cropped into a
          hard edge.

          aria-hidden + empty alt: pure decoration, nothing to announce. */}
      <Image
        src={GRADIENT_SRC}
        alt=""
        aria-hidden
        // Matches the asset's real intrinsic size. These must stay in step with
        // the file: next/image builds its srcset from `width`, so leaving the
        // old 1670x1069 here would make it request 1670w/3840w candidates of a
        // 500px source. No `sizes` prop is needed precisely because the source
        // is now no larger than the slot ever renders (roughly 320-400px wide,
        // since `h-full w-auto` scales it off the card height, not the
        // viewport) - the optimizer never upscales past intrinsic width.
        width={500}
        height={320}
        loading="lazy"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-auto max-w-none select-none"
      />

      {/* Their brand guide's 92px mark size is meaningful for an icon, not for a
          212x41 horizontal lockup — sized h-12 (54px tall, ~279px wide) for
          visual weight matching the TinaCMS card's lockup instead. */}
      <Image
        src={LOCKUP_SRC}
        // The lockup contains the wordmark, so it carries the product name
        // visually. The accessible name comes from the sr-only <h3> below —
        // this is decorative to avoid announcing "YakShaver" twice.
        alt=""
        aria-hidden
        width={212}
        height={41}
        // self-start is load-bearing: as a stretched flex child the img box
        // would span the whole card, and preserveAspectRatio would then centre
        // the lockup inside it instead of left-aligning it.
        className="relative h-12 w-auto self-start"
      />

      {/* sr-only heading: the lockup is an image, so without this the product
          would have no text name in the document at all — nothing for a screen
          reader to announce, for in-page find to match, or for SEO to index. */}
      <h3
        className="sr-only"
        data-tina-field={tinaNode ? tinaField(tinaNode, "name") : undefined}
      >
        {product.name}
      </h3>

      {product.description && (
        <p
          // Runs the full width of the card. There is deliberately no width cap:
          // an earlier revision capped this to half the card at the 4-up tier to
          // keep the copy clear of the gradient's bright stops, but the measured
          // contrast over the bloom stays above AA (see below), so the cap was
          // not load-bearing.
          //
          // text-muted-foreground is safe here only because the card is a `dark`
          // scope: it resolves to rgba(255,255,255,0.78) — 11.7:1 on the flat
          // surface, and still 4.5:1+ where it crosses the brightest part of the
          // gradient. If the artwork is ever swapped for a lighter one, re-check
          // this: the old export's stops measured as low as 2:1.
          className="relative m-0 p-0 text-sm font-light leading-snug text-muted-foreground"
          data-tina-field={
            tinaNode ? tinaField(tinaNode, "description") : undefined
          }
        >
          {product.description}
        </p>
      )}

      {/* No divider rule above this footer — unlike the standard cards, the two
          brand cards carry their own surface and read as whole panels, so the
          line was extra furniture. pt-3 stays, to keep the footer's spacing
          from the copy above unchanged. */}
      <div className="relative flex items-center justify-between gap-3 pt-3">
        <span className="min-w-0 truncate text-sm text-muted-foreground">
          {destinationLabel(product.url)}
        </span>
        {/* No colour override needed: ArrowCircle's own defaults are
            `bg-foreground text-background`, which inside this card's `dark` scope
            already resolve to a white circle with a dark glyph. scale-100 keeps
            the rotation as its only gesture. */}
        <ArrowCircle
          className="size-9 flex-none p-2 group-hover:scale-100"
          iconClassName="size-3.5"
        />
      </div>
    </CustomLink>
  );
};
