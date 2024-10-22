import classNames from "classnames";
import dynamic from "next/dynamic";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { CustomLink } from "../../customLink";

const Image = dynamic(() => import("next/image"));

const BenefitCard = (props) => {
  const { image, title, description, linkURL, linkName } = props.data;
  return (
    <article
      className={classNames(
        "justify-center px-14 py-11 max-md:mx-auto md:flex",
        props.className
      )}
      data-aos={props.aosType}
    >
      <figure
        data-tina-field={tinaField(props.data, "image")}
        className="relative select-none md:mr-5"
      >
        {image && (
          <Image
            className="max-w-max max-md:mx-auto"
            src={image}
            width={120}
            height={120}
            alt={title || "benefit icon"}
            loading="lazy"
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
          className="mx-auto w-full max-w-full p-0 text-center text-sm font-light leading-normal prose-p:m-0 prose-p:first-of-type:pt-0 prose-strong:font-bold prose-ul:list-disc prose-li:m-0 prose-li:list-item prose-li:font-normal md:text-left md:text-base"
        >
          <TinaMarkdown content={description} />
        </section>
        {linkURL && (
          <p className="pt-4 text-center md:text-left">
            <CustomLink
              data-tina-field={tinaField(props.data, "linkName")}
              className="text-left text-white"
              href={linkURL}
            >
              {linkName}
            </CustomLink>
          </p>
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
              <CustomLink
                key={index}
                className="text-white no-underline"
                href={aRule?.url}
              >
                {aRule?.name}
              </CustomLink>
            </span>
          ))}
        </p>
      )}
    </article>
  );
};
