/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/404",
      },
    ],
    additionalSitemaps: [
      // TODO: add sitemaps for other sites when they are available
      // 'https://ssw.com.au/people/sitemap.xml',
      // 'https://ssw.com.au/rules/sitemap.xml',
      "https://ssw.com.au/ssw/sitemap.xml"
    ],
  },
}