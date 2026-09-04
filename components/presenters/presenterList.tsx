import React from "react";
import { CustomLink } from "../customLink";

export type Presenter = {
  presenter?: PresenterProps;
};

type PresenterListProps = {
  presenters: { presenter?: Presenter }[];
  // Renders names as plain text instead of profile links. For callers that sit
  // inside a larger click target: a nested anchor under an overlay link is
  // unreachable by mouse but still focusable, so the two inputs would navigate
  // to different places.
  linkless?: boolean;
};

export const PresenterList: React.FC<PresenterListProps> = ({
  presenters,
  linkless,
}) => {
  const unwrappedPresenters = presenters
    .map((p) => p.presenter?.presenter)
    .filter((p) => p.name);

  if (unwrappedPresenters.length === 0) {
    return null;
  }

  return (
    <>
      {unwrappedPresenters.map((presenter, index) => (
        <React.Fragment key={`${presenter.name}-${index}`}>
          <Presenter {...presenter} linkless={linkless} />
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
  linkless?: boolean;
};
const Presenter: React.FC<PresenterProps> = ({
  name,
  peopleProfileURL,
  linkless,
}) => {
  if (!name) {
    throw PresenterNameUndefinedException;
  }
  return (
    <>
      {peopleProfileURL && !linkless ? (
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
