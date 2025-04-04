import React from "react";
import { CustomLink } from "../customLink";

export type Presenter = {
  presenter?: {
    name?: string;
    peopleProfileURL?: string;
  };
};

type PresenterLinksProps = {
  presenters: { presenter?: Presenter }[];
};

export const PresenterLinks: React.FC<PresenterLinksProps> = ({
  presenters,
}) => {
  return (
    <>
      {presenters.length === 1 ? (
        <>
          <Presenter presenter={presenters[0].presenter} />
        </>
      ) : (
        <>
          {presenters
            .slice(0, presenters.length - 1)
            .map((presenter, index) => {
              return (
                <React.Fragment
                  key={`${presenter.presenter?.presenter?.name}-${index}`}
                >
                  <Presenter presenter={presenter.presenter} />
                  {index < presenters.length - 2 && ", "}
                </React.Fragment>
              );
            })}{" "}
          &{" "}
          <Presenter presenter={presenters[presenters.length - 1].presenter} />
        </>
      )}
    </>
  );
};

type PresenterListProps = {
  presenters: { presenter?: Presenter }[];
};

export const PresenterList = ({ presenters }: PresenterListProps) => {
  return (
    <>
      {presenters.length === 1 ? (
        <>{presenters[0].presenter.presenter.name}</>
      ) : (
        <>
          {presenters
            .slice(0, presenters.length - 1)
            .map((presenter, index) => {
              return (
                <React.Fragment
                  key={`${presenter.presenter?.presenter?.name}-${index}`}
                >
                  <Presenter presenter={presenter.presenter} />
                  {index < presenters.length - 2 && ", "}
                </React.Fragment>
              );
            })}{" "}
          &{` ${presenters[presenters.length - 1].presenter.presenter.name}`}
        </>
      )}
    </>
  );
};

type PresenterProps = {
  presenter: Presenter;
};
const Presenter: React.FC<PresenterProps> = ({ presenter }) => {
  if (!presenter?.presenter?.name) {
    throw PresenterNameUndefinedException;
  }
  return (
    <>
      {presenter.presenter.peopleProfileURL ? (
        <CustomLink href={presenter.presenter.peopleProfileURL}>
          {presenter.presenter.name}
        </CustomLink>
      ) : (
        presenter.presenter.name
      )}
    </>
  );
};

const PresenterNameUndefinedException: Error = new Error(
  "All presenters in the list of an event must have a name"
);
