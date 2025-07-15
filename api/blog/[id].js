// Sample blog posts data (same as in blog.js)
const samplePosts = [
  {
    id: "1",
    title: "10 Essential Exercises for Building Strength",
    content: "Discover the fundamental exercises that form the foundation of any strength training program. From squats to deadlifts, these movements will help you build a strong, functional body.\n\n1. **Squats** - The king of all exercises, squats work your entire lower body and core.\n\n2. **Deadlifts** - Perfect for building posterior chain strength and overall power.\n\n3. **Push-ups** - A classic bodyweight exercise that builds upper body strength.\n\n4. **Pull-ups** - Essential for developing back and arm strength.\n\n5. **Planks** - Core stability and strength in one simple movement.\n\n6. **Lunges** - Unilateral leg strength and balance training.\n\n7. **Overhead Press** - Builds shoulder strength and stability.\n\n8. **Rows** - Counteracts forward posture and builds back strength.\n\n9. **Dips** - Tricep and chest development.\n\n10. **Burpees** - Full-body conditioning and cardiovascular fitness.\n\nIncorporate these exercises into your routine 2-3 times per week for optimal results.",
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
    content: "Learn how to set up an effective home gym with the right equipment and limited space. We'll cover the must-have items and how to maximize your workout space.\n\n**Essential Equipment for Your Home Gym:**\n\n**1. Adjustable Dumbbells**\nSpace-efficient and versatile, adjustable dumbbells can replace an entire rack of weights.\n\n**2. Resistance Bands**\nPerfect for travel and small spaces, resistance bands provide variable resistance for all muscle groups.\n\n**3. Yoga Mat**\nEssential for floor exercises, stretching, and yoga sessions.\n\n**4. Pull-up Bar**\nA doorway pull-up bar enables upper body training without taking up floor space.\n\n**5. Kettlebell**\nOne or two kettlebells can provide a full-body workout combining strength and cardio.\n\n**Space-Saving Tips:**\n- Use wall-mounted storage for equipment\n- Choose multi-functional equipment\n- Create a dedicated workout area, even if small\n- Consider foldable equipment options\n\n**Budget Considerations:**\nStart with basics and gradually add equipment as your needs and budget allow. Quality over quantity is key for home gym success.",
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
    const { id } = req.query;
    
    const post = samplePosts.find(p => p.id === id && p.is_published);
    
    if (!post) {
      res.status(404).json({ 
        error: 'Blog post not found',
        message: `Blog post with ID ${id} does not exist`
      });
      return;
    }
    
    res.status(200).json(post);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
