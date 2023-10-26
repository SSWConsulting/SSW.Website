import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import { useMemo } from "react";
import { BiVideo } from "react-icons/bi";
import { UtilityButton } from "../../blocks";
import { CITY_TIMEZONES } from "../../util/constants/country";
import { Container } from "../../util/container";
import { OnlineBadge } from "../onlineBadge";

type UserGroupHeaderProps = {
  className?: string;
  date: Date;
  title: string;
  presenter: {
    name: string;
    url: string;
    image?: string;
  };
  trailerUrl?: string;
  registerUrl: string;
  online?: boolean;
  city: keyof typeof CITY_TIMEZONES;
  youTubeId?: string;
};

export const UserGroupHeader = ({
  className,
  date,
  title,
  presenter,
  trailerUrl,
  registerUrl,
  online,
  city,
  youTubeId,
}: UserGroupHeaderProps) => {
  const formattedDate: string = useMemo(() => {
    dayjs.tz.setDefault(CITY_TIMEZONES[city]);

    const cityStr = city.charAt(0).toUpperCase() + city.slice(1);
    return (
      dayjs(date).tz(CITY_TIMEZONES[city]).format("ddd, D MMMM YYYY, h:mm A") +
      " " +
      cityStr +
      " Time"
    );
  }, [date, city]);

  const isPastEvent = date < new Date();
  const buttonText = isPastEvent ? "Watch the replay" : "Register for free";
  const link = isPastEvent
    ? `https://www.youtube.com/watch?v=${youTubeId}`
    : registerUrl;

  return (
    <section
      className={classNames(
        className,
        "bg-polygons border-b-8 border-sswRed bg-cover bg-no-repeat"
      )}
    >
      <Container
        className="flex-row justify-between py-0 text-white md:flex"
        size="custom"
      >
        <div className="flex max-w-3xl flex-col pb-10">
          <div className="flex flex-row items-center pt-10 text-lg">
            {formattedDate} <OnlineBadge online={online} />
          </div>
          <h1 className="mb-2 pb-1 pt-3 text-5xl font-semibold">{title}</h1>
          <span className="mb-12 text-lg">
            With <a href={presenter.url}>{presenter.name}</a>
          </span>
          <div className="mb-5 mt-auto flex-row md:flex">
            <UtilityButton
              className="!mt-0"
              link={link}
              uncentered
              noAnimate
              buttonText={buttonText}
            />
            {trailerUrl && (
              <a
                href={trailerUrl}
                className="flex flex-row items-center max-md:pt-5 md:justify-center md:pl-4"
              >
                <span className="text-lg">
                  <BiVideo className="mx-2 inline" />
                  Watch the trailer
                </span>
              </a>
            )}
          </div>
        </div>
        {presenter.image && (
          <div className="flex max-w-xl shrink-0 flex-col justify-end self-end max-md:mx-auto">
            <Image
              className="!relative align-bottom"
              src={presenter.image}
              fill
              alt={`Image of ${presenter.name}`}
            />
          </div>
        )}
      </Container>
    </section>
  );
};
