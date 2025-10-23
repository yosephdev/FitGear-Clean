export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Shipping Information</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-card rounded-xl p-8 border mb-8">
            <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Standard Shipping</h3>
                  <p className="text-sm text-muted-foreground">3-5 business days</p>
                </div>
                <span className="font-bold">$10</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Express Shipping</h3>
                  <p className="text-sm text-muted-foreground">1-2 business days</p>
                </div>
                <span className="font-bold">$25</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over $100</p>
                </div>
                <span className="font-bold text-primary">FREE</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border mb-8">
            <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
            <p className="text-muted-foreground mb-4">
              We ship to over 25 countries worldwide. International shipping times vary by destination:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Canada & Mexico: 5-7 business days</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Europe: 7-10 business days</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Asia & Australia: 10-14 business days</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
            <p className="text-muted-foreground">
              Once your order ships, you&apos;ll receive a tracking number via email. 
              You can track your package 24/7 through our website or directly with the carrier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
