// Source of truth for the platform swatches: tailwind.config.js turns these into
// the `bg-platform-*` utilities (and safelists them), and the ColorPalette block
// renders the list. It lives here rather than in tailwind.config.js so importing
// it from a component doesn't drag the Tailwind plugins into the browser bundle.
export const platform = [
  {
    name: "angular",
    text: "Angular",
    color: "#DD0031",
  },
  {
    name: "dotnet",
    text: ".NET",
    color: "#5C2D91",
  },
  {
    name: "visualstudio",
    text: "Visual Studio",
    color: "#9455CE",
  },
  {
    name: "blazor",
    text: "Blazor",
    color: "#5C2D91",
  },
  {
    name: "xamarin",
    text: "Xamarin",
    color: "#3498DB",
  },
  {
    name: "azure",
    text: "Azure",
    color: "#0088D5",
  },
  {
    name: "sharepoint",
    text: "SharePoint",
    color: "#038185",
  },
  {
    name: "powerbi",
    text: "PowerBI",
    color: "#F2C811",
  },
  {
    name: "tina",
    text: "TinaCMS",
    color: "#EC4815",
  },
];
