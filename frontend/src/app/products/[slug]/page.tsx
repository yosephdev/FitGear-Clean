import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product } from '../../types/product';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params
export async function generateStaticParams() {
  const res = await fetch(`${API_BASE_URL}/products`);
  const products: Product[] = await res.json();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Data fetching function
async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image 
            src={product.images?.[0] || '/images/placeholder.jpg'} 
            alt={product.name} 
            width={600}
            height={400}
            className="w-full rounded-lg object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}