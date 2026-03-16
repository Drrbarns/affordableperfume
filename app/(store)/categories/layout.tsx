import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop by Category',
  description: 'Browse our products by category. Perfumes, fashion, electronics, bags, shoes and more from Accra, Ghana.',
  openGraph: {
    title: 'Shop by Category',
    description: 'Browse products by category. Quality products delivered across Ghana.',
    type: 'website',
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
