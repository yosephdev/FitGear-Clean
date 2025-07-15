// Sample blog posts data
const samplePosts = [
  {
    id: "1",
    title: "10 Essential Exercises for Building Strength",
    content: "Discover the fundamental exercises that form the foundation of any strength training program. From squats to deadlifts, these movements will help you build a strong, functional body.",
    author: "FitGear Team",
    category: "Strength Training",
    tags: ["strength", "exercises", "beginner"],
    featured_image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Home Gym Setup: Essential Equipment",
    content: "Learn how to set up an effective home gym with the right equipment and limited space. We'll cover the must-have items and how to maximize your workout space.",
    author: "FitGear Team",
    category: "Home Gym",
    tags: ["home gym", "equipment", "setup"],
    featured_image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
    is_published: true,
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
    const posts = samplePosts.filter(p => p.is_published);
    
    res.status(200).json({
      posts: posts
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
