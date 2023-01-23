import Script from "next/script";

const zendeskKey = process.env.NEXT_PUBLIC_ZENDESK_CHAT_KEY;
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const gtmId = process.env.NEXT_PUBLIC_GOOGLE_GTM_ID;
const hjId = process.env.NEXT_PUBLIC_HOTJAR_ID;
const hjSv = process.env.NEXT_PUBLIC_HOTJAR_SV;

export const Analytics = () => {
    return (
        <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <Script 
                id="ga-inline" 
                strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>
            <Script 
                id="gtm-inline"
                strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${gtmId}');
                    `}
            </Script>
            {/*Hotjar Tracking Code*/}
            <Script
                id="hotjar-inline">
                {`
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:${hjId},hjsv:${hjSv}};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `}
            </Script>
            <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
            {/*Zendesk Chat*/}
            <Script
                strategy="afterInteractive"
                id="ze-snippet"
                src={`https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`}/>
        </>
    );
}