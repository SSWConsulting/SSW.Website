import { Blocks } from "@/components/blocks-renderer";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { useEffect, useMemo } from "react";
import { WebSite, WithContext } from "schema-dts";

export default function PageContent({ props }) {
  const { data, global } = props;

  const structuredData: WithContext<WebSite> = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: global?.header?.site_name,
      alternateName: global?.header?.alternate_site_name,
      description: global?.header?.description,
      url: global?.header?.url,
    }),
    [global?.header]
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [structuredData]);

  return (
    <HomeThemeShell>
      <Blocks prefix="Pagesv2Blocks" blocks={data.pagesv2.blocks} />
    </HomeThemeShell>
  );
}
