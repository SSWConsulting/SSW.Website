import { execSync } from "child_process";

describe("Content filenames", () => {
  it("should not contain uppercase characters", () => {
    const files = execSync("find content -type f", { encoding: "utf-8" })
      .trim()
      .split("\n")
      .filter(Boolean);

    const uppercaseFiles = files.filter((filePath) => {
      const filename = filePath.split("/").pop()!;
      return filename !== filename.toLowerCase();
    });

    if (uppercaseFiles.length > 0) {
      fail(
        `Found ${uppercaseFiles.length} content file(s) with uppercase characters in their filename:\n` +
          uppercaseFiles.map((f) => `  - ${f}`).join("\n") +
          "\n\nContent filenames must be lowercase kebab-case. " +
          "Rename them to lowercase and update any references."
      );
    }
  });
});
