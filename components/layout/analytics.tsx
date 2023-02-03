import Script from "next/script";

const zendesk = process.env.NEXT_PUBLIC_ZENDESK_CHAT_KEY;
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const gtmId = process.env.NEXT_PUBLIC_GOOGLE_GTM_ID;
const hjId = process.env.NEXT_PUBLIC_HOTJAR_ID;
const hjSv = process.env.NEXT_PUBLIC_HOTJAR_SV;

export const Analytics = () => {
  return (
    <>
      <GoogleAnalytics analyticsId={`${gaId ? gaId : ''}`} />
      <GoogleTagManager tagId={`${gtmId ? gtmId : ''}`} />
      <Hotjar hotjarId={`${hjId ? hjId : ''}`} hotjarSv={`${hjSv ? hjSv : ''}`} />
      <Zendesk zendeskKey={`${zendesk ? zendesk : ''}`} />
    </>
  );
};

const GoogleAnalytics = (props: { analyticsId: string }) => {
  if (!props.analyticsId) {
    return null;
  }
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${props.analyticsId}`}
      />
      <Script id="ga-inline" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${props.analyticsId}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  );
};

const GoogleTagManager = (props: { tagId: string }) => {
  if (!props.tagId) {
    return null;
  }
  return (
    <>
      <Script id="gtm-inline" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${props.tagId}');
        `}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${props.tagId}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      ></noscript>
    </>
  );
};

const Hotjar = (props: { hotjarId: string; hotjarSv: string }) => {
  if (!props.hotjarId) {
    return null;
  }
  return (
    <>
      <Script id="hotjar-inline" strategy="lazyOnload">
        {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${props.hotjarId},hjsv:${props.hotjarSv}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
    </>
  );
};

const Zendesk = (props: { zendeskKey: string }) => {
  if (!props.zendeskKey) {
    return null;
  }
  return (
    <>
      <Script id="connectOnPage-inline" strategy="afterInteractive">
        {`
            window.zESettings = {
                webWidget: {
                    chat: {
                        connectOnPageLoad: false        
                    }
                }
            };
        `}
      </Script>
      <Script
        strategy="lazyOnload"
        id="ze-snippet"
        src={`https://static.zdassets.com/ekr/snippet.js?key=${props.zendeskKey}`}
      />
    </>
  );
};
