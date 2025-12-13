import { getTodayISOString } from "@/services/server/events";
import { notFound } from "next/navigation";

export enum FileType {
  MDX = "mdx",
  JSON = "json",
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
    const date = await getTodayISOString();
    const variables: V = {
      relativePath: filename ? `${filename}.${type}` : "",
      date,
    } as V;

    const response = await queryFunction(variables);

    return response;
  } catch {
    notFound();
  }
}
