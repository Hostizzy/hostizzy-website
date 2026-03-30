/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.hostizzy.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api'],
      },
    ],
  },
  exclude: ['/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorityMap = {
      '/': 1.0,
      '/services': 0.9,
      '/technology': 0.9,
      '/training': 0.8,
      '/certification': 0.8,
      '/calculator': 0.9,
      '/contact': 0.8,
      '/about': 0.7,
      '/products/hostos': 0.8,
      '/products/resiq': 0.8,
      '/products/juxtravel': 0.6,
      '/blogs': 0.7,
      '/testimonials': 0.6,
      '/faq': 0.6,
      '/invest': 0.5,
      '/career': 0.5,
    };

    return {
      loc: path,
      changefreq: priorityMap[path] >= 0.8 ? 'weekly' : 'monthly',
      priority: priorityMap[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
