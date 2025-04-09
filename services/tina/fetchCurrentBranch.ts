export const fetchCurrentBranch = async (): Promise<string | undefined> => {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    // During build, return a default value
    return process.env.NEXT_PUBLIC_TINA_BRANCH;
  }

  try {
    const res = await fetch("/api/branch");
    const data = await res.json();
    return data.branch;
  } catch {
    return process.env.NEXT_PUBLIC_TINA_BRANCH;
  }
};
