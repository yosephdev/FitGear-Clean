// Sample products data
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
    const { category, limit = 50 } = req.query;
    
    let products = sampleProducts.filter(p => p.is_active);
    
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    products = products.slice(0, parseInt(limit));
    
    res.status(200).json({
      products: products
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
