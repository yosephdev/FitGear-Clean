import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product } from '../../../types/product';

const API_BASE_URL = process.env.API_BASE_URL || 'https://fit-gear-backend.vercel.app/api';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Use static fallback data - NO API CALLS DURING BUILD
const fallbackProducts: Product[] = [
  {
    product_id: "1",
    name: "Premium Yoga Mat",
    price: 49.99,
    description: "High-quality non-slip yoga mat for all your fitness needs",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"],
    category: "yoga",
    slug: "premium-yoga-mat",
    stock: 50,
    featured: true
  },
  {
    product_id: "2",
    name: "Adjustable Dumbbells", 
    price: 129.99,
    description: "Space-saving adjustable dumbbell set for home workouts",
    images: ["https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400"],
    category: "weights",
    slug: "adjustable-dumbbells",
    stock: 25,
    featured: true
  },
  {
    product_id: "3",
    name: "Resistance Bands Set",
    price: 24.99,
    description: "Set of 5 resistance bands for strength training and physical therapy",
    images: ["https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400"],
    category: "accessories", 
    slug: "resistance-bands-set",
    stock: 100,
    featured: false
  }
];

// Generate static params using ONLY static data
export async function generateStaticParams() {
  return fallbackProducts.map((product) => ({
    slug: product.slug,
  }));
}

// Data fetching function - will work at runtime
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.warn('Failed to fetch product from API, using fallback');
      return fallbackProducts.find(p => p.slug === slug) || null;
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('API returned non-JSON response, using fallback');
      return fallbackProducts.find(p => p.slug === slug) || null;
    }
    
    return await res.json();
  } catch (error) {
    console.warn('Error fetching product, using fallback:', error);
    return fallbackProducts.find(p => p.slug === slug) || null;
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