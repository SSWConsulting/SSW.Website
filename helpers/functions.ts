export const extractFileName = (filePath: string) =>
  filePath && typeof filePath === "string"
    ? filePath?.split("/").pop().split(".")[0].replace("-", " ")
    : "";
