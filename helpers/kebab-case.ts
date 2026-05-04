export const toKebabCase = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/g, "-")
    .replaceAll(/[^a-zA-Z0-9-]/g, "");
};
