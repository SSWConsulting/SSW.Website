import React from "react";
import layoutData from "../../content/global/index.json";

export const SEO = ({ data }) => {

  const title = data.title || layoutData.header.title;
  const description = data.description || layoutData.header.description;
  const siteRootUrl = process.env.NEXT_PUBLIC_SITE_ROOT_URL;
  const logoUrl = `${siteRootUrl}/images/SSW_Squares.png`;
  const twitterUsername = layoutData.socials.find(s => s.type === 'twitter')?.username;

  return (
    <>
        <title>{title}</title>
        
        <meta name="description" content={description} />
        <meta name="image" content="/SSW_Squares.png" />
        <TwitterMetadata
          title={title}
          description={description}
          siteRootUrl={siteRootUrl}
          logoUrl={logoUrl}
          twitterUsername={twitterUsername} />
    </>
  );
};

const TwitterMetadata = ({ title, description, siteRootUrl, logoUrl, twitterUsername }) => {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={siteRootUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logoUrl} />
      <meta name="twitter:creator" content={twitterUsername} />
    </>
  )
}