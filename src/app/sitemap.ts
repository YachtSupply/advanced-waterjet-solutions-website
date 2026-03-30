import type { MetadataRoute } from 'next';
import { getSiteData } from '@/lib/siteData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advanced-waterjet-solutions-pro.boatwork.co';
  const site = await getSiteData();

  const routes = ['', '/about', '/services', '/contact'];

  if (site.portfolio.length > 0) {
    routes.push('/portfolio');
  }

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
