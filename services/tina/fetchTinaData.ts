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
): Promise<{
  data: T;
  variables: V;
  query: string;
}> {
  try {
    const cookieStore = await cookies();
    const variables: V = {
      relativePath: filename ? `${filename}.${type}` : "",
      date: TODAY.toISOString(),
      fetchOptions: {
        headers: {
          "x-branch": cookieStore.get("x-branch")?.value,
        },
      },
    } as V;

    const response = await queryFunction(variables);

    return response;
  } catch {
    notFound();
  }
}
