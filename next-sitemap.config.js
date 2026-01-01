/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.hostizzy.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin', '/login', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://www.hostizzy.com/sitemap.xml',
    ],
  },
  exclude: ['/admin', '/admin/*', '/login', '/api/*'],
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority for important pages
    const priorityMap = {
      '/': 1.0,
      '/services': 0.9,
      '/technology': 0.9,
      '/training': 0.9,
      '/weddings': 0.9,
      '/certification': 0.9,
      '/properties': 0.8,
      '/experiences': 0.8,
      '/calculator': 0.8,
      '/contact': 0.8,
      '/about': 0.7,
    };

    // Dynamic properties and experiences get 0.8 priority
    if (path.includes('/properties/') || path.includes('/experiences/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
