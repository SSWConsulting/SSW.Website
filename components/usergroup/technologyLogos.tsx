import Image from "next/image";

type TechnologyLogosProps = {
  logos?: {
    name?: string;
    imageUrl?: string;
  }[];
};

export const TechnologyLogos = ({ logos }: TechnologyLogosProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {logos?.map((logo, index) => (
        <Image
          key={index}
          width={200}
          height={50}
          alt={logo.name}
          src={logo.imageUrl}
          className="self-center"
        />
      ))}
    </div>
  );
};
