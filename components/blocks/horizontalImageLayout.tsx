import Image from "next/image";
import { Key } from "react";
import { CustomLink } from "../customLink";

export const HorizontalImageLayout = ({ images }) => {
  const RawImage = (props) => (
    <Image
      src={props.imageSrc}
      alt={props.altText}
      className="!static !h-auto !w-full"
      fill
    />
  );

  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-8">
      {images.map(({ imageLink, message, ...props }, index: Key) => (
        <div key={index} className="relative col-span-4">
          {imageLink ? (
            <CustomLink href={imageLink}>
              <RawImage {...props} />
            </CustomLink>
          ) : (
            <RawImage {...props} />
          )}
          {message}
        </div>
      ))}
    </div>
  );
};
