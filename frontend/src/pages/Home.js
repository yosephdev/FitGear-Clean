import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, blogAPI } from '../services/api';
import {
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  HeadphonesIcon,
  StarIcon,
  ArrowRightIcon,
  CheckIcon,
} from 'lucide-react';
import { Button } from '../components/ui/button.tsx';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const [productsResponse, postsResponse] = await Promise.all([
          productsAPI.getProducts({ limit: 4 }),
          blogAPI.getPosts({ limit: 3 }),
        ]);

        console.log('Products Response:', productsResponse);
        console.log('Posts Response:', postsResponse);

        setFeaturedProducts(productsResponse.data.products || []);
        setBlogPosts(postsResponse.data.posts || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setFeaturedProducts([]);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const features = [
    {
      name: 'Free Shipping',
      description: 'On orders over $100',
      icon: TruckIcon,
    },
    {
      name: 'Quality Guarantee',
      description: 'All products warranted',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Secure Payment',
      description: 'Your data is protected',
      icon: CreditCardIcon,
    },
    {
      name: '24/7 Support',
      description: 'Always here to help',
      icon: HeadphonesIcon,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Personal Trainer',
      content:
        'The quality of FitGear equipment is unmatched. My clients have seen incredible results and the durability is outstanding.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Gym Owner',
      content:
        'Outstanding customer service and lightning-fast delivery. I recommend FitGear to every fitness enthusiast I meet.',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Fitness Enthusiast',
      content:
        'The yoga mats are incredibly comfortable and built to last. Perfect for my daily practice and they look amazing too.',
      rating: 5,
    },
  ];

  const stats = [
    { name: 'Happy Customers', value: '10,000+' },
    { name: 'Products Sold', value: '50,000+' },
    { name: 'Years Experience', value: '15+' },
    { name: 'Countries Served', value: '25+' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/FitGear_Website_Hero_Section_Video.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay for more visible video */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.05),transparent_50%)] pointer-events-none z-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="max-w-4xl mx-auto text-center shadow-xl rounded-2xl bg-black/20 backdrop-blur-sm p-8 md:p-14">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 shadow">
              Premium Fitness Equipment
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight tracking-tight drop-shadow text-white">
              Transform Your Fitness Journey
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 text-pretty max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              Discover premium sports equipment and accessories designed to help you reach your
              fitness goals faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 h-12" asChild>
                <Link to="/products">
                  Shop Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8 h-12" asChild>
                <Link to="/blog">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance text-foreground">
              Why Choose <span className="text-secondary">FitGear</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              We're committed to providing the best fitness equipment and exceptional service to
              help you succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.name}
                className="border-0 shadow-lg bg-card hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-5 bg-secondary rounded-full flex items-center justify-center shadow-md">
                    <feature.icon className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.name}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance text-foreground">
              Featured <span className="text-secondary">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Discover our most popular fitness equipment, trusted by thousands of satisfied
              customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No featured products are available at the moment.
                </p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="primary" asChild>
              <Link to="/products">
                View All Products
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.name} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg text-foreground/80">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Don't just take our word for it. Here's what our customers have to say about their
              experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-md">
                      <span className="text-secondary-foreground font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto border-0 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
                Stay Updated with <span className="text-secondary">FitGear</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                Get the latest fitness tips, product launches, and exclusive offers delivered to
                your inbox.
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 bg-muted"
                />
                <Button type="submit" size="lg" className="h-12 px-8">
                  Subscribe
                </Button>
              </form>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-[hsl(var(--secondary))]" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-[hsl(var(--secondary))]" />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
