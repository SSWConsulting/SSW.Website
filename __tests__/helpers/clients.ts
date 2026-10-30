import { describe, expect, it } from "@jest/globals";
import type { ClientDisplay } from "@/helpers/clientTypes";
import {
  clientIndustries,
  clientIndustryOptions,
  clientTags,
  findClientStory,
  findVideo,
  headingId,
  logoBox,
  matchesClientFilters,
  orderClients,
  relatedClientStories,
  storyHeadings,
  storyText,
} from "@/helpers/clients";

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

describe("clientIndustryOptions", () => {
  it("sorts by descending count, then alphabetically, without reordering categories", () => {
    const categories = ["Mining", "Technology", "Health", "Education"];
    const clients = [
      client("A", { categories: industries("Technology", "Health") }),
      client("B", { categories: industries("Technology", "Education") }),
      client("C", { categories: industries("Health") }),
    ];

    const options = clientIndustryOptions(clients, categories);

    expect(options).toEqual([
      { label: "Health", count: 2 },
      { label: "Technology", count: 2 },
      { label: "Education", count: 1 },
      { label: "Mining", count: 0 },
    ]);
    expect(categories).toEqual(["Mining", "Technology", "Health", "Education"]);
    expect(
      clients
        .filter((c) => matchesClientFilters(c, { industry: options[0].label }))
        .map((c) => c.name)
    ).toEqual(["A", "C"]);
  });
});

describe("clientTags", () => {
  it("lists the industries, then the service, without duplicates", () => {
    const tags = clientTags(
      client("A", {
        service: "Web development",
        categories: industries("Health", "Health", "Education"),
      })
    );
    expect(tags).toEqual(["Health", "Education", "Web development"]);
  });

  it("skips a missing service", () => {
    expect(
      clientTags(client("A", { categories: industries("Mining") }))
    ).toEqual(["Mining"]);
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
    service: "Cloud & DevOps",
    categories: industries("Health", "Insurance"),
  });
  const matches = (filters: Parameters<typeof matchesClientFilters>[1]) =>
    matchesClientFilters(medibank, filters);

  it("matches everything when no filter is set", () => {
    expect(matches({})).toBe(true);
  });

  it("filters by industry", () => {
    expect(matches({ industry: "Insurance" })).toBe(true);
    expect(matches({ industry: "Mining" })).toBe(false);
  });

  it("filters by service", () => {
    expect(matches({ service: "Cloud & DevOps" })).toBe(true);
    expect(matches({ service: "Web development" })).toBe(false);
  });

  it("requires every active filter to match", () => {
    expect(matches({ industry: "Health", service: "Cloud & DevOps" })).toBe(
      true
    );
    expect(matches({ industry: "Health", service: "Web development" })).toBe(
      false
    );
  });
});

describe("logoBox", () => {
  const area = (ratio: number) => {
    const { width, height } = logoBox(ratio);
    return parseFloat(width) * parseFloat(height);
  };

  it("gives wide and square logos the same visual area", () => {
    expect(area(1)).toBeCloseTo(area(3), 5);
    expect(area(0.8)).toBeCloseTo(area(1), 5);
  });

  it("caps very wide and very tall logos", () => {
    expect(parseFloat(logoBox(20).width)).toBeCloseTo(55, 5);
    expect(parseFloat(logoBox(0.2).height)).toBeCloseTo(45, 5);
  });

  it("falls back to a 2:1 box before the image's ratio is known", () => {
    expect(logoBox(undefined)).toEqual(logoBox(2));
    expect(logoBox(NaN)).toEqual(logoBox(2));
  });
});

describe("findClientStory", () => {
  const clients = [
    client("FPE", {
      caseStudyUrl: "https://www.ssw.com.au/company/clients/fpe",
    }),
    client("Toll", { caseStudyUrl: "/company/clients/toll/" }),
    client("Logo only"),
  ];

  it("matches absolute URLs and site paths by path", () => {
    expect(findClientStory(clients, "fpe")?.name).toBe("FPE");
    expect(findClientStory(clients, "toll")?.name).toBe("Toll");
  });

  it("returns null when no client links to the page", () => {
    expect(findClientStory(clients, "missing")).toBeNull();
  });
});

describe("relatedClientStories", () => {
  const url = (slug: string) => `/company/clients/${slug}`;
  const clients = [
    client("Current", {
      caseStudyUrl: url("current"),
      service: "AI development",
      categories: industries("Finance"),
    }),
    client("No case study", { service: "AI development" }),
    client("Other", { caseStudyUrl: url("other") }),
    client("Same industry", {
      caseStudyUrl: url("same-industry"),
      categories: industries("Finance"),
    }),
    client("Same service", {
      caseStudyUrl: url("same-service"),
      service: "AI development",
    }),
    client("Pinned", { caseStudyUrl: url("pinned"), featured: true }),
  ];

  it("ranks other case studies by service, then industry, then pin", () => {
    expect(relatedClientStories(clients, "current").map((c) => c.name)).toEqual(
      ["Same service", "Same industry", "Pinned"]
    );
  });

  it("falls back to Tina order when the page has no client entry", () => {
    expect(
      relatedClientStories(clients, "unlisted", 2).map((c) => c.name)
    ).toEqual(["Pinned", "Current"]);
  });
});

describe("storyHeadings", () => {
  it("lists the top-level h2s with ids taken from their text", () => {
    const content = story(
      { type: "h2", children: [{ type: "text", text: "The Challenge " }] },
      p("Body"),
      { type: "h3", children: [{ type: "text", text: "Skipped" }] },
      {
        type: "h2",
        children: [{ type: "text", text: "We make complicated things simple" }],
      }
    );
    expect(storyHeadings(content)).toEqual([
      { id: "the-challenge", text: "The Challenge" },
      {
        id: "we-make-complicated-things-simple",
        text: "We make complicated things simple",
      },
    ]);
  });

  it("strips accents and punctuation from ids", () => {
    expect(headingId("Résultats & “Next” steps!")).toBe("resultats-next-steps");
  });
});
