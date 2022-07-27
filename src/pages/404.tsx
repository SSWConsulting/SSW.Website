import * as React from "react";
import Layout from "../components/layout";
import { WHITE } from "../constants";
import "../styles/404.css";

// markup
const NotFoundPage = () => {
  return (
    <>
      <Layout backgroundColor={WHITE} pageTitle="Page not found">
        <div className="main-container">
          <div className="not-found-page">
            <div className="not-found-grid">
              <h1 className="unselectable">404</h1>
              <div className="not-found-message">
                <h2 className="unselectable">
                  <span>PAGE NOT FOUND</span> <br />
                  Sorry, we couldn't find the <br />
                  page you were looking for<span> </span>
                </h2>
              </div>
              <div className="not-found-greybox greybox">
                Visit <a href="https://www.ssw.com.au/ssw/">SSW homepage</a> for
                details on our Services, Staff and more or
                <button>go back</button>to the previous page.
              </div>
              <div className="not-found-greybox greybox">
                This page is as per{" "}
                <a href="https://ssw.com.au/rules/404-useful-error-page">
                  Do you replace the 404 error with a useful error page?
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NotFoundPage;
