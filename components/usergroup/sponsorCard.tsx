import classNames from "classnames";
import Image from "next/image";

type SponsorCardProps = {
  className?: string;
  urls?: {
    src?: string;
    label?: string;
  }[];
};

export const SponsorCard = ({ className, urls }: SponsorCardProps) => {
  return (
    <div className={classNames("rounded-md bg-sswRed", className)}>
      <p className="py-2 text-center text-lg font-medium">Event Sponsors</p>
      <div className="rounded-md bg-white">
        {urls.map((url, index) => (
          <Image
            key={index}
            src={url.src}
            alt={url.label}
            width={250}
            height={70}
            className="mx-auto"
          />
        ))}
      </div>
    </div>
  );
};
