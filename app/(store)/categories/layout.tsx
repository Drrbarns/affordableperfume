import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop by Category',
  description: 'Browse perfumes by category, fragrance family, and scent profile with nationwide delivery from Accra, Ghana.',
  openGraph: {
    title: 'Shop by Category',
    description: 'Browse perfumes by category and discover your signature scent.',
    type: 'website',
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
