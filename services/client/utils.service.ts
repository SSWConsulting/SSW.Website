/**
 * Removes the extension from a file name and returns the base name.
 * @param file The file name to remove the extension from.
 * @returns The base name of the file without the extension.
 */
export const removeExtension = (file: string) => file.split(".")[0];
