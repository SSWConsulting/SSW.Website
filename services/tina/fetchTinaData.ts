import { TODAY } from "@/hooks/useFetchEvents";
import { cookies } from "next/headers";
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
    const variables: V = {
      relativePath: filename ? `${filename}.${type}` : "",
      date: TODAY.toISOString(),
    } as V;

    const cookieStore = await cookies();
    const response = await queryFunction(variables, {
      fetchOptions: {
        headers: {
          /* Retrieve the active branch from cookie */
          "x-branch": cookieStore.get("x-branch")?.value,
        },
      },
    });

    return response;
  } catch {
    notFound();
  }
}
