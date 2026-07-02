# Footer Global Collection — Design

Date: 2026-07-01
Branch: `feature/footer-collection`

## Goal

Introduce a new TinaCMS **global collection** for the site footer and rebuild the
footer UI into a full "mega-footer" that resembles the approved mockup: SSW logo +
tagline (top-left), monochrome social icons (top-right), up to 5 link columns, and an
editable bottom bar (copyright + Privacy/Terms links + "powered by" items).

This **replaces** the existing minimal footer site-wide.

## Decisions (confirmed with user)

1. **Socials source:** move (cut) the `socials` array out of the `global` collection
   into the new `footer` collection.
2. **Scope:** replace the current site footer (rewrite `components/layout/footer/footer.tsx`).
3. **Bottom bar:** fully CMS-editable via the new collection.
4. **Deployment info line + Sitemap link:** dropped entirely (not in the mockup).
5. No git commits/pushes without explicit instruction.

## 1. New collection — `tina/collections/footer.tsx`

```
label: "Global - Footer"
name: "footer"
path: "content/footer"
format: "json"
ui: { global: true, allowedActions: { create: false, delete: false } }
match: { include: "index" }
```

Fields:

- **`socials`** — object `list`, moved verbatim from `global`. Item shape:
  `{ type (string, options), title (string), url (string), username (string) }`.
  `type` options aligned to the render map in `socialIcons.tsx`:
  `youtube, linkedin, facebook, instagram, xtwitter, bluesky, threads, tiktok, github, meetup`.
  `ui.itemProps` labels each item by its `type` (matches current global schema).
- **`linkColumns`** — object `list` (label = column `title`). Item shape:
  - `title` (string)
  - `links` — object `list` of `{ label (string), url (string) }`
  - Description notes "Max 5 columns". Enforced authoritatively in render (`.slice(0, 5)`);
    add a best-effort `ui.validate` warning if the installed Tina version supports it.
- **`bottomBar`** — object:
  - `copyrightText` (string) — rendered as `© {currentYear} {copyrightText}` so the year stays live.
  - `links` — object `list` of `{ label, url }` (Privacy Policy, Terms & Conditions).
  - `poweredBy` — object `list` of `{ label, url }` ("Powered by TinaCMS", "Built on Microsoft Azure").

Register in `tina/config.tsx`: import `footerSchema`, add to the `schemas` array next to
`globalSchema`.

## 2. Content / data migration

- Create `content/footer/index.json` with:
  - `socials`: the array moved verbatim from `content/global/index.json`.
  - `linkColumns`: seeded from the mockup (Services / Products / Events & Training /
    About Us / Resources) with their listed links.
  - `bottomBar`: `copyrightText` = "SSW Enterprise Software Development. All rights reserved.",
    `links` = [Privacy Policy → /privacy, Terms & Conditions → /terms-and-conditions],
    `poweredBy` = [Powered by TinaCMS → https://tina.io, Built on Microsoft Azure → /consulting/azure].
- Remove the `socials` array from `content/global/index.json` and the `socials` field from
  `tina/collections/global.tsx`.

## 3. Component changes

### `components/socialIcons/socialIcons.tsx`
- Change the data import from `content/global/index.json` → `content/footer/index.json`.
- Add `variant?: "chip" | "plain"` to `SocialIcons`/`SocialIcon` (default `"chip"`).
  - `"chip"` = existing colored rounded-background icons (liveStream widgets untouched).
  - `"plain"` = white monochrome icon, no background chip (footer). Icon map stays the single source of truth.

### `components/layout/footer/footer.tsx` (rewrite)
Server component; statically imports `content/footer/index.json`.
Structure inside `<footer className="no-print w-full bg-ssw-black text-gray-300">` +
`<Container width="large">`:
1. **Top row:** logo (`next/image` `/images/ssw-logo.svg`) + "Enterprise Software Development"
   tagline on the left; `<SocialIcons variant="plain" />` on the right.
2. `<hr>` divider.
3. **Link columns:** `grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5`, each column a
   `title` heading + `<ul>` of `<CustomLink>` items. `.slice(0, 5)`.
4. `<hr>` divider.
5. **Bottom bar:** copyright + `bottomBar.links` on the left; `bottomBar.poweredBy` (muted,
   uppercase) on the right. Stacks on mobile, `justify-between` row on `md+`.

### Deletions (only used by the footer today)
`copyright-info.tsx`, `deployment-info.tsx`, `site-info.tsx`, `technology-links.tsx`,
and `divider.tsx` (verify no other importers before deleting).

## 4. `next-seo.config.ts`
Repoint the Twitter-handle lookup to read `socials` from `content/footer/index.json`.

## 5. Responsive behavior

- Top row: stacked & centered on mobile → `md:flex-row md:justify-between`.
- Columns: 2 → 3 (`sm`) → 5 (`lg`).
- Bottom bar: stacked on mobile → two-sided row on `md+`.

## Blast radius (files touched)

| File | Change |
|------|--------|
| `tina/collections/footer.tsx` | new |
| `tina/collections/global.tsx` | remove `socials` field |
| `tina/config.tsx` | register `footerSchema` |
| `content/footer/index.json` | new (socials + columns + bottomBar) |
| `content/global/index.json` | remove `socials` array |
| `components/socialIcons/socialIcons.tsx` | repoint import + add `variant` prop |
| `components/layout/footer/footer.tsx` | rewrite to mega-footer |
| `components/layout/footer/{copyright-info,deployment-info,site-info,technology-links,divider}.tsx` | delete |
| `next-seo.config.ts` | repoint socials import |

## Out of scope / notes

- Logo + tagline are static (consistent with the header/megamenu), not CMS fields.
- The mega-footer is used everywhere the old `Footer` is imported (`layout.tsx`,
  `app/components/page-layout.tsx`) — no per-page wiring needed.
- Verification is browser-based and done by the user (per standing preference).
