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
        disallow: ['/api', '/admin'],
      },
    ],
    additionalSitemaps: [],
  },
  // '/admin/*' alone does NOT match '/admin' itself — the bare route leaked
  // into the sitemap and Google could list the login page. Both patterns needed.
  exclude: ['/api', '/api/*', '/admin', '/admin/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Priority + changefreq map for all pages
    const pageConfig = {
      // Homepage — highest priority, crawl daily
      '/':                          { priority: 1.0, changefreq: 'daily' },

      // Core service pages — high priority, weekly crawl
      '/services':                  { priority: 0.9, changefreq: 'weekly' },
      '/technology':                { priority: 0.9, changefreq: 'weekly' },
      '/calculator':                { priority: 0.9, changefreq: 'monthly' },
      '/contact':                   { priority: 0.85, changefreq: 'monthly' },
      '/marketing':                 { priority: 0.85, changefreq: 'monthly' },

      // Product pages
      '/products/hostsuite':        { priority: 0.85, changefreq: 'weekly' },
      '/products/resiq':            { priority: 0.85, changefreq: 'weekly' },
      '/products/juxtravel':        { priority: 0.7, changefreq: 'monthly' },

      // Location pages — high priority for local SEO
      '/locations/delhi-ncr':       { priority: 0.85, changefreq: 'weekly' },
      '/locations/himachal-pradesh': { priority: 0.85, changefreq: 'weekly' },
      '/locations/uttarakhand':     { priority: 0.85, changefreq: 'weekly' },
      '/locations/rajasthan':       { priority: 0.85, changefreq: 'weekly' },

      // Content & trust pages
      '/about':                     { priority: 0.8, changefreq: 'monthly' },
      '/blogs':                     { priority: 0.8, changefreq: 'daily' },
      '/testimonials':              { priority: 0.75, changefreq: 'monthly' },
      '/faq':                       { priority: 0.75, changefreq: 'monthly' },

      // Academy
      '/training':                  { priority: 0.7, changefreq: 'monthly' },
      '/certification':             { priority: 0.7, changefreq: 'monthly' },

      // Secondary
      '/career':                    { priority: 0.6, changefreq: 'weekly' },
      '/invest':                    { priority: 0.5, changefreq: 'monthly' },

      // Legal
      '/privacy':                   { priority: 0.3, changefreq: 'yearly' },
      '/terms':                     { priority: 0.3, changefreq: 'yearly' },
    };

    // Dynamic location pages (catch any new ones)
    if (path.startsWith('/locations/') && !pageConfig[path]) {
      return {
        loc: path,
        lastmod: new Date().toISOString(),
        priority: 0.85,
        changefreq: 'weekly',
      };
    }

    const custom = pageConfig[path] || {};
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      priority: custom.priority || config.priority,
      changefreq: custom.changefreq || config.changefreq,
    };
  },
};
