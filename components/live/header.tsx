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
          <h1
            dangerouslySetInnerHTML={{
              __html: sanitiseXSS(title, spanWhitelist) || "",
            }}
          >
            {/* {title} */}
          </h1>
          <div className="mb-2 pb-1 pt-3 text-5xl child-h1:text-5xl child-h1:font-semibold child-p:text-xl descendant-strong:font-semibold descendant-strong:text-sswRed">
            {/* {title} */}
            {<TinaMarkdown content={subtitle} />}
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
