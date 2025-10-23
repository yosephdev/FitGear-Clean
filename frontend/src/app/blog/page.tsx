import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "10 Essential Exercises for Building Strength",
      excerpt: "Discover the fundamental movements that will transform your fitness journey and help you build a strong foundation.",
      category: "Training Tips",
      date: "October 20, 2025",
      readTime: "5 min read",
      image: "/olympic-barbell.jpg"
    },
    {
      id: 2,
      title: "Nutrition Guide for Muscle Recovery",
      excerpt: "Learn what to eat before and after workouts to maximize your gains and speed up recovery time.",
      category: "Nutrition",
      date: "October 18, 2025",
      readTime: "7 min read",
      image: "/premium-yoga-mat.png"
    },
    {
      id: 3,
      title: "Home Gym Setup on a Budget",
      excerpt: "You don't need expensive equipment to get fit. Here's how to create an effective home gym without breaking the bank.",
      category: "Equipment",
      date: "October 15, 2025",
      readTime: "6 min read",
      image: "/adjustable-dumbbells.jpg"
    },
    {
      id: 4,
      title: "The Benefits of Yoga for Athletes",
      excerpt: "Why every athlete should incorporate yoga into their training routine for better flexibility and mental focus.",
      category: "Wellness",
      date: "October 12, 2025",
      readTime: "4 min read",
      image: "/foam-roller.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FitGear Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert advice, training tips, and fitness inspiration to help you reach your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Want to stay updated with our latest content?</p>
          <Button size="lg">Subscribe to Newsletter</Button>
        </div>
      </div>
    </div>
  );
}
