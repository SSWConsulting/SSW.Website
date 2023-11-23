import React from "react";

export const MenuItemLink: React.FC<{
  item: { href?: string; name: string };
}> = ({ item }) => {
  return (
    <a
      href={item.href}
      className="unstyled flex items-center justify-center rounded-md px-3 py-1"
    >
      {item.name}
    </a>
  );
};
