import Link from "next/link";
import { Layout } from "../components/layout";

const ThankyouPage = () => {
  const textContentClass = "px-[100px] text-lg mb-4";
  const doneButtonClass = "done p-3";

  return (
    <Layout className="bg-gray-75">
      <div className="!max-w-full !bg-white">
        <div className="main-container mb-8 pb-8 pl-4 text-center">
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
              <Link href="/consulting/Default.aspx">
                <a className={doneButtonClass}>SSW Consulting</a>
              </Link>
            </div>
            <div>
              <p className={textContentClass}>
                Want to know more about our consultants:
              </p>{" "}
              <Link href="/people/">
                <a className={doneButtonClass}>SSW People</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankyouPage;
