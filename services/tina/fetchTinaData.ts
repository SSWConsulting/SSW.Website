import { TODAY } from "@/hooks/useFetchEvents";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export enum FileType {
  MDX = "mdx",
  JSON = "json",
}

// Separate function for cookie handling
async function getBranchFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("x-branch")?.value;
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

    // Get the branch from environment variable by default
    let branch = process.env.NEXT_PUBLIC_TINA_BRANCH;

    // Only try to get cookies if we're not in build phase
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      branch = (await getBranchFromCookie()) || branch;
      // eslint-disable-next-line no-console
      console.log("🚀 ~ branch from cookie:", branch);
    }

    // eslint-disable-next-line no-console
    console.log("🚀 ~ final branch:", branch);

    const response = await queryFunction(variables, {
      fetchOptions: {
        headers: {
          "x-branch": branch,
        },
      },
    });

    return response;
  } catch {
    notFound();
  }
}
