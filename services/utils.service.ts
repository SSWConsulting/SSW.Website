/**
 * Imports all JSON files from a given context and returns them as a single object.
 * @param {Object} context - The context object to import JSON files from.
 * @returns {Record<string, unknown>} - An object containing all imported JSON files.
 */
export const importAllJSON = (context): Record<string, unknown> => {
	const jsonData: Record<string, unknown> = {};
	const fileNames: string[] = context.keys();
	const uniqueFileNames: string[] = fileNames.map((fileName) => {
		if (fileName.includes("/")) {
			const segments: string[] = fileName.split("/");
			return segments[segments.length - 1];
		}
		return fileName;
	});

	const distinctFileNames: string[] = uniqueFileNames.filter(
		(fileName, index, arr) => arr.indexOf(fileName) === index
	);

	distinctFileNames.forEach((fileName) => {
		const nameWithoutExtension: string = fileName.replace(".json", "");
		jsonData[nameWithoutExtension] = context(`./${fileName}`);
	});

	return jsonData;
};
