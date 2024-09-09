import { Presenter as TinaPresenter } from "@/tina/types";
import React from "react";
import { CustomLink } from "../customLink";

export type Presenter = {
  presenter?: {
    name?: string;
    peopleProfileURL?: string;
  };
};

type PresenterListProps = {
  presenters: { presenter?: Presenter }[];
};
export const PresenterList: React.FC<PresenterListProps> = ({ presenters }) => {
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
                <>
                  <Presenter presenter={presenter.presenter} />
                  {index < presenters.length - 2 && ", "}
                </>
              );
            })}{" "}
          &{" "}
          <Presenter presenter={presenters[presenters.length - 1].presenter} />
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
