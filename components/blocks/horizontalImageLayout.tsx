import Image from "next/image";
import { Key } from "react";

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
      {images.map(({ imageLink, message, ...props }: any, index: Key) => (
        <div key={index} className="col-span-4 relative">{imageLink ? (
          <a href={imageLink} target="_blank" rel="noopener noreferrer">
            <RawImage {...props} />
          </a>) : (
          <RawImage {...props} />
        )}
          {message}
        </div>))}
    </div>
  );
};
