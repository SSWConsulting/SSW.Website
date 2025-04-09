export const fetchCurrentBranch = async (): Promise<string | undefined> => {
  try {
    const res = await fetch("/api/branch");
    const data = await res.json();
    return data.branch;
  } catch {
    return undefined;
  }
};
