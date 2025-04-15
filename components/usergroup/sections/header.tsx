import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { useMemo } from "react";
import { BiVideo } from "react-icons/bi";
import { UtilityButton } from "../../button/utilityButton";
import { CustomLink } from "../../customLink";
import { CITY_TIMEZONES } from "../../util/constants/country";
import { Container } from "../../util/container";
import { OnlineBadge } from "../onlineBadge";

dayjs.extend(utc);
dayjs.extend(timezone);

type UserGroupHeaderProps = {
  className?: string;
  date: Date;
  title: string;
  presenter: { name?: string; url?: string; image?: string };
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
    dayjs.tz.setDefault(CITY_TIMEZONES[city.replace("-", "_")]);

    const cityStr = city
      ?.split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
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
        "md:max-h-112 border-b-8 border-sswRed bg-polygons bg-cover bg-no-repeat"
      )}
    >
      <Container
        className={classNames(
          "flex-row py-0 text-white md:flex",
          presenter.image
            ? "justify-between max-md:text-center"
            : "justify-center text-center"
        )}
        size="custom"
      >
        <div className="flex max-w-3xl flex-col pb-10">
          <div
            className={classNames(
              "flex flex-row items-center pt-10 text-lg",
              !presenter.image ? "justify-center" : "max-md:justify-center"
            )}
          >
            {formattedDate} <OnlineBadge online={online} />
          </div>
          <h1
            className={classNames(
              presenter.name ? "mb-2" : "mb-12",
              "pb-1",
              "pt-3",
              "text-5xl",
              "font-semibold"
            )}
          >
            {title}
          </h1>

          {presenter.name && (
            <span className="mb-12 text-lg">
              With{" "}
              <CustomLink href={presenter.url}>{presenter.name}</CustomLink>
            </span>
          )}
          <div
            className={classNames(
              "mb-5 mt-auto flex-row",
              presenter.image ? "md:flex" : "flex items-center justify-center"
            )}
          >
            <UtilityButton
              className="!mt-0 whitespace-nowrap"
              link={link}
              uncentered
              animated
              buttonText={buttonText}
            />
            {trailerUrl && (
              <CustomLink
                href={trailerUrl}
                className="flex flex-row items-center max-md:pt-5 md:justify-center md:pl-4"
              >
                <span className="text-lg">
                  <BiVideo className="mx-2 inline" />
                  Watch the trailer
                </span>
              </CustomLink>
            )}
          </div>
        </div>
        {presenter.image && (
          <div className="flex max-w-xl shrink-0 flex-col justify-end self-end max-md:mx-auto md:h-112">
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
