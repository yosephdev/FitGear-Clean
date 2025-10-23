export default function DealsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
            HOT DEALS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Limited Time Offers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Save big on our best fitness equipment. These deals won&apos;t last long!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Flash Sale</h2>
            <p className="text-xl mb-6">Up to 40% off strength training equipment</p>
            <p className="text-sm opacity-90">Ends in 48 hours</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Bundle & Save</h2>
            <p className="text-xl mb-6">Buy 3 items, get 20% off your entire order</p>
            <p className="text-sm opacity-90">Limited time offer</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-8 border">
          <h3 className="text-2xl font-bold mb-6">Current Promotions</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl">🏋️</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Free Shipping Weekend</h4>
                <p className="text-muted-foreground">Free shipping on all orders over $50. No code needed.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl">💪</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">New Customer Discount</h4>
                <p className="text-muted-foreground">Get 15% off your first order with code: WELCOME15</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl">🎁</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Referral Rewards</h4>
                <p className="text-muted-foreground">Refer a friend and both get $25 off your next purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
