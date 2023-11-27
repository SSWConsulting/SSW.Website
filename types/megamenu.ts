import { iconMap } from "../components/megamenu/MegaIcon/mega-icon";

export const availableWidgets = [
  "standardLink",
  "featured",
  "bookNow",
] as const;

export type AvailableIcons = keyof typeof iconMap;
export type AvailableWidgets = (typeof availableWidgets)[number];

export interface NavMenuGroup {
  name: string;
  url?: string;
  menuColumns?: NavMenuColumn[];
  sidebarItems?: SidebarItem[];
  viewAll?: {
    name: string;
    url: string;
  };
}

export interface NavMenuColumn {
  menuColumnGroups: {
    name: string;
    menuItems: {
      name: string;
      url: string;
      description?: string;
      icon?: AvailableIcons;
      iconImg?: string;
    }[];
  }[];
}

export interface SidebarItem {
  name: string;
  items: {
    name: string;
    url: string;
    description?: string;
    widgetType: AvailableWidgets;
    // TODO: Fix
    icon?: AvailableIcons;
  }[];
}
