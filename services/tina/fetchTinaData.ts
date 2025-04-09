import { TODAY } from "@/hooks/useFetchEvents";
import { notFound } from "next/navigation";
import { fetchCurrentBranch } from "./fetchCurrentBranch";

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

    // Use provided branch or fallback to environment variable
    const finalBranch =
      (await fetchCurrentBranch()) || process.env.NEXT_PUBLIC_TINA_BRANCH;

    // eslint-disable-next-line no-console
    console.log("🚀 ~ final branch:", finalBranch);

    const response = await queryFunction(variables, {
      fetchOptions: {
        headers: {
          "x-branch": finalBranch,
        },
      },
    });

    return response;
  } catch {
    notFound();
  }
}
