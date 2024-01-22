export const extractFileName = (filePath: string) =>
  filePath ? filePath.split("/").pop().split(".")[0].replace("-", " ") : "";
