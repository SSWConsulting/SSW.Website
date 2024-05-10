"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sanitiseXSS } from "../../helpers/validator";

const MdOutlineKeyboardArrowDown = dynamic(
  () => import("react-icons/md").then((mod) => mod.MdOutlineKeyboardArrowDown),
  { ssr: false }
);

type ReadMoreProps = {
  text: string;
  length?: number;
  previewSentenceCount?: number;
  className?: string;
};

const sentenceSeparator = /\. |\.\n|\.\r|! |!\n|!\r/; // Matches "." or "!" followed by a space or a new line

const getCondensedText = (
  text: string,
  length: number,
  previewSentenceCount: number
) => {
  const formatted = text.split(sentenceSeparator);
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [readMoreText, setReadMoreText] = useState(text);
  const sanitizedText = sanitiseXSS(text);

  const isReadMoreRequired = () =>
    (length > 0 && text.length > length) ||
    (previewSentenceCount > 1 &&
      text.split(sentenceSeparator).length > previewSentenceCount);

  const condensedText = isReadMoreRequired()
    ? getCondensedText(sanitizedText, length, previewSentenceCount)
    : sanitizedText;

  useEffect(() => {
    setReadMoreText(isExpanded ? sanitizedText : condensedText);
  }, [condensedText, isExpanded, sanitizedText]);

  if (!text) return <></>;
  return (
    <div className={classNames("flex flex-col", className)}>
      <div
        dangerouslySetInnerHTML={{
          __html: readMoreText,
        }}
      />
      {isReadMoreRequired() && (
        <button
          className="flex grow-0 flex-row items-center pt-2 text-sm text-gray-800"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          Read {isExpanded ? "less" : "more"}{" "}
          <MdOutlineKeyboardArrowDown className={isExpanded && "rotate-180"} />
        </button>
      )}
    </div>
  );
};
