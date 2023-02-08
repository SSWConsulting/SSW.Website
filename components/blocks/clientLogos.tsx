import React from "react";
import type { Template } from "tinacms";
import Image from "next/image";

export const ClientLogos = () => {
  return (
    <div className="grid grid-cols-3">
      <figure className="col-span-3 text-center md:col-auto">
        <Image
          src="/images/clientLogos/clients1.png"
          alt="Client logo 1"
          height={50}
          width={380}
          className="mx-auto max-w-full"
        />
      </figure>
      <figure className="col-span-3 text-center md:col-auto">
        <Image
          src="/images/clientLogos/clients2.png"
          alt="Client logo 2"
          height={50}
          width={380}
          className="mx-auto max-w-full"
        />
      </figure>
      <figure className="col-span-3 text-center md:col-auto">
        <Image
          src="/images/clientLogos/clients3.png"
          alt="Client logo 3"
          height={50}
          width={380}
          className="mx-auto max-w-full"
        />
      </figure>
    </div>
  );
};

export const clientLogosBlockSchema: Template = {
  name: "ClientLogos",
  label: "Client Logos",
  // Todo: Find a way to have no fields - the one below is to satisfy compiler
  fields: [
    {
      type: "string",
      label: "Alt text",
      name: "altText",
      required: true,
    },
  ],
};
