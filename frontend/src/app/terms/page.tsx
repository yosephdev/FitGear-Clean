export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: October 23, 2025</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using FitGear&apos;s website and services, you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
            <p className="text-muted-foreground mb-4">You agree to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Provide accurate and complete information</li>
              <li>• Maintain the security of your account credentials</li>
              <li>• Use the service only for lawful purposes</li>
              <li>• Not attempt to interfere with or disrupt the service</li>
              <li>• Not use automated tools to access the service without permission</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Orders and Payments</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>• All orders are subject to acceptance and product availability</p>
              <p>• Prices are subject to change without notice</p>
              <p>• We reserve the right to cancel orders at any time</p>
              <p>• Payment must be received before order fulfillment</p>
              <p>• Promotional codes cannot be combined unless stated otherwise</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
            <p className="text-muted-foreground">
              We strive to provide accurate product descriptions and images. However, we do not warrant 
              that product descriptions, colors, or other content are accurate, complete, or error-free.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on this website, including text, graphics, logos, and images, is the property 
              of FitGear and protected by copyright and trademark laws. Unauthorized use is prohibited.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              FitGear shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from the use of our products or services. Our total liability shall not exceed the 
              amount paid for the product or service.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="font-semibold">legal@fitgear.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
