import classNames from "classnames";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import { Container } from "../util/container";

type LiveHeaderprops = {
  title: string;
  subtitle: TinaMarkdownContent;
};

export const LiveHeader = (props: LiveHeaderprops) => {
  const { title, subtitle } = props;
  return (
    <section
      className={classNames(
        "border-b-8 border-sswRed bg-polygons bg-cover bg-no-repeat"
      )}
    >
      <Container
        className={classNames(
          "flex-row  justify-center py-0 text-center text-white md:flex"
        )}
        size="custom"
      >
        <div className="flex max-w-3xl flex-col pb-10">
          <div
            className={classNames(
              "flex flex-row items-center max-md:justify-center"
            )}
          ></div>
          <h1
            className="text-5xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: sanitiseXSS(title, spanWhitelist) || "",
            }}
          ></h1>
          <div className="mb-2 pb-1 pt-3 child-h1:text-5xl child-h1:font-semibold child-p:text-xl">
            {<TinaMarkdown content={subtitle} />}
          </div>
          <div
            className={classNames(
              "mb-5 mt-auto flex flex-row items-center justify-center"
            )}
          ></div>
        </div>
      </Container>
    </section>
  );
};
