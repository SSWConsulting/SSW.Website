import Image from "next/image";

import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";

type ContactPanelProps = {
  office: {
    phone: string;
    streetAddress: string;
    suburb: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    sideImg?: string;
    sidebarSecondaryPlace?: {
      name: string;
      url: string;
    };
    chapelLink?: string;
  };
};

const ContactPanel = ({ office }: ContactPanelProps) => {
  return (
    <>
      <h3>Contact Us</h3>
      <p>
        {
          "Whether you're having trouble with your development process or you just need us to write some awesome software, our team of experts is ready to help."
        }
      </p>

      <p>
        Give us a call on
        <br />
        <span data-tina-field={tinaField(office, "phone")}>
          <strong>{office.phone}</strong>
        </span>
      </p>
      <p>
        Find us at
        <br />
        <strong>
          <span data-tina-field={tinaField(office, "streetAddress")}>
            {office.streetAddress}
          </span>
          <br />
          <span data-tina-field={tinaField(office, "suburb")}>
            {office.suburb + ", "}
          </span>
          <span data-tina-field={tinaField(office, "addressRegion")}>
            {office.addressRegion + " "}
          </span>
          <span data-tina-field={tinaField(office, "postalCode")}>
            {office.postalCode}
          </span>
          <br />
          <span data-tina-field={tinaField(office, "addressCountry")}>
            {office.addressCountry}
          </span>
        </strong>
      </p>
      <p>
        {office.chapelLink && (
          <span data-tina-field={tinaField(office, "chapelLink")}>
            {"Learn more on "}
            <CustomLink href={office.chapelLink}>SSW Chapel</CustomLink>
          </span>
        )}

        {!!office.sidebarSecondaryPlace && (
          <>
            {" and "}
            <CustomLink href={office.sidebarSecondaryPlace.url}>
              {office.sidebarSecondaryPlace.name}
            </CustomLink>
          </>
        )}
      </p>

      {office.sideImg && (
        <div data-tina-field={tinaField(office, "sideImg")}>
          <Image
            src={office.sideImg}
            width={285}
            height={160}
            alt="Sidebar Image"
          />
        </div>
      )}
    </>
  );
};

export default ContactPanel;
