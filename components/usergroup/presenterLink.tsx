import Link from "next/link";

export type PresenterLinkProps = {
  name: string;
  profileLink?: string;
};

export const PresenterLink = ({
  name,
  profileLink = "/",
}: PresenterLinkProps) => {
  return <Link href={profileLink}>{name}</Link>;
};
