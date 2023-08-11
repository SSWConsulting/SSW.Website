export const svgLayout = [
  {
    size: 35,
    cx: 35,
    cy: 140,
    rotate: -11,
  },
  {
    size: 25,
    cx: 114,
    cy: 207,
    rotate: -8.5,
  },
  {
    size: 43,
    cx: 190,
    cy: 135,
    rotate: -5,
  },
  {
    size: 30,
    cx: 291,
    cy: 215,
    rotate: 0,
  },
  {
    size: 34,
    cx: 320,
    cy: 80,
    rotate: 0,
  },
  {
    size: 31,
    cx: 406,
    cy: 183,
    rotate: 19.5,
  },
  {
    size: 41,
    cx: 478,
    cy: 60,
    rotate: 0,
  },
  {
    size: 38,
    cx: 547,
    cy: 208,
    rotate: 0,
  },
  {
    size: 29,
    cx: 625,
    cy: 119,
    rotate: 0,
  },
  {
    size: 29,
    cx: 689,
    cy: 46,
    rotate: 0,
  },
  {
    size: 29,
    cx: 737,
    cy: 163,
    rotate: -12,
  },
];

export const divLayout = Object.values(svgLayout).map((item) => {
  return {
    size: item.size * 2,
    left: item.cx - item.size,
    top: item.cy - item.size,
    rotate: item.rotate,
  };
});
