import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: October 23, 2025</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Name, email address, phone number, and shipping address</li>
              <li>• Payment information (processed securely through our payment partners)</li>
              <li>• Purchase history and product preferences</li>
              <li>• Communications with our customer service team</li>
              <li>• Account credentials and profile information</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Process and fulfill your orders</li>
              <li>• Send order confirmations and shipping updates</li>
              <li>• Provide customer support</li>
              <li>• Send marketing communications (with your consent)</li>
              <li>• Improve our products and services</li>
              <li>• Detect and prevent fraud</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li>• 256-bit SSL encryption for all transactions</li>
              <li>• Secure data storage with regular backups</li>
              <li>• PCI DSS compliance for payment processing</li>
              <li>• Regular security audits and updates</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate data</li>
              <li>• Request deletion of your account</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Export your data</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold">Email: privacy@fitgear.com</p>
              <p className="font-semibold">Phone: +1 (555) 123-4567</p>
              <p className="font-semibold">Address: 123 Fitness Street, Gym City, ST 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
