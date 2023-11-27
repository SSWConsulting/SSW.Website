import { iconMap } from "../components/megamenu/MegaIcon/mega-icon";

export const availableWidgets = [
  "standardLink",
  "featured",
  "bookNow",
] as const;

export type AvailableIcons = keyof typeof iconMap;
export type AvailableWidgets = (typeof availableWidgets)[number];

export interface MainMenuDefinition {
  heading: string;
  items: SubMenuItemDefinition[];
  viewAllLink?: {
    name: string;
    href: string;
  };
}
export interface SubMenuItemDefinition {
  name: string;
  icon?: AvailableIcons | string;
  description?: string;
  href: string;
}
export interface SideMenuDefinition {
  heading: string;
  items: SideMenuItem[];
}

export interface SideMenuItem {
  name: string;
  description?: string;
  category: AvailableWidgets;
  href: string;
}

export interface NavMenuGroup {
  mainItems: (MainMenuDefinition | "ColumnBreak")[];
  sideBarItems: SideMenuDefinition[];
}

export interface NavMenuItem {
  name: string;
  href?: string;
  menuGroup?: NavMenuGroup;
}

export interface CtaMenu {
  name: string;
  href: string;
  icon?: AvailableIcons | string;
  iconImg?: string;
}
