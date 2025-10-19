import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: disallow crawling of a private area
    },
    sitemap: 'https://fitgear.com/sitemap.xml', // Replace with your domain
  };
}
