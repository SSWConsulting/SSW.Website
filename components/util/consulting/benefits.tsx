import React from "react";
import Image from "next/image";
import path from "path";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import styles from "./benefits.module.css";

const BenefitCard = ({ data, aosType }) => {
  const { image, title, description, linkURL, linkName } = data;
  const imagePath = image ? `/images/benefits/${path.basename(image)}` : "";
  return (
    <article className="px-14 py-11" data-aos={aosType}>
      <figure className="relative float-left h-40 w-40 select-none">
        <Image src={imagePath} sizes="100vw" fill alt="benefit icon" />
      </figure>

      <h4 className="mb-2 mt-4 text-left text-xl font-medium uppercase leading-snug">
        {title}
      </h4>
      <article>
        <section className={`not-prose ${styles.description}`}>
          <TinaMarkdown content={description}></TinaMarkdown>
        </section>
        {linkURL && (
          <a className="text-white no-underline" href={linkURL}>
            {linkName}
          </a>
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
        {benefitList?.length > 0 &&
          benefitList.map((benefit, index) => {
            return (
              <BenefitCard
                key={benefit.title}
                data={benefit}
                aosType={index % 2 === 0 ? "fade-left" : "fade-right"}
              />
            );
          })}
      </section>
      {rule && (
        <p>
          Have a look at{" "}
          <a className="text-white no-underline" href={rule?.url}>
            {rule?.name}
          </a>
        </p>
      )}
    </article>
  );
};
