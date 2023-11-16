export const availableWidgets = ["classicMenu", "featured", "bookNow"] as const;

export const availableIcons = [
  "chevronLeft",
  "chevronDown",
  "magnifyingGlass",
  "phone",
  "xMark",
  "chartPie",
  "cursorArrowRays",
  "fingerPrint",
  "squaresPlus",
  "playCircle",
  "rectangleGroup",
  "websiteDevelopment",
  "applicationDevelopment",
  "mobileDevelopment",
  "aiDevelopment",
  "databaseDevelopment",
  "platformDevelopment",
  "uiUXDesign",
  "videoProduction",
  "cloudAndInfrastructure",
  "otherSSWService",
  "sugarLearning",
  "timePro",
  "codeAuditor",
  "linkAuditor",
  "smashingBarrier",
  "sophieBot",
  "sophieHub",
  "sswRewards",
] as const;

export type AvailableIcons = (typeof availableIcons)[number];

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
  icon?: AvailableIcons;
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
  category: (typeof availableWidgets)[number];
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
  icon: AvailableIcons;
}
