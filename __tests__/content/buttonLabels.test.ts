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

// Fields that hold a button or CTA label in content files. The value can be a
// JSON string, an MDX attribute in double or single quotes, an MDX attribute
// escaped inside a serialised string (buttonText=\"Read more\"), a JSX string
// expression or a bare YAML value. Each form is read up to its own closing
// delimiter, so an apostrophe ("Let's talk") doesn't cut the label short.
const LABEL_FIELD = new RegExp(
  String.raw`\b(?:buttonText|btnText|linkText|registerText|ctaLabel)\b(?:\\?["'])?\s*[:=]\s*` +
    String.raw`(?:\\"((?:[^"\\\n]|\\(?!"))*)\\"` + // \"escaped\"
    String.raw`|\{?\s*"((?:[^"\\\n]|\\.)*)"` + // "double" or {"jsx"}
    String.raw`|'((?:[^'\\\n]|\\.)*)'` + // 'single'
    String.raw`|([^\s"'\\{][^\n]*))`, // bare YAML value
  "g"
);

const decode = (value: string): string => {
  try {
    return JSON.parse(`"${value}"`);
  } catch {
    return value;
  }
};

export const extractLabels = (text: string): string[] =>
  Array.from(text.matchAll(LABEL_FIELD), (match) =>
    match[1] !== undefined
      ? match[1]
      : match[2] !== undefined
        ? decode(match[2])
        : (match[3] ?? match[4])
  ).map((label) => label.trim());

const CONTENT_DIR = path.join(process.cwd(), "content");

const contentFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return contentFiles(full);
    return /\.(json|mdx?)$/.test(entry.name) ? [full] : [];
  });

// All-caps words are checked too, so "READ MORE" is caught like "Read More".
// "US" is left out, because in capitals it's the country, not "us".
const ACRONYMS = new Set(["US"]);

const asTitleCase = (word: string): string =>
  word.length > 1 && word === word.toUpperCase() && !ACRONYMS.has(word)
    ? word[0] + word.slice(1).toLowerCase()
    : word;

export const titleCaseWords = (label: string): string[] => {
  // Rule titles are questions ("Do You Know Why…?") and keep their own casing.
  if (label.trim().endsWith("?")) return [];
  // Words only, so a leading emoji ("👉 Book…") doesn't count as the first word.
  const words = label.match(/[A-Za-z][\w'’.-]*/g) ?? [];
  return words.slice(1).filter((word) => GENERIC_WORDS.has(asTitleCase(word)));
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
    ["DOWNLOAD THE WHITEPAPER NOW", ["NOW"]],
    ["READ MORE", ["MORE"]],
    ["LOGO OPTIONS", []],
    ["Book a US expert", []],
  ])("%s → %j", (label, words) => {
    expect(titleCaseWords(label)).toEqual(words);
  });
});

describe("extractLabels", () => {
  it.each([
    ['"buttonText": "Let\'s Read More"', ["Let's Read More"]],
    ['"buttonText": "Say \\"Hi\\" Now"', ['Say "Hi" Now']],
    ['<UtilityButton buttonText="Read More" />', ["Read More"]],
    ["<UtilityButton buttonText='Let\"s Go' />", ['Let"s Go']],
    ['<UtilityButton buttonText={"Read More"} />', ["Read More"]],
    ['"body": "<UtilityButton buttonText=\\"Read More\\" />"', ["Read More"]],
    ["buttonText: Let's Read More", ["Let's Read More"]],
  ])("%s → %j", (text, labels) => {
    expect(extractLabels(text)).toEqual(labels);
  });
});

describe("content button labels", () => {
  it("use Sentence case", () => {
    const offenders: string[] = [];

    for (const file of contentFiles(CONTENT_DIR)) {
      const text = fs.readFileSync(file, "utf8");
      for (const label of extractLabels(text)) {
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
