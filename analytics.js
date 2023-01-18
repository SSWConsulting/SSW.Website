import Analytics from "analytics"
import googleTagManager from "@analytics/google-tag-manager"
import googleAnalytics from "@analytics/google-analytics"

const analytics = Analytics({
    app: "ssw-website",
    debug: process.env.NODE_ENV === 'development',
    plugins:[
        googleTagManager({
            containerId: process.env.NEXT_PUBLIC_GOOGLE_GTM_ID,
            enabled: true,
        }),
        // googleAnalytics({
        //     measurementIds:[process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS],
        //     enabled: true,
        // })
    ]
});

export default analytics;