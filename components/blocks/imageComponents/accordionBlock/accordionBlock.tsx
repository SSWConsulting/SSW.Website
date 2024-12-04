"use client";
import { Button } from "@/components/button/templateButton";
import "aos/dist/aos.css";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ImageComponentLayout } from "../ImageComponentLayout";

export const AccordionBlock = ({ data }) => {
  return (
    <ImageComponentLayout data={data}>
      {data.isH1 ? (
        <h1
          data-tina-field={tinaField(data, "heading")}
          className="my-0 py-2 text-3xl font-bold lg:text-4xl dark:text-gray-200"
        >
          {data.heading}
        </h1>
      ) : (
        <h2
          data-tina-field={tinaField(data, "heading")}
          className="my-0 py-2 text-2xl font-bold lg:text-3xl dark:text-gray-200"
        >
          {data.heading}
        </h2>
      )}
      <p
        className="py-2 text-base font-light dark:text-gray-300"
        data-tina-field={tinaField(data, "body")}
      >
        {data.body}
      </p>
      {data.buttons?.length > 0 && (
        <div className="mt-5 flex gap-3">
          {data.buttons?.map((button, index) => {
            const buttonElement = (
              <Button
                className="text-base font-semibold"
                key={`image-text-button-${index}`}
                data={button}
              />
            );

            return button.buttonLink ? (
              <Link href={button.buttonLink} key={`link-wrapper-${index}`}>
                {buttonElement}
              </Link>
            ) : (
              <>{buttonElement}</>
            );
          })}
        </div>
      )}
    </ImageComponentLayout>
  );
};
