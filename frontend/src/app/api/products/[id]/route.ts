import { NextResponse } from 'next/server';

// Sample products data
const sampleProducts = [
  {
    id: "1",
    slug: "professional-olympic-barbell",
    name: "Professional Olympic Barbell",
    description: "High-quality Olympic barbell perfect for deadlifts, squats, and bench press. Built with precision-engineered steel and designed for both home and commercial gym use.",
    price: 299.99,
    category: "Strength Training",
    brand: "FitGear Pro",
    images: ["/olympic-barbell.jpg"],
    inventory: 15,
    rating: 4.8,
    reviews_count: 24,
    specifications: { weight: "20kg", length: "220cm", material: "Steel", maxLoad: "700kg" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    slug: "premium-yoga-mat",
    name: "Premium Yoga Mat",
    description: "Non-slip yoga mat with excellent cushioning and grip. Made from natural rubber for maximum comfort and sustainability.",
    price: 49.99,
    category: "Fitness Accessories",
    brand: "ZenFit",
    images: ["/premium-yoga-mat.png"],
    inventory: 25,
    rating: 4.7,
    reviews_count: 32,
    specifications: { thickness: "6mm", material: "Natural Rubber", size: "183cm x 61cm" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    slug: "adjustable-dumbbells-set",
    name: "Adjustable Dumbbells Set",
    description: "Complete adjustable dumbbell set with multiple weight plates. Save space and money with this versatile home gym solution.",
    price: 199.99,
    category: "Strength Training",
    brand: "FitGear Home",
    images: ["/adjustable-dumbbells.jpg"],
    inventory: 8,
    rating: 4.6,
    reviews_count: 18,
    specifications: { weight_range: "5-50lbs", material: "Cast Iron", adjustment: "Quick-Select" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    slug: "resistance-bands-set",
    name: "Resistance Bands Set",
    description: "Professional resistance bands for strength training and rehabilitation. Includes 5 different resistance levels.",
    price: 39.99,
    category: "Fitness Accessories",
    brand: "FlexForce",
    images: ["/resistance-bands-exercise.png"],
    inventory: 30,
    rating: 4.5,
    reviews_count: 45,
    specifications: { resistance_levels: "5", material: "Latex", includes: "Door anchor, handles, ankle straps" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    slug: "smart-treadmill",
    name: "Smart Treadmill",
    description: "Advanced treadmill with built-in programs and heart rate monitor. Connect to fitness apps for a fully integrated workout experience.",
    price: 1299.99,
    category: "Cardio Equipment",
    brand: "RunTech",
    images: ["/smart-treadmill.jpg"],
    inventory: 5,
    rating: 4.9,
    reviews_count: 67,
    specifications: { max_speed: "20km/h", incline: "15%", motor: "3HP", display: "10.1\" Touchscreen" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    slug: "kettlebell-set",
    name: "Kettlebell Set",
    description: "Complete kettlebell set for functional training. Premium cast iron construction with ergonomic handles.",
    price: 159.99,
    category: "Strength Training",
    brand: "IronGrip",
    images: ["/kettlebell-set.jpg"],
    inventory: 12,
    rating: 4.7,
    reviews_count: 28,
    specifications: { weights: "8kg, 12kg, 16kg", material: "Cast Iron", finish: "Powder coated" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    slug: "foam-roller",
    name: "Foam Roller",
    description: "High-density foam roller for muscle recovery and massage. Perfect for pre and post-workout stretching.",
    price: 29.99,
    category: "Fitness Accessories",
    brand: "RecoverPro",
    images: ["/foam-roller.jpg"],
    inventory: 40,
    rating: 4.4,
    reviews_count: 52,
    specifications: { length: "60cm", density: "High", material: "EVA Foam", diameter: "15cm" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    slug: "peloton-style-bike",
    name: "Peloton-Style Indoor Bike",
    description: "Premium indoor cycling bike with digital display. Smooth magnetic resistance and comfortable ergonomic seat.",
    price: 899.99,
    category: "Cardio Equipment",
    brand: "CycleMax",
    images: ["/peloton-style-bike.jpg"],
    inventory: 7,
    rating: 4.8,
    reviews_count: 89,
    specifications: { resistance: "Magnetic", flywheel: "20kg", display: "LCD", adjustable: "Seat & Handlebars" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    slug: "mens-workout-tank",
    name: "Men's Workout Tank",
    description: "Moisture-wicking and breathable tank top for maximum comfort during workouts.",
    price: 34.99,
    category: "Apparel",
    brand: "FitGear Wear",
    images: ["/mens-workout-tank.jpg"],
    inventory: 75,
    rating: 4.6,
    reviews_count: 42,
    specifications: { material: "Polyester/Spandex Blend" },
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    slug: "womens-yoga-pants",
    name: "Women's Yoga Pants",
    description: "High-waisted and squat-proof yoga pants for ultimate flexibility and support.",
    price: 59.99,
    category: "Apparel",
    brand: "ZenFit",
    images: ["/smart-jump-rope.jpg"],
    inventory: 60,
    rating: 4.8,
    reviews_count: 95,
    specifications: { material: "Nylon/Spandex Blend" },
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = sampleProducts.find(p => p.id === params.id || p.slug === params.id);
  
  if (!product) {
    return NextResponse.json(
      { error: 'Product not found', status: 'error' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    product,
    status: 'success'
  });
}
