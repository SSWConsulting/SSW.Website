# Handover — Footer deployment band ("powered by" banner)

**Status:** spec for implementation. PR #4970 was closed without merging; this document carries forward the one piece worth keeping.

**Reference implementation:** branch `feature/4923-homepage-refinements` (head `8cc578f6` plus follow-up cleanup). Read it for the working code — but implement against this spec, since the branch also contains unrelated homepage copy/layout changes that were abandoned.

**Related:** #4923, #4849 (mobile spacing), #4826 (tooltip overflow), #4827 (removed the original component), #4925 (stripped the dayjs plugin), #926 (original `.fromNow()` fix), #2796 (added the logo assets).

---

## 1. What this is

A full-bleed dark strip pinned to the bottom of the site footer, containing two things side by side:

1. **A deployment sentence** — "This website is under continuous deployment. Last updated 2 days ago. Last commit `a1b2c3d`." This existed on the site historically and was lost in #4827 during the footer rebuild. This restores it.
2. **The powered-by credits** — "Powered by TinaCMS", "Built on Microsoft Azure", each now with a 16×16 logo. These currently render as plain text inside the footer's bottom bar; they move down into the band and gain logos.

```
┌─ footer  bg-sswBorder #212121 ─────────────────────────┐
│                                                        │
│   [SSW logo]                          [social icons]   │
│   ──────────────────────────────────────────────────   │
│   About        Services      Company     ...           │
│   link         link          link                      │
│   ──────────────────────────────────────────────────   │
│   © 2026 SSW                    Privacy · Terms        │
│                                                        │
├─ band  bg-black/30 over the above → ~#171717 ──────────┤
│  This website is under continuous     🦙 POWERED BY    │
│  deployment. Last updated 2 days      TINACMS          │
│  ago. Last commit a1b2c3d.            ☁ BUILT ON AZURE │
└────────────────────────────────────────────────────────┘
```

## 2. Structure

The band sits **outside** the footer's main `<Container>` so its darker surface runs edge to edge, with its own inner `Container` keeping content aligned with the footer above.

```tsx
</Container>          {/* end of the existing footer container */}

<div className="w-full bg-black/30">
  <Container width="large" size="custom" className="py-4">
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-xs">
      <DeploymentInfo className="min-w-0 grow basis-128" />
      <PoweredByCredits items={bottomBar?.poweredBy} />
    </div>
  </Container>
</div>
```

**The row must fold intrinsically, not at a viewport breakpoint.** `poweredBy` is CMS-editable, so how much room the credits need isn't knowable at build time. `flex-wrap` plus `basis-128` (32rem) on the sentence puts the two side by side only while both genuinely fit, and drops the credits to their own line the moment they don't. A fixed `md:flex-row` was tried first and produced a ragged two-column block well before there was room for one.

`bg-black/30` over the footer's `#212121` resolves to about `#171717`.

## 3. Part A — the deployment sentence

Renders: `This website is under [continuous deployment]. Last updated [time]. Last commit [sha].`

- "continuous deployment" links to `https://www.ssw.com.au/rules/rules-to-better-websites-deployment`
- The commit links to `https://github.com/{repo}/commit/{sha}`, displaying the first 7 characters
- Both the "Last updated" and "Last commit" clauses are individually conditional — the sentence must read correctly with either or both absent, including the final full stop

**Env vars** (all three already plumbed — no CI work needed):

| Variable | Set by |
|---|---|
| `NEXT_PUBLIC_GITHUB_RUN_DATE` | `template-build.yml` build-arg → `Dockerfile` ARG/ENV |
| `NEXT_PUBLIC_GITHUB_SHA` | same |
| `NEXT_PUBLIC_GITHUB_REPOSITORY` | same |

Only `.env.example` needs updating, to document them for local dev.

### The three things that will bite you

**(a) It must be a client component, and the relative time must be computed in `useEffect`.**
Every page is `force-static`. A relative time computed during render is evaluated once, inside the same Docker build that stamps `NEXT_PUBLIC_GITHUB_RUN_DATE` — so the HTML ships with "a few seconds ago" baked in and stays that way until the next deploy. Render the absolute date server-side and swap it for the relative one on hydration.

