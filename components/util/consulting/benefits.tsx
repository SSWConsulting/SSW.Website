import React from "react";
import Image from "next/legacy/image";
import path from "path";

const BenefitCard = ({ data, aosType }) => {
  const { image, title, description, linkURL, linkName } = data;
  return (
    <article className="px-14 py-11" data-aos={aosType}>
      <figure className="relative float-left h-40 w-40 select-none">
        <Image
          src={`/images/benefits/${path.basename(image)}`}
          layout="fill"
          alt="benefit icon"
        />
      </figure>

      <h4 className="mb-2 mt-4 text-left text-xl font-medium uppercase leading-snug">{title}</h4>
      <article>
        <p className="m-0 w-full py-0 text-left font-light leading-normal">{description}</p>
        {linkURL &&
          <a className="text-white no-underline" href={linkURL}>
            {linkName}
          </a>
        }
      </article>
    </article>
  )
}

export const Benefits = ({ data }) => {
  const { rule, benefitList } = data;

  return (
    <article>
      <section className="grid sm:grid-cols-1 md:grid-cols-2">
        {
          benefitList?.length > 0 &&
          benefitList.map((benefit, index) => {
            return (
              <BenefitCard
                key={benefit.title}
                data={benefit}
                aosType={index % 2 === 0 ? "fade-left" : "fade-right"}
              />
            )
          })
        }
      </section>
      {
        rule && (
          <p>
            Have a look at{" "}
            <a className="text-white no-underline" href={rule?.url}>
              {rule?.name}
            </a>
          </p>
        )
      }
    </article>
  )
}
