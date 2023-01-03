/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ssw.com.au',
  generateRobotsTxt: true,
  outDir: './out',
  robotsTxtOptions: {
    additionalSitemaps: [
      // TODO: add sitemaps for other sites when they are available
      // 'https://ssw.com.au/people/sitemap.xml',
      // 'https://ssw.com.au/rules/sitemap.xml',
    ],
  },
}