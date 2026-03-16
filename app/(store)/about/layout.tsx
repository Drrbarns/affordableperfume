import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our story, values, and commitment to quality. From Accra to your doorstep — affordable perfumes, fashion, and more.',
  openGraph: {
    title: 'About Us',
    description: 'Learn about our story and commitment to quality products delivered across Ghana.',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
