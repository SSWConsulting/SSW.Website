import React, { PropsWithChildren } from "react";

interface FeaturedCardProps extends PropsWithChildren {
  title: React.ReactNode;
}

const FeaturedCard = (props: FeaturedCardProps) => {
  return (
    <div className="rounded-md bg-ssw-black px-4 py-5 text-white hover:bg-ssw-gray">
      <div className="font-bold">{props.title}</div>
      <div className="mt-2 text-sm">{props.children}</div>
    </div>
  );
};

export default FeaturedCard;
