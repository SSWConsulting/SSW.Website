import { TODAY } from "@/hooks/useFetchEvents";
import { notFound } from "next/navigation";

export enum FileType {
  MDX = "mdx",
  JSON = "json",
}

const cache = new Map();

async function checkCache(cacheKey: string) {
  return cache.has(cacheKey) ? cache.get(cacheKey) : null;
}

async function cacheData(cacheKey: string, response: unknown) {
  cache.set(cacheKey, response);
}

export async function fetchTinaData<T, V>(
  queryFunction: (
    variables?: V,
    options?: unknown
  ) => Promise<{
    data: T;
    variables: V;
    query: string;
  }>,
  filename?: string,
  type: FileType = FileType.MDX
): Promise<{ data: T; variables: V; query: string }> {
  try {
    const variables: V = {
      relativePath: filename ? `${filename}.${type}` : "",
      date: TODAY.toISOString(),
    } as V;

    // Check if we're in the pipeline (CI environment)
    const isCI = true; // Assuming you have a way to check this, e.g., process.env.IS_CI_BUILD === "true"

    // Generate a unique cache key based on queryFunction name and the filename
    const cacheKey = `${queryFunction.name}-${filename}-${JSON.stringify(variables)}`;

    if (isCI) {
      // Perform caching only in the CI pipeline (build time)
      const cachedData = await checkCache(cacheKey); // Check if data is already cached
      if (cachedData) {
        // eslint-disable-next-line no-console
        console.log("🚀 ~ ooho! I'm served from Cache:");

        return cachedData;
      }
    }

    // Execute the query function and get the response
    const response = await queryFunction(variables);

    if (isCI) {
      // Cache the response for the build time if in CI pipeline
      await cacheData(cacheKey, response); // Cache the response based on the function name, filename, and variables
    }

    return response;
  } catch {
    notFound();
  }
}
