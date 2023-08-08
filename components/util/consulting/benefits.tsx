import classNames from "classnames";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const BenefitCard = (props) => {
  const { image, title, description, linkURL, linkName } = props.data;
  return (
    <article
      className={classNames("px-14 py-11", props.className)}
      data-aos={props.aosType}
    >
      <figure
        data-tina-field={tinaField(props.data, "image")}
        className="relative mr-5 select-none md:float-left"
      >
        {image && (
          <Image
            className="mx-auto"
            src={image}
            width={140}
            height={140}
            alt={title || "benefit icon"}
          />
        )}
      </figure>

      <article>
        <h4
          data-tina-field={tinaField(props.data, "title")}
          className="mb-2 text-center text-xl font-medium uppercase leading-snug md:text-left"
        >
          {title}
        </h4>
        <section
          data-tina-field={tinaField(props.data, "description")}
          className="mx-auto w-full max-w-full p-0 text-center text-sm font-light leading-normal prose-p:m-0 prose-p:first-of-type:pt-0 prose-strong:font-bold prose-ul:list-disc prose-li:m-0 prose-li:list-item prose-li:font-normal md:text-left md:text-md"
        >
          <TinaMarkdown content={description} />
        </section>
        {linkURL && (
          <div className="pt-4 text-left">
            <a
              data-tina-field={tinaField(props.data, "linkName")}
              className="text-left text-white"
              href={linkURL}
            >
              {linkName}
            </a>
          </div>
        )}
      </article>
    </article>
  );
};

export const Benefits = ({ data }) => {
  if (!data) return <></>;

  const { rule, benefitList } = data;

  return (
    <article>
      <section className="grid sm:grid-cols-1 md:grid-cols-2">
        {benefitList?.map((benefit, index) => {
          return (
            <BenefitCard
              key={benefit.title}
              className={
                benefitList.length % 2 === 0 ? "" : "last-of-type:col-span-full"
              }
              data={benefit}
              aosType={index % 2 === 0 ? "fade-left" : "fade-right"}
            />
          );
        })}
      </section>
      {rule && rule.name != "" && (
        <p>
          {rule?.map((aRule, index) => (
            <span
              key={index}
              data-tina-field={tinaField(data, `rule[${index}]`)}
            >
              {index === 0 ? "Have a look at " : " and "}
              <a
                key={index}
                className="text-white no-underline "
                href={aRule?.url}
              >
                {aRule?.name}
              </a>
            </span>
          ))}
        </p>
      )}
    </article>
  );
};
