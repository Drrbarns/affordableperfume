import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our story, values, and commitment to authentic fragrances. From Accra to your doorstep — affordable perfumes in Ghana.',
  openGraph: {
    title: 'About Us',
    description: 'Learn about our story and commitment to authentic perfumes delivered across Ghana.',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
