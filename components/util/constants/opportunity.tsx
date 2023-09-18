export const locations = [
  "Sydney",
  "Brisbane",
  "Melbourne",
  "Newcastle",
  "France",
  "China",
] as const;
export type Locations = (typeof locations)[number][];

export const employmentType = [
  "Contract",
  "Permanent",
  "Work Experience",
] as const;
export type EmploymentType = (typeof employmentType)[number];

export const jobStatus = ["Available", "Filled"] as const;
export type JobStatus = (typeof jobStatus)[number];
