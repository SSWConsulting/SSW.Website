import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import { useMemo } from "react";
import { BiVideo } from "react-icons/bi";
import { UtilityButton } from "../../blocks";
import { Container } from "../../util/container";

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
};

export const UserGroupHeader = ({
  className,
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
      className={classNames(className, "border-b-8 border-sswRed")}
      style={{
        backgroundImage: "url('/images/background/polygonBackground.png')",
      }}
    >
      <Container className="flex-row pb-0 text-white md:flex">
        <div className="flex max-w-3xl flex-col pb-10">
          <span className="text-lg">{formattedDate}</span>
          <h1 className="mb-2 pb-1 pt-3 text-5xl font-semibold">{title}</h1>
          <span className="mb-4 text-lg">
            With <a href={presenter.url}>{presenter.name}</a>
          </span>
          <div className="mt-8 flex-row md:flex">
            <UtilityButton
              className="!mt-0"
              link={registerUrl}
              uncentred
              noAnimate
              buttonText="Register for free"
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
          <div className="flex shrink-0 flex-col justify-end">
            <Image
              className="max-w-full align-bottom"
              src={presenter.image}
              width={500}
              height={600}
              alt={`Image of ${presenter.name}`}
            />
          </div>
        )}
      </Container>
    </section>
  );
};
