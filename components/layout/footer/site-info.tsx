import { CustomLink } from "@/components/customLink";
import Image from "next/image";
import { Divider } from "./divider";

export const SiteInfo = () => (
  <div>
    <CustomLink
      // TODO: Implementation https://github.com/SSWConsulting/SSW.Website/issues/2913
      href="/ssw/MenuMap.aspx"
    >
      SITEMAP
    </CustomLink>
    <Divider />
    <CustomLink
      // TODO: Implementation https://github.com/SSWConsulting/SSW.Website/issues/2914
      href="/ssw/HealthCheck"
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
