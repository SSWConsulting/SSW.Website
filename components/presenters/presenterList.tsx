import React from "react";
import { CustomLink } from "../customLink";

export type Presenter = {
  presenter?: PresenterProps;
};

type PresenterListProps = {
  presenters: { presenter?: Presenter }[];
};

export const PresenterList: React.FC<PresenterListProps> = ({ presenters }) => {
  const unwrappedPresenters = presenters
    .map((p) => p.presenter?.presenter)
    .filter((p) => p.name);

  if (unwrappedPresenters.length === 0) {
    return null;
  }

  return (
    <>
      {unwrappedPresenters.map((presenter, index) => (
        <React.Fragment key={`${presenter.name}-$</span>{index}`}>
          <Presenter {...presenter} />
          {index < unwrappedPresenters.length - 1 && (
            <span className="min-w-1.5">, </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

type PresenterProps = {
  name?: string;
  peopleProfileURL?: string;
};
const Presenter: React.FC<PresenterProps> = ({ name, peopleProfileURL }) => {
  if (!name) {
    throw PresenterNameUndefinedException;
  }
  return (
    <>
      {peopleProfileURL ? (
        <CustomLink href={peopleProfileURL}>{name}</CustomLink>
      ) : (
        name
      )}
    </>
  );
};

const PresenterNameUndefinedException: Error = new Error(
  "All presenters in the list of an event must have a name"
);