**(b) `dayjs` returns a *truthy* object for unparseable input.** A null check is not enough; you need `.isValid()`. Calling `.toISOString()` on an invalid dayjs throws `RangeError`, and because this component sits in the root layout of a static site, an unguarded throw fails the **entire build**, not one page.

**(c) Extend the dayjs plugins in this file, not in `app/layout.tsx`.** A layout-level `extend(relativeTime)` has already been stripped twice as apparently-unused (#4925, after #4827 removed its only consumer), each time leaving `.fromNow()` primed to throw. `dayjs.extend` is idempotent, so extending locally is safe and keeps the dependency next to its use.

### Accessibility

Use `<time dateTime={iso} title={exact}>` rather than a `<span>`, so the exact instant is machine-readable. Do **not** build a positioned tooltip element — the previous one caused horizontal overflow on mobile (#4826). Only apply `cursor-help` once the relative time has actually replaced the absolute one.

## 4. Part B — powered-by credits

Each item is an optional logo + an uppercase label, wrapped in a link when the item has a URL and a plain `<span>` when it doesn't.

- Logo renders at 16×16 with `alt=""` — it is decorative, the label immediately follows it
- Each item is `whitespace-nowrap` so a credit never splits from its logo; the group's own `flex-wrap` breaks *between* credits
- Each item carries `py-1 -my-1`, which grows the tap target to the WCAG 2.5.8 minimum without shifting layout — the text alone falls short
- Return `null` when there are no items
- Styling: `uppercase tracking-wider text-gray-400`, `hover:text-white`

**Remove the existing `poweredBy` block from the footer's bottom bar** (`footer.tsx` on `main`, the right-hand `<div>` of the copyright row) as part of this move — it must not render in both places.

## 5. CMS changes

`tina/collections/footer.tsx` — add an image field to the `poweredBy` object:

```ts
{
  type: "image",
  label: "Logo",
  name: "logo",
  description: "Optional 16x16 logo shown before the label, e.g. the TinaCMS llama.",
}
```

`content/footer/index.json` — populate the two existing entries:

```json
"poweredBy": [
  { "label": "Powered by TinaCMS",       "url": "https://tina.io",      "logo": "/images/logos/tina-llama-orange.png" },
  { "label": "Built on Microsoft Azure", "url": "/consulting/azure",    "logo": "/images/logos/azure.png" }
]
```

**Both assets already exist in `main`** (added in #2796) — no new images required.

## 6. Prerequisite — a real bug in the build workflow

`.github/workflows/template-build.yml`, the "Get current date" step:

```diff
- echo "date=$(Get-Date -Format yyyy-MM-ddThh:mm:ssZ -AsUtc)" >> $env:GITHUB_OUTPUT
+ echo "date=$(Get-Date -Format yyyy-MM-ddTHH:mm:ssZ -AsUtc)" >> $env:GITHUB_OUTPUT
```

In .NET format strings `hh` is **12-hour** and `HH` is **24-hour**. With no AM/PM designator in the string, every afternoon deploy has been stamped as the morning — a 17:30 deploy recorded as `05:30`. This must be fixed or "Last updated" will be wrong for half of every day.

This is worth landing on its own regardless of whether the band ships.

## 7. Acceptance criteria

- [ ] Band renders full-bleed at the bottom of the footer, visibly darker than the footer above, content aligned with the footer's columns
- [ ] Sentence and credits sit side by side on wide viewports and stack cleanly on narrow ones, folding on **content width**, not a breakpoint
- [ ] Adding a third `poweredBy` item in Tina pushes the credits onto their own line without a ragged intermediate state
- [ ] "Last updated" shows a *live* relative time on a deployed build — confirm it still reads correctly a day after deploy, not frozen at "a few seconds ago"
- [ ] A malformed `NEXT_PUBLIC_GITHUB_RUN_DATE` degrades gracefully; it does not fail the build
- [ ] With no env vars set (local dev), the sentence still reads correctly and ends with a single full stop
- [ ] Logos are `alt=""`; credit links reach the WCAG 2.5.8 target size
- [ ] `poweredBy` no longer renders in the footer's copyright row
- [ ] Deploy timestamps are 24-hour after the workflow fix

## 8. Not in scope

The rest of PR #4970 — homepage copy edits, statistics wording, people-carousel GitHub links and card click behaviour, service-card aspect ratio, office-accordion hover — was abandoned along with the PR. Do not carry it across.
