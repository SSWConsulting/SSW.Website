const colors = require("tailwindcss/colors");
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      teal: colors.cyan,
      green: colors.emerald,
      red: colors.rose,
      purple: colors.purple,
      pink: colors.pink,
      yellow: colors.yellow,
      sswRed: "#cc4141",
      azure: "#007fff",
      gray: {
        50: "#f9f9f9",
        100: "#f2f2f2",
        200: "#dfdfdf",
        300: "#cccccc",
        400: "#a6a6a6",
        500: "#808080",
        600: "#737373",
        700: "#606060",
        800: "#414141",
        900: "#333333",
        1000: "#1c1b2e",
      },
      blue: {
        50: "#DCEEFF",
        100: "#B4DBFF",
        200: "#85C5FE",
        300: "#4EABFE",
        400: "#2296fe",
        500: "#0084FF",
        600: "#0574e4",
        700: "#0D5DBD",
        800: "#144696",
        900: "#1D2C6C",
        1000: "#241748",
      },
      orange: {
        200: "#EB7752",
        300: "#EA6C45",
        400: "#E85C30",
        500: "#EC4815",
        600: "#DC4419",
        700: "#D04017",
        800: "#C1360F",
      },
    },
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1500px",
      "2xl": "1800px",
    },
    fontSize: {
      xxs: ".625rem",
      xs: ".875rem",
      sm: "1rem",
      base: "1.125rem",
      md: "1.2rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "1.75rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3.25rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
    },
    borderWidth: {
      DEFAULT: "3px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
    },
    minHeight: {
      158: "39.5rem",
      1025: "410px",
    },
    extend: {
      textDecoration: ["active"],
      opacity: {
        7: ".075",
        15: ".15",
      },
      height: {
        22: "5.5rem",
      },
      width: {
        88: "22rem",
      },
      maxWidth: {
        "8xl": "83rem",
        "9xl": "86rem",
      },
      spacing: {
        15: "60px",
        25: "100px",
        128: "32rem",
        liveStream: "75px",
      },
      zIndex: {
        "-100": "-100",
        "-1": "-1",
      },
      fontFamily: {
        sans: ["Open Sans", "Helvetica Neue", "Helvetica", "sans-serif"],
        body: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
      },
      animation: {
        "more-bounce": "more-bounce 2s infinite",
        "ripple": "ripple-out 0.75s",
        "ripple-pseudo": "ripple-out-pseudo 0.75s",
      },
      keyframes: {
        "more-bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-30px)" },
          "60%": { transform: "translateY(-15px)" },
        },
        "ripple-out": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "ripple-out-pseudo": {
          "0%": { background: "rgba(0, 0, 0, 0.25)" },
          "100%": { background: "transparent" },
        }
      },
      colors: {
        gray: {
          75: "#f5f5f5", 
          125: "#eeeeee", 
          450: "#9e9e9e", 
          550: "#6C757D", 
        },
        red: {
          550: "#dc3545",
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              color: theme("colors.gray.700"),
              backgroundColor: theme("colors.gray.100"),
              lineHeight: 1.5,
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              padding: "0.25rem",
              borderRadius: "3px",
              margin: "-0.25rem 1px",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        tint: {
          css: {
            pre: {
              color: theme("colors.gray.800"),
              backgroundColor: theme("colors.gray.150"),
            },
          },
        },
        lg: {
          css: {
            pre: {
              lineHeight: 1.5,
            },
            "p:first-of-type": {
              fontSize: "1.365rem",
            },
          },
        },
        xl: {
          css: {
            pre: {
              lineHeight: 1.5,
            },
            "p:first-of-type": {
              fontSize: "1.365rem",
            },
          },
        },
        consulting: {
          css: {
            h1: {
              fontSize: "3.28rem",
              margin: "1rem 0",
              padding: "60px 0 20px 0",
              lineHeight: 1.2,
              fontWeight: theme("fontWeight.light"),
              "> strong": {
                color: theme("colors.sswRed"),
              },
            },
            "p, ul": {
              fontSize: "1.2rem",
              fontWeight: theme("fontWeight.light"),
              margin: "0 auto",
              padding: "20px 0",
              width: "75%",
            },
            "ul > li": {
              display: "block",
              fontWeight: theme("fontWeight.bold"),
              margin: "2em 3rem 0 3rem",
              "> div::before": {
                color: theme("colors.sswRed"),
                content: '"\u25A0"',
                display: "inline-block",
                fontFamily: "Arial Black",
                fontWeight: theme("fontWeight.bold"),
                marginLeft: "-1em",
                width: "1em",
              },
            },
          },
        },
      }),
      backgroundImage: {
        "live-banner-wait": "url('/blocks/LiveStreamBanner-Wait.png')",
        "live-banner-live": "url('/blocks/LiveStreamBanner-Live.gif')",
        benefits: "url('/consulting/mvc-benefits-bg.jpg')",
      },
    },
  },
  variants: {
    extend: { typography: ["tint", "dark", "primary"] },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { fontSize: "14px", fontFamily: theme("fontFamily.body") },
      });
    }),
  ],
};
