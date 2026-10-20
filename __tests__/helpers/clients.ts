import type { ClientDisplay } from "@/components/company/clientList";
import {
  clientIndustries,
  clientSearchText,
  findVideo,
  matchesClientFilters,
  orderClients,
  storyText,
} from "@/helpers/clients";

// A Tina rich-text tree in the shape the CMS stores a client's story.
const story = (...children: unknown[]) =>
  ({ type: "root", children }) as unknown as ClientDisplay["content"];
const p = (...text: string[]) => ({
  type: "p",
  children: text.map((t) => ({ type: "text", text: t })),
});
const videoEmbed = (url: string, extra: Record<string, string> = {}) => ({
  type: "mdxJsxFlowElement",
  name: "VideoEmbed",
  props: { url, ...extra },
  children: [{ type: "text", text: "" }],
});

const client = (
  name: string,
  extra: Partial<ClientDisplay> = {}
): ClientDisplay => ({
  name,
  content: story(p(`${name} story.`)),
  categories: [],
  ...extra,
});
const industries = (...names: string[]) =>
  names.map((name) => ({ category: { name } })) as ClientDisplay["categories"];

describe("storyText", () => {
  it("joins the story's text and collapses whitespace", () => {
    expect(
      storyText(story(p("Payroll ", " in France."), p("\nAnswered\n fast.")))
    ).toBe("Payroll in France. Answered fast.");
  });

  it("drops embedded components, which carry no text", () => {
    expect(
      storyText(story(p("Before."), videoEmbed("https://youtu.be/abc")))
    ).toBe("Before.");
  });

  it("returns an empty string for missing content", () => {
    expect(storyText(undefined)).toBe("");
  });
});

describe("clientIndustries", () => {
  it("lists category names and skips empty references", () => {
    const categories = [
      { category: { name: "Health" } },
      { category: null },
      {},
      { category: { name: "Education" } },
    ] as unknown as ClientDisplay["categories"];
    expect(clientIndustries(client("A", { categories }))).toEqual([
      "Health",
      "Education",
    ]);
  });

  it("copes with a client that has no categories", () => {
    expect(clientIndustries(client("A", { categories: undefined }))).toEqual(
      []
    );
  });
});

describe("findVideo", () => {
  it("finds the first YouTube VideoEmbed, nested or not", () => {
    const content = story(
      p("Intro."),
      {
        type: "blockquote",
        children: [
          videoEmbed("https://www.youtube.com/watch?v=YlsbPEvVyq4", {
            caption: "AI for FPE",
            duration: "5 min",
          }),
        ],
      },
      videoEmbed("https://www.youtube.com/watch?v=second00000")
    );
    expect(findVideo(content)).toEqual({
      id: "YlsbPEvVyq4",
      caption: "AI for FPE",
      duration: "5 min",
    });
  });

  it("skips embeds that aren't a single YouTube video", () => {
    const content = story(
      videoEmbed("https://vimeo.com/123456"),
      videoEmbed(
        "https://www.youtube.com/playlist?list=PLIzW_0dAIKv3mjBeK8eyJbe1bOGWJX_UV"
      ),
      { type: "mdxJsxFlowElement", name: "UtilityButton", props: {} },
      p("No video here.")
    );
    expect(findVideo(content)).toBeNull();
  });

  it("returns null for missing content", () => {
    expect(findVideo(undefined)).toBeNull();
  });
});

describe("orderClients", () => {
  it("puts pinned clients first and keeps the Tina order within each group", () => {
    const ordered = orderClients([
      client("A"),
      client("B", { featured: true }),
      client("C"),
      client("D", { featured: true }),
    ]);
    expect(ordered.map((c) => c.name)).toEqual(["B", "D", "A", "C"]);
  });

  it("does not reorder the array it was given", () => {
    const clients = [client("A"), client("B", { featured: true })];
    orderClients(clients);
    expect(clients.map((c) => c.name)).toEqual(["A", "B"]);
  });
});

describe("matchesClientFilters", () => {
  const medibank = client("Medibank", {
    headline: "Helping development teams deliver sooner.",
    service: "Cloud & DevOps",
    categories: industries("Health", "Insurance"),
    content: story(p("Automating a release process.")),
  });
  const matches = (filters: Parameters<typeof matchesClientFilters>[2]) =>
    matchesClientFilters(medibank, clientSearchText(medibank), filters);

  it("matches everything when no filter is set", () => {
    expect(matches({})).toBe(true);
    expect(matches({ query: "   " })).toBe(true);
  });

  it("filters by industry", () => {
    expect(matches({ industry: "Insurance" })).toBe(true);
    expect(matches({ industry: "Mining" })).toBe(false);
  });

  it("filters by service", () => {
    expect(matches({ service: "Cloud & DevOps" })).toBe(true);
    expect(matches({ service: "Web development" })).toBe(false);
  });

  it("searches the name, headline, service, industries and story, ignoring case", () => {
    expect(matches({ query: "medibank" })).toBe(true);
    expect(matches({ query: "DELIVER SOONER" })).toBe(true);
    expect(matches({ query: "devops" })).toBe(true);
    expect(matches({ query: "insurance" })).toBe(true);
    expect(matches({ query: " release process " })).toBe(true);
    expect(matches({ query: "payroll" })).toBe(false);
  });

  it("requires every active filter to match", () => {
    expect(
      matches({
        industry: "Health",
        service: "Cloud & DevOps",
        query: "release",
      })
    ).toBe(true);
    expect(
      matches({
        industry: "Health",
        service: "Web development",
        query: "release",
      })
    ).toBe(false);
  });
});
