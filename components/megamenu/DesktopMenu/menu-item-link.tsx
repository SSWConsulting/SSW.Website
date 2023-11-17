import Link from "next/link";
import React from "react";

type MenuItemLinkProps = {
  item: { href?: string; name: string };
};

export const MenuItemLink = ({ item }: MenuItemLinkProps) => {
  return (
    <Link
      href={item.href}
      className="unstyled flex items-center justify-center rounded-md px-3 py-1"
    >
      {item.name}
    </Link>
  );
};
