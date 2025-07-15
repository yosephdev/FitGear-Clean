// Sample products data (same as in products.js)
const sampleProducts = [
  {
    id: "1",
    name: "Professional Olympic Barbell",
    description: "High-quality Olympic barbell perfect for deadlifts, squats, and bench press.",
    price: 299.99,
    category: "Strength Training",
    brand: "FitGear Pro",
    images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500"],
    inventory: 15,
    rating: 4.8,
    reviews_count: 24,
    specifications: {"weight": "20kg", "length": "220cm", "material": "Steel"},
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Premium Yoga Mat",
    description: "Non-slip yoga mat with excellent cushioning and grip.",
    price: 49.99,
    category: "Fitness Accessories",
    brand: "ZenFit",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"],
    inventory: 25,
    rating: 4.7,
    reviews_count: 32,
    specifications: {"thickness": "6mm", "material": "Natural Rubber"},
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Adjustable Dumbbells Set",
    description: "Complete adjustable dumbbell set with multiple weight plates.",
    price: 199.99,
    category: "Strength Training",
    brand: "FitGear Home",
    images: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500"],
    inventory: 8,
    rating: 4.6,
    reviews_count: 18,
    specifications: {"weight_range": "5-50lbs", "material": "Cast Iron"},
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Resistance Bands Set",
    description: "Complete set of resistance bands with different resistance levels.",
    price: 29.99,
    category: "Fitness Accessories",
    brand: "FlexFit",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"],
    inventory: 30,
    rating: 4.5,
    reviews_count: 15,
    specifications: {"resistance_levels": "Light, Medium, Heavy", "material": "Latex"},
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    name: "Pro Kettlebell",
    description: "Competition-grade kettlebell for building strength and endurance.",
    price: 79.99,
    category: "Fitness Accessories",
    brand: "KettlePro",
    images: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500"],
    inventory: 40,
    rating: 4.9,
    reviews_count: 60,
    specifications: {"weight": "16kg", "material": "Cast Iron"},
    is_active: true,
    created_at: new Date().toISOString()
  }
];

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    
    const product = sampleProducts.find(p => p.id === id && p.is_active);
    
    if (!product) {
      res.status(404).json({ 
        error: 'Product not found',
        message: `Product with ID ${id} does not exist`
      });
      return;
    }
    
    res.status(200).json(product);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
