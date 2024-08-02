/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  output: "standalone",
  additionalPaths: async () => {
    const otherURLs = [
      "https://blog.ssw.com.au/",
      "https://tv.ssw.com/",
      "https://www.ssw.com.au/rules/",
    ];

    return otherURLs.map((url) => ({
      loc: url,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
      trailingSlash: true,
    }));
  },
  transform: async (config, path) => {
    if (path.includes("/home")) {
      return {
        loc: path.replace("/home", "/"),
        changefreq: config.changefreq,
        priority: 1.0,
        lastmod: config.lastmod || new Date().toISOString(),
      };
    } else if (path.includes("/500") || path.includes("/404")) {
      return null;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.lastmod || new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/404",
          "/500",
          "/*Browse.aspx$",
          "/*browse.aspx$",
          "/*browsexml.aspx$*",
          "/*browsexml.aspx*",
          "/*BrowseXML.aspx$",
          "/*BrowseXML.aspx*",
          "/ssw/Redirect",
          "/ssw/CodeAuditor",
          "/ssw/Version.aspx",
          "/ssw/LinkAuditor",
        ],
      },
    ],
    additionalSitemaps: [
      "https://www.ssw.com.au/people/sitemap-index.xml",
      "https://www.ssw.com.au/rules/sitemap-index.xml",
      "https://www.ssw.com.au/archive/sitemap-index.xml",
      // Removed v1 sitemap as its a duplication of bunch of Next.js pages - coming from
      // "https://www.ssw.com.au/ssw/sitemap.xml",
      // "https://www.ssw.com.au/history/sitemap.xml",
    ],
  },
};
