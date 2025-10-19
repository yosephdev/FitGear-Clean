// Sample products data
const sampleProducts = [
  {
    id: "1",
    name: "Professional Olympic Barbell",
    description: "High-quality Olympic barbell perfect for deadlifts, squats, and bench press.",
    price: 299.99,
    category: "Strength Training",
    brand: "FitGear Pro",
    images: ["/olympic-barbell.jpg"],
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
    images: ["/premium-yoga-mat.png"],
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
    images: ["/adjustable-dumbbells.jpg"],
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
    images: ["/resistance-bands-exercise.png"],
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
    images: ["/kettlebell-set.jpg"],
    inventory: 40,
    rating: 4.9,
    reviews_count: 60,
    specifications: {"weight": "16kg", "material": "Cast Iron"},
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    name: "Smart Treadmill",
    description: "Interactive treadmill with a large touch screen and virtual running trails.",
    price: 1299.99,
    category: "Cardio Equipment",
    brand: "CardioMax",
    images: ["/smart-treadmill.jpg"],
    inventory: 10,
    rating: 4.9,
    reviews_count: 38,
    specifications: {"speed": "0-12 mph", "incline": "0-15%", "screen": "22-inch HD"},
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    name: "Men's Workout Tank",
    description: "Moisture-wicking and breathable tank top for maximum comfort during workouts.",
    price: 34.99,
    category: "Apparel",
    brand: "FitGear Wear",
    images: ["/mens-workout-tank.jpg"],
    inventory: 75,
    rating: 4.6,
    reviews_count: 42,
    specifications: {"material": "Polyester/Spandex Blend"},
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    name: "Women's Yoga Pants",
    description: "High-waisted and squat-proof yoga pants for ultimate flexibility and support.",
    price: 59.99,
    category: "Apparel",
    brand: "ZenFit",
    images: ["/yoga-pant.jpg"],
    inventory: 60,
    rating: 4.8,
    reviews_count: 95,
    specifications: {"material": "Nylon/Spandex Blend"},
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
