import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const SolutionsRow = (props) => {
  const renderTinaMarkDown = (data) => <TinaMarkdown content={data} />;

  const RawImage = ({ img, altText }) => (
    <Image src={img} alt={altText} className="!static !h-auto !w-full" fill />
  );

  const RenderCard = ({ imgSrc, header, body }) => (
    <div className="relative col-span-4">
      <RawImage img={imgSrc} altText={header} />
      <h4 className="mb-2 mt-5 text-sm font-bold">{header}</h4>
      <p className="mb-3">{renderTinaMarkDown(body)}</p>
    </div>
  );

  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-8">
      <RenderCard
        imgSrc={props.imgSrc1}
        header={props.header1}
        body={props.body1}
      />
      <RenderCard
        imgSrc={props.imgSrc2}
        header={props.header2}
        body={props.body2}
      />
      <RenderCard
        imgSrc={props.imgSrc3}
        header={props.header3}
        body={props.body3}
      />
    </div>
  );
};
