export default function HelpCenterPage() {
  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to over 25 countries worldwide. Shipping costs and times vary by location."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day money-back guarantee on all products. Items must be unused and in original packaging."
        },
        {
          q: "How do I start a return?",
          a: "Log into your account, go to Orders, and click 'Return Item'. We'll email you a prepaid return label."
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are processed within 5-7 business days after we receive your return."
        }
      ]
    },
    {
      category: "Products",
      questions: [
        {
          q: "Are your products covered by warranty?",
          a: "Yes, all equipment comes with a minimum 1-year manufacturer's warranty. Premium items have extended warranties."
        },
        {
          q: "Do you offer assembly services?",
          a: "Assembly instructions are included with all products. For large equipment, we offer professional assembly for an additional fee."
        },
        {
          q: "Can I get product recommendations?",
          a: "Absolutely! Contact our fitness experts at support@fitgear.com or call +1 (555) 123-4567."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to frequently asked questions
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((section, idx) => (
            <div key={idx} className="bg-card rounded-xl p-6 border">
              <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
              <div className="space-y-6">
                {section.questions.map((item, qIdx) => (
                  <div key={qIdx}>
                    <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6">Our customer support team is available 24/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15551234567" className="font-semibold">📞 +1 (555) 123-4567</a>
            <a href="mailto:support@fitgear.com" className="font-semibold">✉️ support@fitgear.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
