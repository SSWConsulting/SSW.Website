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
  sidebarItems?: Sidebar[];
  viewAll?: ViewAll;
}

export interface NavMenuColumn {
  menuColumnGroups?: NavMenuColumnGroup[];
}

export interface NavMenuColumnGroup {
  name: string;
  menuItems?: NavMenuColumnGroupItem[];
}

export interface NavMenuColumnGroupItem {
  name: string;
  url: string;
  description?: string;
  icon?: AvailableIcons | string;
  iconImg?: string;
}

export interface Sidebar {
  name: string;
  items?: SidebarItem[];
}

export interface SidebarItem {
  name: string;
  url: string;
  description?: string;
  widgetType?: AvailableWidgets | string;
  icon?: AvailableIcons | string;
}

export interface ViewAll {
  name: string;
  url: string;
}
