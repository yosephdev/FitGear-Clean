import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product } from '../../../types/product';

const API_BASE_URL = process.env.API_BASE_URL || 'https://fit-gear-backend.vercel.app/api';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params with fallback
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      // Add cache and timeout for build time
      next: { revalidate: 3600 }, // 1 hour
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    if (!res.ok) {
      console.warn('Failed to fetch products for static generation');
      return [];
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Backend returned non-JSON response during build');
      return [];
    }
    
    const products: Product[] = await res.json();
    
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.warn('Error during static generation, using fallback:', error);
    // Return some fallback slugs to allow build to proceed
    return [
      { slug: 'premium-yoga-mat' },
      { slug: 'adjustable-dumbbells' },
      { slug: 'resistance-bands-set' }
    ];
  }
}

// Data fetching function with better error handling
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
      next: { revalidate: 60 } // 1 minute
    });
    
    if (!res.ok) {
      return null;
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Backend returned non-JSON response for product:', slug);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
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
