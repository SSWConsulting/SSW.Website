import { Link } from "gatsby";
import React from "react";
import Breadcrumb from "../components/breadcrumb";
import external from "../assets/images/external-link.gif";
import Layout from "../components/layout";
import "../styles/thankyou.css";
import { BASE_URL, PAGE_TYPE, PAGE_TITLE, WHITE_SMOKE } from "../constants";
import BuildPlatform from "../components/builtPlatform";

const ThankyouPage = () => {
  const data = [
    {
      name: PAGE_TYPE.Home,
      path: BASE_URL,
    },
    {
      name: PAGE_TYPE.Thankyou,
    },
  ];

  return (
    <Layout backgroundColor={WHITE_SMOKE} pageTitle={PAGE_TITLE.Thankyou}>
      <div className="main-container header-content ">
        <Breadcrumb data={data} />
      </div>

      <div className="body-background-white">
        <div className="main-container body-content">
          <h1>
            <span className="red">
              <h1>Thank you!</h1>
            </span>
          </h1>
          <p>
            Your form has been successfully submitted. We will be in contact as
            soon as possible
            <br />
            In the meantime, check out our other services and meet our amazing
            team.
          </p>

          <div className="flex-between">
            <div>
              <p>SSW can help your business in many ways:</p>
              <a className="red done" href="https://www.ssw.com.au/ssw/Consulting/Default.aspx">
                SSW Consulting
              </a>
            </div>
            <div>
              <p>Want to know more about our consultants:</p>{" "}
              <a className="red done" href="https://www.ssw.com.au/people/">
                SSW People
              </a>
            </div>
          </div>
        </div>
      </div>

      <BuildPlatform backgroundColor={WHITE_SMOKE} />
    </Layout>
  );
};

export default ThankyouPage;
