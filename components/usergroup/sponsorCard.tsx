import classNames from "classnames";
import Image from "next/image";

type SponsorCardProps = {
  className?: string;
};

export const SponsorCard = ({ className }: SponsorCardProps) => {
  return (
    <div className={classNames("inline-block rounded-md bg-sswRed", className)}>
      <div className="rounded-md bg-white">
        <Image
          src="/images/consulting/octopusdeploy-logo.png"
          alt="Octopus Deploy logo"
          width={250}
          height={70}
          className="mx-auto"
        />
      </div>
      <p className="py-2 text-center text-lg font-medium">Event Sponsors</p>
    </div>
  );
};
