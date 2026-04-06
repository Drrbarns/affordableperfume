import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Perfumes',
  description: 'Browse our full catalog of authentic perfumes and fragrances at affordable prices with fast delivery across Ghana.',
  openGraph: {
    title: 'Shop All Perfumes',
    description: 'Browse authentic perfumes and fragrances delivered across Ghana.',
    type: 'website',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
