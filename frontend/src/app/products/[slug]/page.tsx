import { notFound } from 'next/navigation';
import { Product } from '../../../types/product';
import ProductDetail from '@/components/ProductDetail';
import { apiBaseUrl } from '@/lib/api';

const API_BASE_URL = apiBaseUrl();

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Disable static generation for product pages since we're using dynamic IDs
export const dynamic = 'force-dynamic';

// Data fetching function - will work at runtime
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
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

  return <ProductDetail product={product} />;
}