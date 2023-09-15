import dayjs from "dayjs";
import Image from "next/image";
import { useMemo } from "react";
import { BiVideo } from "react-icons/bi";
import { UtilityButton } from "../blocks";
import { Container } from "../util/container";

type UserGroupHeaderProps = {
  date: Date;
  title: string;
  presenter: {
    name: string;
    url: string;
    image?: string;
  };
  trailerUrl?: string;
  registerUrl: string;
};

export const UserGroupHeader = ({
  date,
  title,
  presenter,
  trailerUrl,
  registerUrl,
}: UserGroupHeaderProps) => {
  const formattedDate: string = useMemo(
    () => dayjs(date).format("ddd, D MMMM YYYY, h:mm A") + " AEST",
    [date]
  );

  return (
    <section
      className="border-b-8 border-sswRed"
      style={{
        backgroundImage: "url('/images/background/polygonBackground.png')",
      }}
    >
      <Container className="flex-row pb-0 text-white md:flex">
        <div className="flex flex-col pb-10">
          <span className="text-lg">{formattedDate}</span>
          <h1 className="pt-3 text-3xl">{title}</h1>
          <span>
            With <a href={presenter.url}>{presenter.name}</a>
          </span>
          {trailerUrl && (
            <span className="pt-4">
              <Image
                className="mr-1 inline rounded-md"
                src="https://img.youtube.com/vi/FNMtmBJAZ_M/mqdefault.jpg"
                width={100}
                height={100}
                alt="Play button"
              />
              <BiVideo className="mx-2 inline" />
              Watch the trailer
            </span>
          )}
          <UtilityButton
            link={registerUrl}
            uncentred
            noAnimate
            buttonText="Register for free"
          />
        </div>
        {presenter.image && (
          <div className="flex shrink-0 flex-col justify-end">
            <Image
              className="max-w-full align-bottom"
              src={presenter.image}
              width={600}
              height={600}
              alt={`Image of ${presenter.name}`}
            />
          </div>
        )}
      </Container>
    </section>
  );
};
