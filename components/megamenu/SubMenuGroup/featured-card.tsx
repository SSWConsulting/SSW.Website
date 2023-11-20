import React, { PropsWithChildren } from "react";
import { MegaIcon } from "../MegaIcon";

interface Props extends PropsWithChildren {
  title: React.ReactNode;
  icon?: string;
}

const FeaturedCard: React.FC<Props> = (props) => {
  return (
    <div className="rounded-md bg-ssw-black px-4 py-5 text-white hover:bg-ssw-gray">
      <div className="inline-flex items-center font-bold">
        {props.icon && <MegaIcon icon={props.icon} className="mr-2" />}
        {props.title}
      </div>
      <div className="mt-2 text-sm font-normal">{props.children}</div>
    </div>
  );
};

export default FeaturedCard;
