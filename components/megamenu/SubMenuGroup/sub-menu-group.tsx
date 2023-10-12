"use client";
import React from "react";
import {
  MainMenuDefinition,
  NavMenuGroup,
  SubMenuItemDefinition,
} from "../../../models/megamanu/menuItem.model";
import MegaIcon from "../MegaIcon/mega-icon";
import SubMenuWidget from "./sub-menu-widget";

export interface SubMenuGroupProps {
  menu: NavMenuGroup;
}

export const SubMenuGroup: React.FC<SubMenuGroupProps> = ({ menu }) => {
  const subMenuColumns = [];
  let currentColumn = [];
  for (const item of menu.mainItems) {
    if (item === "ColumnBreak") {
      subMenuColumns.push(currentColumn);
      currentColumn = [];
    } else {
      currentColumn.push(item);
    }
  }
  subMenuColumns.push(currentColumn);

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="grid gap-x-4 p-4 lg:grow lg:grid-flow-col">
          {subMenuColumns.map((column, i) => (
            <div key={"column" + i} className="flex grow flex-col gap-y-4">
              {column.map((item, i) => (
                <MenuItem key={"menuItem" + i} item={item} />
              ))}
            </div>
          ))}
        </div>
        <div className="shrink-0 overflow-x-hidden bg-gray-50 lg:relative lg:w-[350px] lg:before:absolute lg:before:inset-0 lg:before:-z-10 lg:before:w-[1000px] lg:before:bg-gray-50">
          <div className="flex flex-col gap-y-2 px-8 py-4">
            {menu.sideBarItems?.map((sideBarItem, i) => (
              <div key={i}>
                <Heading>{sideBarItem.heading}</Heading>
                <div className="flex flex-col gap-y-2">
                  {sideBarItem.items.map((item, i) => (
                    <SubMenuWidget key={i} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Heading: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <h3 className="pb-2 text-lg font-bold text-ssw-black">{children}</h3>;
};

const MenuItem: React.FC<{
  item: MainMenuDefinition;
}> = ({ item }) => {
  return (
    <div key={item.heading} className="flex flex-col last:grow">
      <Heading>{item.heading}</Heading>
      <div className="flex flex-col gap-y-2">
        {item.items.map((subItem, i) => (
          <SubmenuItem key={item.heading + i} {...subItem} />
        ))}
      </div>
      <ViewAllLink {...item.viewAllLink} />
    </div>
  );
};

const SubmenuItem: React.FC<SubMenuItemDefinition> = (props) => {
  return (
    <a
      href={props.href}
      className="flex items-start gap-x-3 rounded-md bg-white hover:bg-gray-50 focus:outline-none"
    >
      {props.icon && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center text-ssw-red">
          <MegaIcon icon={props.icon} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <span>
          {props.name && props.description ? (
            <>
              <p className="font-bold text-ssw-black">{props.name}</p>
              <p className="mt-1 text-sm font-normal text-ssw-grey">
                {props.description}
              </p>
            </>
          ) : (
            <p className="text-sm font-normal text-ssw-black">{props.name}</p>
          )}
        </span>
      </div>
    </a>
  );
};

const ViewAllLink: React.FC<{ href?: string; name?: string }> = ({
  name,
  href,
}) => {
  if (!name || !href) {
    return <></>;
  }
  return (
    <div className="flex grow flex-col-reverse items-end pt-4">
      <a
        href={href}
        className="rounded-md px-3 py-1 text-sm font-semibold leading-6 text-ssw-red hover:bg-ssw-red hover:text-white"
      >
        {name} &rarr;
      </a>
    </div>
  );
};

export default SubMenuGroup;
