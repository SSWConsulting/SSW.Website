"use client";
import Image from "next/image";
import { useState } from "react";

interface EventImageClientProps {
  thumbnail: string;
  thumbnailDescription: string;
  title: string;
}

export const EventImageClient = ({
  thumbnail,
  thumbnailDescription,
  title,
}: EventImageClientProps) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  return (
    <>
      {!imageFailed && (
        <div className="col-span-1 flex items-center justify-center sm:mr-2 sm:justify-end">
          <Image
            className={"rounded-md"}
            src={thumbnail}
            alt={`${thumbnailDescription || title} logo`}
            width={90}
            height={90}
            sizes="(max-width: 768px) 25vw, 50px"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        </div>
      )}
    </>
  );
};
