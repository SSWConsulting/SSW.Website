"use client";
import { Button } from "@/components/button/templateButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "aos/dist/aos.css";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
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
        <div
          className={`mt-5 flex ${data.mediaConfiguration.imageSource ? "" : "justify-center"} gap-3`}
        >
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
      {data.accordionItems && (
        <Accordion
          type={data.isMultipleOpen ? "multiple" : "single"}
          collapsible
          className="mt-15 w-full"
        >
          {data.accordionItems?.map((item, index) => {
            return (
              <AccordionItem
                key={`accord-${index}`}
                className="w-full"
                value={`accord-${index}`}
              >
                <AccordionTrigger className="border-t-1 border-gray-300 text-white">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent
                  data-tina-field={tinaField(item, "content")}
                  className="marker:text-sswRed child-ul:!ml-0 descendant-ul:ml-6 descendant-ul:!list-square"
                >
                  <TinaMarkdown
                    content={item.content}
                    components={{
                      p: (props) => (
                        <p
                          {...props}
                          className="text-sm font-light text-white"
                        />
                      ),
                      h6: (props) => <h6 {...props} className="py-2" />,
                      h5: (props) => <h5 {...props} className="py-2" />,
                      h4: (props) => <h4 {...props} className="py-2" />,
                      h3: (props) => <h3 {...props} className="py-2" />,
                      h2: (props) => <h2 {...props} className="py-2" />,
                      h1: (props) => <h1 {...props} className="py-2" />,
                      //Import sadly needed as somewhere up the food chain the default ul is overridden
                      ul: (props) => <ul className="my-0 !ml-5" {...props} />,
                      ol: (props) => (
                        <ol className="my-0 ml-5 list-decimal" {...props} />
                      ),
                      li: (props) => (
                        <li
                          className="text-sm font-light text-white"
                          {...props}
                        />
                      ),
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </ImageComponentLayout>
  );
};
