import { describe, expect, it } from "@jest/globals";
import fs from "fs";
import path from "path";

// Button labels use Sentence case (SSW Design System writing guide):
// https://design.ssw.com.au/?path=/docs/foundations-writing--docs
//
// Proper nouns keep their capitals, so a full Title Case check would flag
// "Join LinkedIn group" or "Rules to Better AI". Instead this flags common
// words that are only ever capitalised by mistake, e.g. "Read More",
// "Book a Free Initial Meeting", "Contact Us".
const GENERIC_WORDS = new Set([
  "All",
  "Article",
  "Assessment",
  "Book",
  "Case",
  "Channel",
  "Contact",
  "Discussion",
  "Events",
  "Free",
  "Group",
  "Guide",
  "Here",
  "Initial",
  "Learn",
  "Meeting",
  "More",
  "Now",
  "Our",
  "Read",
  "Register",
  "See",
  "Services",
  "Started",
  "Stories",
  "Study",
  "Us",
  "View",
  "Your",
]);

// Fields that hold a button or CTA label in content files.
const LABEL_FIELD =
  /\b(buttonText|btnText|linkText|registerText|ctaLabel)\b["']?\s*[:=]\s*["']?([^"'\n]+)/g;

const CONTENT_DIR = path.join(process.cwd(), "content");

const contentFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return contentFiles(full);
    return /\.(json|mdx?)$/.test(entry.name) ? [full] : [];
  });

export const titleCaseWords = (label: string): string[] => {
  // Rule titles are questions ("Do You Know Why…?") and keep their own casing.
  if (label.trim().endsWith("?")) return [];
  // Words only, so a leading emoji ("👉 Book…") doesn't count as the first word.
  const words = label.match(/[A-Za-z][\w'’.-]*/g) ?? [];
  return words.slice(1).filter((word) => GENERIC_WORDS.has(word));
};

describe("titleCaseWords", () => {
  it.each([
    ["Book a Free Initial Meeting", ["Free", "Initial", "Meeting"]],
    ["Read More", ["More"]],
    ["Contact Us", ["Us"]],
    ["Book a free initial meeting", []],
    ["Join LinkedIn group", []],
    ["Rules to Better AI", []],
    ["Read more", []],
    ["👉 Book a free initial meeting", []],
    ["🔨 Do You Know Why You Should Chinafy Your App?", []],
  ])("%s → %j", (label, words) => {
    expect(titleCaseWords(label)).toEqual(words);
  });
});

describe("content button labels", () => {
  it("use Sentence case", () => {
    const offenders: string[] = [];

    for (const file of contentFiles(CONTENT_DIR)) {
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(LABEL_FIELD)) {
        const label = match[2].trim();
        const words = titleCaseWords(label);
        if (words.length) {
          offenders.push(
            `${path.relative(process.cwd(), file)}: "${label}" (${words.join(", ")})`
          );
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
