import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Target,
  Award,
  Users,
  Heart,
  TrendingUp,
  Shield,
  Clock,
  Star,
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Years of Excellence', value: '15+', icon: Award },
    { label: 'Happy Customers', value: '50K+', icon: Users },
    { label: 'Products Sold', value: '200K+', icon: TrendingUp },
    { label: 'Customer Rating', value: '4.9/5', icon: Star },
  ];

  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'We source only the highest quality equipment from trusted manufacturers worldwide.',
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Your fitness journey is our priority. We provide exceptional support every step of the way.',
    },
    {
      icon: Shield,
      title: 'Guaranteed Satisfaction',
      description: '30-day money-back guarantee on all products. Your satisfaction is our commitment.',
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping with real-time tracking on all orders.',
    },
  ];

  const milestones = [
    { year: '2010', event: 'FitGear founded with a vision to make quality fitness equipment accessible' },
    { year: '2013', event: 'Expanded to 5 retail locations and launched online store' },
    { year: '2017', event: 'Reached 10,000 satisfied customers milestone' },
    { year: '2020', event: 'Introduced our own premium equipment line' },
    { year: '2023', event: 'Opened international shipping to 25+ countries' },
    { year: '2025', event: 'Celebrating 50,000+ customers and growing strong' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Empowering Your Fitness Journey Since 2010
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 text-pretty leading-relaxed">
              At FitGear, we believe everyone deserves access to premium fitness equipment that helps them achieve their goals. 
              We&apos;re more than just a store – we&apos;re your partner in building a healthier, stronger you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary transition-colors">
                <CardContent className="pt-8 pb-6">
                  <stat.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Making fitness accessible, affordable, and enjoyable for everyone
              </p>
            </div>
            <Card className="border-2">
              <CardContent className="p-8 md:p-12">
                <p className="text-lg leading-relaxed mb-6">
                  FitGear was born from a simple idea: quality fitness equipment shouldn&apos;t be a luxury. 
                  Founded in 2010 by fitness enthusiasts who were frustrated with overpriced, low-quality gear, 
                  we set out to change the industry.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Today, we&apos;re proud to serve over 50,000 customers worldwide, offering everything from professional-grade 
                  strength equipment to yoga essentials. Every product is carefully selected and tested by our team to ensure 
                  it meets our rigorous standards.
                </p>
                <p className="text-lg leading-relaxed">
                  Whether you&apos;re setting up your first home gym or upgrading your professional facility, 
                  FitGear has the equipment, expertise, and support to help you succeed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all hover:border-primary">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones that shaped FitGear into what it is today
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Badge variant="secondary" className="text-lg px-4 py-1">
                          {milestone.year}
                        </Badge>
                      </div>
                      <p className="text-lg flex-1">{milestone.event}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who&apos;ve transformed their fitness with FitGear equipment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
