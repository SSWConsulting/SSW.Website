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
  "alDevelopment",
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
  icon?: (typeof availableIcons)[number];
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
  icon: (typeof availableIcons)[number];
}
