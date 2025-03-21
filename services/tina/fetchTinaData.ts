import { TODAY } from "@/hooks/useFetchEvents";
import { notFound } from "next/navigation";

export enum FileType {
  MDX = "mdx",
  JSON = "json",
}

const cache = new Map();

async function checkCache(cacheKey) {
  return cache.has(cacheKey) ? cache.get(cacheKey) : null;
}

async function cacheData(cacheKey, response) {
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
    const isCI = true; // Custom environment variable for CI builds

    if (isCI) {
      // Perform caching only in the CI pipeline (build time)
      const cacheKey = `${filename}-${TODAY.toISOString()}`;
      const cachedData = await checkCache(cacheKey); // Implement cache check here (e.g., using a memory cache)
      if (cachedData) {
        return cachedData;
      }
    }

    const response = await queryFunction(variables);

    if (isCI) {
      // Cache the response for the build time if in CI pipeline
      const cacheKey = `${filename}-${TODAY.toISOString()}`;
      await cacheData(cacheKey, response); // Implement caching here (e.g., using a memory cache)
    }

    return response;
  } catch {
    notFound();
  }
}
