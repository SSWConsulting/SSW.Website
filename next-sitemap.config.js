/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const otherURLs = [
      "https://www.ssw.com.au/rules/",
      "https://sswdigital.com/",
      "https://sswsophie.com/sophiebot/",
      "https://sugarlearning.com/",
      "https://sswtimepro.com/",
      "https://codeauditor.com/",
      "https://sswhealthcheck.com/",
      "https://smashingbarrier.com/",
      "https://fireusergroup.com/",
      "https://bettersoftwaresuggestions.com/",
      "https://blog.ssw.com.au/",
      "https://adamcogan.com/",
      "https://tv.ssw.com/",
    ];

    return otherURLs.map((url) => ({
      loc: url,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/404",
          "/500",
          "/ssw/Redirect",
          "/ssw/CodeAuditor",
          "/ssw/Version.aspx",
          "/ssw/LinkAuditor",
        ],
      },
    ],
    additionalSitemaps: [
      // TODO: add sitemaps for other sites when they are available
      // 'https://www.ssw.com.au/people/sitemap.xml',
      // 'https://www.ssw.com.au/rules/sitemap.xml',
      // Removed v1 sitemap as its a duplication of bunch of Next.js pages - coming from
      // "https://www.ssw.com.au/ssw/sitemap.xml",
      "https://www.ssw.com.au/history/sitemap.xml",
    ],
  },
};
