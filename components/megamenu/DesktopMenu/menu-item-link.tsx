import Link from "next/link";
import React from "react";

export const MenuItemLink: React.FC<{
  item: { href?: string; name: string };
}> = ({ item }) => {
  return (
    <Link
      href={item.href}
      // eslint-disable-next-line tailwindcss/no-arbitrary-value
      className="unstyled flex items-center justify-center rounded-md px-3 py-1 text-sm font-semibold text-gray-900 outline-none hover:bg-gray-100 lg:min-w-[80px]"
    >
      {item.name}
    </Link>
  );
};
