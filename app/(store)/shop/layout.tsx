import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our full catalog of perfumes, fashion, electronics, and more. Quality products at affordable prices delivered across Ghana.',
  openGraph: {
    title: 'Shop All Products',
    description: 'Browse perfumes, fashion, and more. Quality products delivered across Ghana.',
    type: 'website',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
