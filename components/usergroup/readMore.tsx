import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { sanitiseXSS } from "../../helpers/validator";

type ReadMoreProps = {
  text: string;
  length?: number;
  previewSentenceCount?: number;
  className?: string;
};

const getCondensedText = (
  text: string,
  length: number,
  previewSentenceCount: number
) => {
  const formatted = text.split(". ");
  const selectedParagraphs = formatted.slice(0, previewSentenceCount);
  const condensedText = selectedParagraphs.join(". ");

  if (length > 0 && condensedText.length <= length) {
    return `${condensedText} . ...`;
  } else if (length > 0) {
    return `${condensedText.slice(0, length)}...`;
  }

  return `${condensedText}. ...`;
};

export const ReadMore = ({
  text,
  length,
  className,
  previewSentenceCount = 1,
}: ReadMoreProps) => {
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const [presenterIntro, setPresenterIntro] = useState("");

  const isReadMoreRequired = useMemo(() => {
    return (
      (length > 0 && text.length > length) ||
      (previewSentenceCount > 1 &&
        text.split(". ").length > previewSentenceCount)
    );
  }, [text, length, previewSentenceCount]);

  useEffect(() => {
    const sanitizedText = sanitiseXSS(text);
    setPresenterIntro(
      dropdownClicked || !isReadMoreRequired
        ? sanitizedText
        : getCondensedText(sanitizedText, length, previewSentenceCount)
    );
  }, [dropdownClicked, length, previewSentenceCount, text, isReadMoreRequired]);

  if (!text) return <></>;

  return (
    <div className={classNames("flex flex-col", className)}>
      <div
        dangerouslySetInnerHTML={{
          __html: presenterIntro,
        }}
      />
      {isReadMoreRequired && (
        <button
          className="flex grow-0 flex-row items-center pt-2 text-sm text-gray-800"
          onClick={() => setDropdownClicked((prev) => !prev)}
        >
          Read {dropdownClicked ? "less" : "more"}{" "}
          <MdOutlineKeyboardArrowDown
            className={dropdownClicked && "rotate-180"}
          />
        </button>
      )}
    </div>
  );
};
