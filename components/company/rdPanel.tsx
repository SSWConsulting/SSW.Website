import Image from "next/image";
import { CustomLink } from "../customLink";

export const RDPanel = () => {
  return (
    <div className="mt-6 border-2 bg-gray-100 p-4">
      <strong>
        SSW&#39;s Chief Architect is one of two Microsoft Regional Directors in
        Australia!
      </strong>
      <Image
        src="/images/company/regional-director.png"
        alt="Microsoft Regional Director logo"
        width={124}
        height={50}
      />
      <p>
        RDs are 120 partners in 50 countries. They speak many languages and have
        various areas of technical expertise. They are master presenters and
        consistently get the best scores when presenting to our customers.
        Regional directors are independent developers and architects, volunteers
        chosen for their leadership in their local technology circles, whose
        primary purpose is to share information about Microsoft technologies
        with their developer communities and to provide feedback from developers
        to Microsoft.
      </p>
      <p>
        Regional directors have gained developers&#39; trust by providing an
        objective viewpoint. Regional Directors are not Microsoft employees, so
        they tend to be very open about our products, both good and bad.
      </p>
      <p>
        <CustomLink href="https://mvp.microsoft.com/en-us/RD">
          More about Microsoft Regional Director program
        </CustomLink>
      </p>
      <Image
        src="/images/company/mvp.png"
        alt="Microsoft MVP Logo"
        width={150}
        height={53}
      />
      <p>
        Adam is also a Microsoft Most Valued Professional (MVP) for Microsoft
        Visual Studio Azure DevOps (formerly ALM... Visual Studio Team System...
        TFS).
      </p>
    </div>
  );
};
