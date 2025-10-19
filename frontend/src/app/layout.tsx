import type { Metadata } from 'next';
import "./globals.css";
import { Inter } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Add this metadata object
export const metadata: Metadata = {
  title: {
    template: '%s | FitGear', // Creates dynamic titles like "Our Products | FitGear"
    default: 'FitGear - Premium Sports Equipment Store',
  },
  description: 'The best place to find high-quality, premium sports and fitness gear.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider> {/* Wrap your components with the provider */}
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}