import Head from "next/head";

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_GTM_ID;

export const Analytics = () => {
  return (
    <Head>
      {/* eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        id="google-tag-manager"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `,
        }}
      />
    </Head>
  );
};
