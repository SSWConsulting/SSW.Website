import { TODAY } from "@/hooks/useFetchEvents";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

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
    fetchOptions?: {
      headers: {
        "x-branch": string;
      };
    };
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
          "x-branch": cookieStore.get("x-branch")?.value,
        },
      },
    });

    return response;
  } catch {
    notFound();
  }
}
