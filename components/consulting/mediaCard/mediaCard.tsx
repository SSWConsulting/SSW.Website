import Image from "next/image";
import { FC } from "react";

export type MediaCardProps = {
  thumbnail: string,
  attribution: string,
  title: string,
  type: "video" | "blog";
};

const MediaCard: FC<MediaCardProps> = ({ thumbnail, type, title, attribution }) => {

  return (
    <div
      // data-aos="flip-left"
      className="h-96 bg-white drop-shadow"
    >
      <div 
        className="relative h-2/3 bg-cover bg-no-repeat" 
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      <div className="flex flex-col justify-between p-5 text-left">
        <p className="mb-5 text-lg font-bold">{title}</p>
      <p className="self-end text-sm">{type == "blog" ? "Blog by" : type == "video" ? "Video by" : "By"} <span className="underline">{attribution}</span></p>
      </div>
    </div>
  );
};

export default MediaCard;
