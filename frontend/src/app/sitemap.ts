import { MetadataRoute } from 'next';

type Product = { slug: string; updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch your products to generate dynamic sitemap entries
  const res = await fetch('https://api.example.com/products');
  const products: Product[] = await res.json();

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://fitgear.com/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
  }));

  return [
    {
      url: 'https://fitgear.com',
      lastModified: new Date(),
    },
    {
      url: 'https://fitgear.com/about',
      lastModified: new Date(),
    },
    ...productEntries,
  ];
}
