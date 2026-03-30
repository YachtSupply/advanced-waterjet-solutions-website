import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advanced-waterjet-solutions-pro.boatwork.co';

  const aiCrawlers = [
    'GPTBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Bingbot',
    'Applebot',
    'Googlebot',
    'anthropic-ai',
    'cohere-ai',
    'meta-externalagent',
    'YouBot',
    'CCBot',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      ...aiCrawlers.map((bot) => ({
        userAgent: bot,
        allow: '/',
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
