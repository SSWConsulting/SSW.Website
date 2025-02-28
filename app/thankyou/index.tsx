"use client";

import { CustomLink } from "@/components/customLink";
import { Container } from "@/components/util/container";
import { FaGlobe, FaUsers } from "react-icons/fa";

const ThankyouPage = () => {
  const textContentClass = "px-[100px] text-lg mb-4";
  const doneButtonClass = "done p-3 inline-flex cursor-pointer";

  return (
    <>
      <div className="!max-w-full !bg-white">
        <Container padding="px-4" className="pb-8 text-center">
          <h1>
            <span className="text-sswRed">
              <h1>Thank you!</h1>
            </span>
          </h1>
          <p className={textContentClass}>
            Your form has been successfully submitted. We will be in contact as
            soon as possible
            <br />
            In the meantime, check out our other services and meet our amazing
            team.
          </p>

          <div className="mt-8 flex justify-between">
            <div>
              <p className={textContentClass}>
                SSW can help your business in many ways:
              </p>
              <CustomLink href="/" className={doneButtonClass}>
                <FaGlobe className="m-icon" />
                SSW Consulting
              </CustomLink>
            </div>
            <div>
              <p className={textContentClass}>
                Want to know more about our consultants:
              </p>{" "}
              <CustomLink href="/people/" className={doneButtonClass}>
                <FaUsers className="m-icon" />
                SSW People
              </CustomLink>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ThankyouPage;
