export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Size Guide</h1>
        <p className="text-xl text-muted-foreground mb-12">Find your perfect fit</p>
        
        <div className="space-y-12">
          {/* Apparel Sizing */}
          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Apparel Sizing</h2>
            
            <h3 className="text-xl font-semibold mb-4">Men&apos;s Sizing</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-left">Size</th>
                    <th className="border p-3 text-left">Chest (inches)</th>
                    <th className="border p-3 text-left">Waist (inches)</th>
                    <th className="border p-3 text-left">Hips (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-3">XS</td><td className="border p-3">32-34</td><td className="border p-3">26-28</td><td className="border p-3">32-34</td></tr>
                  <tr><td className="border p-3">S</td><td className="border p-3">34-36</td><td className="border p-3">28-30</td><td className="border p-3">34-36</td></tr>
                  <tr><td className="border p-3">M</td><td className="border p-3">38-40</td><td className="border p-3">32-34</td><td className="border p-3">38-40</td></tr>
                  <tr><td className="border p-3">L</td><td className="border p-3">42-44</td><td className="border p-3">36-38</td><td className="border p-3">42-44</td></tr>
                  <tr><td className="border p-3">XL</td><td className="border p-3">46-48</td><td className="border p-3">40-42</td><td className="border p-3">46-48</td></tr>
                  <tr><td className="border p-3">XXL</td><td className="border p-3">50-52</td><td className="border p-3">44-46</td><td className="border p-3">50-52</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-4">Women&apos;s Sizing</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-left">Size</th>
                    <th className="border p-3 text-left">Bust (inches)</th>
                    <th className="border p-3 text-left">Waist (inches)</th>
                    <th className="border p-3 text-left">Hips (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-3">XS</td><td className="border p-3">31-32</td><td className="border p-3">24-25</td><td className="border p-3">34-35</td></tr>
                  <tr><td className="border p-3">S</td><td className="border p-3">33-34</td><td className="border p-3">26-27</td><td className="border p-3">36-37</td></tr>
                  <tr><td className="border p-3">M</td><td className="border p-3">35-36</td><td className="border p-3">28-29</td><td className="border p-3">38-39</td></tr>
                  <tr><td className="border p-3">L</td><td className="border p-3">37-39</td><td className="border p-3">30-32</td><td className="border p-3">40-42</td></tr>
                  <tr><td className="border p-3">XL</td><td className="border p-3">40-42</td><td className="border p-3">33-35</td><td className="border p-3">43-45</td></tr>
                  <tr><td className="border p-3">XXL</td><td className="border p-3">43-45</td><td className="border p-3">36-38</td><td className="border p-3">46-48</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Measuring Tips */}
          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">How to Measure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Chest/Bust</h3>
                <p className="text-sm text-muted-foreground">
                  Measure around the fullest part of your chest, keeping the tape measure level under your arms.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Waist</h3>
                <p className="text-sm text-muted-foreground">
                  Measure around your natural waistline, typically the narrowest part of your torso.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Hips</h3>
                <p className="text-sm text-muted-foreground">
                  Measure around the fullest part of your hips, approximately 8 inches below your waist.
                </p>
              </div>
            </div>
          </div>

          {/* Equipment Sizing */}
          <div className="bg-card rounded-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Equipment Recommendations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Yoga Mats</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Standard: 68&quot; x 24&quot; (ideal for most users up to 6&apos;2&quot;)</p>
                  <p>Long: 72&quot; x 24&quot; (recommended for users over 6&apos;2&quot;)</p>
                  <p>Extra Wide: 68&quot; x 30&quot; (perfect for dynamic movements)</p>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Resistance Bands</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Light: 5-15 lbs (beginners, rehabilitation)</p>
                  <p>Medium: 15-30 lbs (general fitness)</p>
                  <p>Heavy: 30-50 lbs (advanced training)</p>
                  <p>Extra Heavy: 50+ lbs (strength athletes)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
