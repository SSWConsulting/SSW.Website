# AGENTS.md

## Running the site

- `pnpm dev` is how you run and check the site locally. It runs `tinacms dev -c "next dev"`, which serves the site on http://localhost:3000 and the CMS on http://localhost:3000/admin/index.html.
- **Do not run `pnpm build` locally.** It runs `tinacms build`, which needs TinaCloud credentials that are not in the repo, so it fails with `ERR_MISSING_CLOUD_CREDS`. Let CI build the branch, and use the PR staging slot to check a real deployed build (comment `/deploy` on the PR).
- If another dev server already holds the default ports, pick your own rather than killing it:
  `npx tinacms dev --datalayer-port 9010 -p 4010 -c "next dev -p 3010"`.

## Tina schema changes

- Changing a `*.schema.tsx` or anything under `tina/` requires `tina/tina-lock.json` to be regenerated. Start `pnpm dev` once and commit the updated lock, otherwise the deploy fails with a TinaCloud schema mismatch.
- Content edited through the CMS on a PR staging slot is committed back to that PR branch by the Tina bot, so pull/rebase before pushing.

## Before pushing

- `pnpm lint` and `pnpm test` must both pass. CI is strict about prettier formatting.
- Tailwind arbitrary values (`bg-[...]`, `grid-cols-[...]`) are banned by `tailwindcss/no-arbitrary-value`. Add a named token in `tailwind.config.js` instead. Note the lint rule cannot see classes passed through `cn()`, so it will not catch them for you.
