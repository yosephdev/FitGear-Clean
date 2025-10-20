export interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  images?: string[];
  category?: string;
  brand?: string;
  inventory: number;
  rating?: number;
  reviews_count?: number;
  specifications?: Record<string, unknown>;
  is_active?: boolean;
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
  id: string;
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
