import type { ClassValue } from 'clsx';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { default as React_2 } from 'react';

export declare type AvailableIcons = keyof typeof iconMap;

export declare type AvailableWidgets = (typeof availableWidgets)[number];

export declare const availableWidgets: readonly ["standardLink", "featured", "bookNow"];

export declare type Countries = keyof typeof countryMap;

export declare const countryMap: {
    Australia: string;
    China: string;
    France: string;
};

export declare type FlagProps = {
    className?: string;
};

export declare const iconMap: {
    chevronDown: (props: IconProps) => JSX_2.Element;
    chevronLeft: (props: IconProps) => JSX_2.Element;
    magnifyingGlass: (props: IconProps) => JSX_2.Element;
    phone: (props: IconProps) => JSX_2.Element;
    phoneAlt: (props: IconProps) => JSX_2.Element;
    xMark: (props: IconProps) => JSX_2.Element;
    chartPie: (props: IconProps) => JSX_2.Element;
    cursorArrowRays: (props: IconProps) => JSX_2.Element;
    fingerPrint: (props: IconProps) => JSX_2.Element;
    squaresPlus: (props: IconProps) => JSX_2.Element;
    playCircle: (props: IconProps) => JSX_2.Element;
    rectangleGroup: (props: IconProps) => JSX_2.Element;
    chinaFlag: () => JSX_2.Element;
};

export declare type IconProps = {
    className?: string;
};

export declare type LinkComponentType = React_2.FC<{
    href: string;
    className?: string;
    title?: string;
    onClick?: () => void;
    children?: React_2.ReactNode;
}>;

export declare const MegaMenuLayout: React_2.FC<MegaMenuWrapperProps>;

export declare type MegaMenuWrapperProps = {
    className?: ClassValue;
    menuBarItems?: NavMenuGroup[];
    url?: string;
    subtitle?: string;
    searchUrl?: string;
    rightSideActionsOverride?: () => JSX.Element;
    callback?: (searchTerm: string) => void;
    linkComponent?: LinkComponentType;
} & React_2.PropsWithChildren & (Tagline | Title);

export declare interface NavMenuColumn {
    menuColumnGroups?: NavMenuColumnGroup[];
}

export declare interface NavMenuColumnGroup {
    name: string;
    menuItems?: NavMenuColumnGroupItem[];
}

export declare interface NavMenuColumnGroupItem {
    name: string;
    url: string;
    description?: string;
    icon?: AvailableIcons | string;
    iconImg?: string;
    youtubeLink?: string;
    documentationLink?: string;
}

export declare interface NavMenuGroup {
    name: string;
    url?: string;
    menuColumns?: NavMenuColumn[];
    sidebarItems?: Sidebar[];
    viewAll?: ViewAll;
}

export declare interface Sidebar {
    name: string;
    icon?: AvailableIcons | string;
    iconImg?: string;
    items?: SidebarItem[];
}

export declare interface SidebarItem {
    name: string;
    url: string;
    description?: string;
    widgetType?: AvailableWidgets | string;
    icon?: AvailableIcons | string;
}

declare type Tagline = {
    title?: never;
    tagline?: string;
};

declare type Title = {
    title: string;
    tagline?: never;
};

export declare interface ViewAll {
    name: string;
    url: string;
}

export { }
