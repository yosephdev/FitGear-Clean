export interface Product {
  product_id: string;
  name: string;
  price: number;
  description: string;
  images?: string[];
  category?: string;
  slug: string;
  stock?: number;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  order_id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}
