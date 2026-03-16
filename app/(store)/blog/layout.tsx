import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, guides, and updates from our team. Stay informed about new products, offers, and shopping in Ghana.',
  openGraph: {
    title: 'Blog',
    description: 'Tips, guides, and updates. Stay informed about new products and offers.',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
