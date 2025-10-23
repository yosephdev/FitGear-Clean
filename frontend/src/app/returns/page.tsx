export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Exchanges</h1>
        <p className="text-xl text-muted-foreground mb-8">30-Day Money-Back Guarantee</p>
        
        <div className="space-y-8">
          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Our Promise</h2>
            <p className="text-muted-foreground mb-4">
              We want you to be completely satisfied with your purchase. If you&apos;re not happy 
              with any product, you can return it within 30 days for a full refund or exchange.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-semibold mb-1">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">Start online in minutes</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold mb-1">Free Return Shipping</h3>
                <p className="text-sm text-muted-foreground">We cover the cost</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold mb-1">Fast Refunds</h3>
                <p className="text-sm text-muted-foreground">5-7 business days</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Return Process</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <h3 className="font-semibold mb-1">Initiate Return</h3>
                  <p className="text-muted-foreground">Log into your account and select the item you want to return.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <h3 className="font-semibold mb-1">Print Label</h3>
                  <p className="text-muted-foreground">We&apos;ll email you a prepaid return shipping label immediately.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <h3 className="font-semibold mb-1">Ship It Back</h3>
                  <p className="text-muted-foreground">Pack the item securely and drop it off at any carrier location.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</span>
                <div>
                  <h3 className="font-semibold mb-1">Get Refund</h3>
                  <p className="text-muted-foreground">Once we receive your return, we&apos;ll process your refund within 5-7 days.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-4">Return Requirements</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Items must be unused and in original condition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Original packaging and tags must be included</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Return must be initiated within 30 days of delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Proof of purchase required</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
