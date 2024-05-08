import { CustomLink } from "@/components/customLink";
import Image from "next/image";
import { Divider } from "./divider";

export const SiteInfo = () => (
  <div>
    <CustomLink
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/MenuMap.aspx"
    >
      SITEMAP
    </CustomLink>
    <Divider />
    <CustomLink
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/HealthCheck"
    >
      HEALTH CHECK
      <Image
        src="/images/health-check.png"
        alt="health check logo"
        height={14}
        width={40}
        className="inline-block pb-1 pl-2"
      />
    </CustomLink>
  </div>
);
