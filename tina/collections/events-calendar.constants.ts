export const HEADER_LAYOUT_OPTIONS = [
  { value: "single", label: "Single tall photo" },
  {
    value: "multi-torso",
    label: "Multiple tall photos, side by side (default)",
  },
  { value: "avatars", label: "Avatar stack" },
  { value: "none", label: "No photo in header" },
] as const;

export type HeaderLayout = (typeof HEADER_LAYOUT_OPTIONS)[number]["value"];

export const DEFAULT_HEADER_LAYOUT: HeaderLayout = "multi-torso";
