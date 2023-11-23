import classNames from "classnames";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";

export const LiveHeader = (props) => {
  const { title } = props;
  return (
    <section
      className={classNames(
        "bg-polygons border-b-8 border-sswRed bg-cover bg-no-repeat"
      )}
    >
      <Container
        className={classNames(
          "flex-row  py-0 text-white md:flex text-center justify-center"
        )}
        size="custom"
      >
        <div className="flex max-w-3xl flex-col pb-10">
          <div
            className={classNames(
              "flex flex-row items-center max-md:justify-center"
            )}
          ></div>
          <div className="mb-2 pb-1 pt-3 text-5xl child-h1:text-5xl child-h1:font-semibold child-p:text-xl descendant-strong:font-semibold descendant-strong:text-sswRed">
            {<TinaMarkdown content={title} />}
          </div>
          <div
            className={classNames(
              "mb-5 mt-auto flex-row flex items-center justify-center"
            )}
          ></div>
        </div>
      </Container>
    </section>
  );
};
