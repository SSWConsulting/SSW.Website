const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
module.exports = {
  // mode: "jit",
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "node_modules/ssw.megamenu/**/*.js",
  ],
  // This needs to be set to `class` or it will use OS settings https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  darkMode: "class",
  theme: {
    listStyleType: {
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
      none: "none",
    },
    borderWidth: {
      DEFAULT: "3px",
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      8: "8px",
    },
    extend: {
      gridTemplateRows: {
        12: "repeat(12, minmax(min-content, 0fr))",
      },
      backgroundPosition: {
        "right-bottom-4": "right 1rem bottom 1rem",
      },
      content: {
        bread: "'>'",
      },
      textDecoration: ["active"],
      opacity: {
        7: ".075",
        15: ".15",
      },
      height: {
        22: "5.5rem",
        62: "15.5rem",
        102: "25.5rem",
        112: "28rem",
        172: "43rem",
      },
      width: {
        88: "22rem",
        104: "26rem",
      },
      minHeight: {
        4: "1rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        70: "17.5rem",
        96: "24rem",
        158: "39.5rem",
        1025: "410px",
        "800px": "800px",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "screen-1/2": "50vh",
        "screen-1/3": "33.333333vh",
        "screen-2/3": "66.666667vh",
        "screen-1/4": "25vh",
        "screen-2/4": "50vh",
        "screen-3/4": "75vh",
        "screen-1/5": "20vh",
        "screen-2/5": "40vh",
        "screen-3/5": "60vh",
        "screen-4/5": "80vh",
        "screen-1/6": "16.666667vh",
        "screen-2/6": "33.333333vh",
        "screen-3/6": "50vh",
        "screen-4/6": "66.666667vh",
        "screen-5/6": "83.333333vh",
      },
      maxWidth: {
        "8xl": "83rem",
        "9xl": "86rem",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
      },
      spacing: {
        0.25: "0.0625rem",
        0.75: "0.1875rem",
        15: "60px",
        17: "4.25rem",
        25: "100px",
        70: "17.5rem",
        128: "32rem",
        150: "40rem",
        liveStream: "75px",
      },
      padding: {
        "9/16": "56.25%",
      },
      zIndexStack: [
        "base",
        "bgVideo",
        "videoMask",
        "content",
        "badge",
        "videoThumbnail",
        "tooltip",
      ], // ordered by z-index ascendant
      fontFamily: {
        sans: [
          "var(--open-sans-font)",
          "Helvetica Neue",
          "Helvetica",
          "sans-serif",
        ],
        helvetica: ["Helvetica Neue", "Helvetica", "sans-serif"],
        body: [
          "var(--open-sans-font)",
          "Helvetica Neue",
          "Helvetica",
          "sans-serif",
        ],
      },
      fontSize: {
        xxs: ["0.65rem", { lineHeight: "1rem" }],
      },
      animation: {
        "more-bounce": "more-bounce 2s infinite",
        "badge-bounce-up":
          "badge-bounce-up var(--animate-duration, 3s) infinite",
        "badge-bounce-down":
          "badge-bounce-down var(--animate-duration, 3s) infinite",
        ripple: "ripple-out 0.75s",
        "ripple-pseudo": "ripple-out-pseudo 0.75s",
      },
      keyframes: {
        "more-bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-30px)" },
          "60%": { transform: "translateY(-15px)" },
        },
        "badge-bounce-up": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "badge-bounce-down": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        "ripple-out": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "ripple-out-pseudo": {
          "0%": { background: "rgba(0, 0, 0, 0.25)" },
          "100%": { background: "transparent" },
        },
      },
      colors: {
        teal: colors.cyan,
        green: colors.emerald,
        red: {
          ...colors.rose,
          550: "#dc3545",
        },
        gray: {
          25: "#e9e9e9",
          50: "#f9f9f9",
          75: "#f5f5f5",
          100: "#f2f2f2",
          125: "#eeeeee",
          200: "#dfdfdf",
          300: "#cccccc",
          400: "#a6a6a6",
          450: "#9e9e9e",
          500: "#808080",
          550: "#6C757D",
          600: "#737373",
          650: "#666666",
          700: "#606060",
          800: "#414141",
          900: "#333333",
          1000: "#1c1b2e",
        },
        platform: {
          angular: "#DD0031",
          dotnet: "#5C2D91",
          visualstudio: "#9455CE",
          blazor: "#5C2D91",
          xamarin: "#3498DB",
          azure: "#0088D5",
          sharepoint: "#038185",
          powerbi: "#F2C811",
        },
        social: {
          phone: "#b31217",
          youtube: "#b31217",
          linkedin: "#0077b5",
          facebook: "#3b5998",
          xtwitter: "#000",
          tiktok: "#000",
          github: "#fff",
          meetup: "#f05664",
        },
        sswRed: "#cc4141",
        sswDarkRed: "#8e2c2c",
        sswBlack: "#333333",
        azure: "#007fff",
        ssw: {
          red: {
            DEFAULT: "#cc4141",
            light: "#d26e6e",
          },
          darkRed: "#8e2c2c",
          black: "#333333",
          gray: { DEFAULT: "#797979", dark: "#666666", light: "#AAAAAA" },
        },
        aspect: {
          carousel: "1080/388",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.sswBlack"),
            h1: {
              "> strong": {
                color: theme("colors.sswRed"),
              },
              fontWeight: "500",
            },
            h2: {
              fontWeight: "500",
              color: theme("colors.sswRed"),
            },
            h3: {
              fontWeight: "500",
            },
            h4: {
              fontWeight: "500",
            },
            hr: {
              marginTop: "1em",
              marginBottom: "1.5em",
            },
            a: {
              textDecorationColor: "#aaa",
              textDecorationStyle: "solid",
              textDecorationThickness: "1px",
            },
            ul: {
              listStyleType: "square",
            },
            pre: {
              color: theme("colors.gray.700"),
              backgroundColor: theme("colors.gray.100"),
            },
            "--tw-prose-bullets": "var(--tw-prose-body)",
          },
        },
        dark: {
          css: {
            h1: {
              "> strong": {
                color: theme("colors.sswRed"),
              },
            },
            ul: {
              listStyleType: "square",
            },
            "p, ul": {
              paddingTop: "0.5em",
              paddingBottom: "0.6em",
              fontWeight: theme("fontWeight.light"),
              fontSize: "1.125rem",
            },
            "ul > li": {
              display: "list-item",
              margin: "1.5rem 0",
              listStyle: "inside",
              listStyleType: "square",
              "> div": {
                display: "inline",
              },
            },
            "ol > li": {
              display: "list-item",
              margin: "2rem 0",
              listStyle: "inside",
              listStyleType: "decimal",
              "> div": {
                display: "inline",
              },
            },
          },
        },
        opportunity: {
          css: {
            "ul > li > *:last-child": {
              marginBottom: "0",
              marginTop: "0",
            },
          },
        },
      }),
      backgroundImage: {
        done: "url('/images/icons/done.png')",
        "arrow-right": "url('/images/icons/arrow-right.png')",
        "live-banner-wait": "url('/blocks/LiveStreamBanner-Wait.png')",
        "live-banner-live": "url('/blocks/LiveStreamBanner-Live.gif')",
        "card-video": "url('/images/icons/video-icon.svg')",
        "card-blog": "url('/images/icons/blog-post.svg')",
        benefits: "url('/consulting/mvc-benefits-bg.jpg')",
        "video-mask": "url('/images/video-mask.png')",
        polygons: "url('/images/background/polygonBackground.png')",
        subscribeBackground: "url('/images/thumbs/subscribeBackground.png')",
        arcBackground: "url('/images/background/arcBackground.png')",
        waveBackground: "url('/images/background/waveBackground.svg')",
      },
    },
    linearGradientColors: {
      "social-instagram": [
        "#f09433",
        "#e6683c 25%",
        "#dc2743 50%",
        "#cc2366 75%",
        "#bc1888",
      ],
    },
  },
  variants: {
    // extend: { typography: ["tint", "dark", "primary"] },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-gradients"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),

    // Use flex-basis with gap
    plugin(function ({ matchUtilities, theme }) {
      const values = {};
      Object.entries(theme("flexBasis")).forEach(([basis, basisValue]) => {
        Object.entries(theme("gap")).forEach(([gap, gapValue]) => {
          values[`${basis}-${gap}`] = `${basisValue} ${gapValue}`;
        });
      });

      matchUtilities(
        {
          basis_gap: (value) => ({
            flexBasis: `calc(${value.split(" ")[0]} - ${value.split(" ")[1]})`,
          }),
        },
        {
          values: values,
        }
      );
    }),

    // taken from https://github.com/tailwindlabs/tailwindcss/discussions/2156#discussioncomment-1283105
    plugin(function ({ addVariant, e }) {
      addVariant("not-first", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`not-first${separator}${className}`)}:not(:first-child)`;
        });
      });
    }),

    plugin(function ({ addVariant }) {
      const alias_list = Object.entries({
        ">": ["children", "child"],
        " ": ["heir", "descendant"],
        "~": ["sibling", "twin"],
      });

      // list of elements from https://developer.mozilla.org/en-US/docs/Web/HTML/Element
      const elements = [
        // general selector
        "",

        // content
        "address",
        "article",
        "aside",
        "footer",
        "header",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "main",
        "nav",
        "section",

        // Text content
        "blockquote",
        "dd",
        "div",
        "dl",
        "dt",
        "figcaption",
        "figure",
        "hr",
        "li",
        "menu",
        "ol",
        "p",
        "pre",
        "ul",

        // Inline text semantics
        "a",
        "abbr",
        "b",
        "bdi",
        "bdo",
        "br",
        "cite",
        "code",
        "data",
        "dfn",
        "em",
        "i",
        "kbd",
        "mark",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "small",
        "span",
        "strong",
        "sub",
        "sup",
        "time",
        "u",
        "var",
        "wbr",

        // Image and multimedia
        "area",
        "audio",
        "img",
        "map",
        "track",
        "video",

        // Embedded content
        "embed",
        "iframe",
        "object",
        "param",
        "picture",
        "portal",
        "source",

        // SVG and MathML
        "svg",
        "math",

        // Tables
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ];

      let variants = elements.flatMap((element) =>
        alias_list.flatMap(([selector, aliases]) =>
          aliases.map((alias) => {
            // eg. element == 'div', selector == ':where(&) >' alias == 'child'

            const variant = alias + (element ? `-${element}` : "");
            const base = `:where(&) ${selector} ${element}:where(:not(.not-${variant}))`;
            const added = {
              "~": `:where(&:not(.not-${variant}))`,
              " ": `:where(&) ${selector} :where(:not(.not-${variant})) ${element}`,
            }[selector];

            return [variant, added ? [base, added] : base];
          })
        )
      );

      variants.forEach((v) => addVariant(...v));
    }),

    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          z: (value) => ({
            zIndex: value,
          }),
        },
        {
          values: Object.keys(theme("zIndexStack")).reduce((ret, key) => {
            ret[theme("zIndexStack")[key]] = key;
            return ret;
          }, {}),
        }
      );
    }),
  ],
};
