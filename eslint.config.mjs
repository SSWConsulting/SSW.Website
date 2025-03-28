/* eslint-disable import/no-anonymous-default-export */

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import tailwindcss from "eslint-plugin-tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "tina/__generated__",
      "**/.next",
      "**/node_modules",
      "**/dist",
      "**/public",
      "**/content",
      "**/coverage",
      "next.config.mjs",
      "**/*.js",
    ],
  },
  ...compat.extends(
    "eslint:recommended",
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      tailwindcss,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-console": "warn",
      "@next/next/no-duplicate-head": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      quotes: ["error", "double"],
      "tailwindcss/no-arbitrary-value": "error",
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": [
        "error",
        {
          whitelist: [
            "g\\-yt.+",
            "prose-.+",
            "text-3xl/9",
            "legend",
            "dark",
            "shadow-outline",
          ],
        },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ["**/api/**/*.ts", "**/server/**/*.ts"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      tailwindcss,
    },
    rules: {
      "no-console": "off",
      "@next/next/no-duplicate-head": "off",
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
