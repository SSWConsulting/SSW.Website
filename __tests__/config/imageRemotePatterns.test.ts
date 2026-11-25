import { describe, expect, it } from "@jest/globals";
import type { RemotePattern } from "next/dist/shared/lib/image-config";
import { matchRemotePattern } from "next/dist/shared/lib/match-remote-pattern";
import { readFileSync } from "fs";
import { join } from "path";

// next.config.mjs is ESM with side-effecting imports, which Jest can't load,
// so pull the remotePatterns array literal out of the source and evaluate it.
const source = readFileSync(join(__dirname, "../../next.config.mjs"), "utf8");
const literal = /remotePatterns:\s*(\[[\s\S]*?\n {4}\])/.exec(source)?.[1];
const patterns: RemotePattern[] = new Function(`return ${literal}`)();
const allowed = (url: string) =>
  patterns.some((p) => matchRemotePattern(p, new URL(url)));

describe("images.remotePatterns for ssw.com.au", () => {
  it.each([
    "https://ssw.com.au/x.png",
    "https://www.ssw.com.au/x.png",
    "https://rules.ssw.com.au/x.png",
  ])("allows %s", (url) => {
    expect(allowed(url)).toBe(true);
  });

  it.each([
    "https://evilssw.com.au/x.png",
    "https://www.evilssw.com.au/x.png",
    "http://www.ssw.com.au/x.png",
    "http://ssw.com.au/x.png",
  ])("blocks %s", (url) => {
    expect(allowed(url)).toBe(false);
  });
});
