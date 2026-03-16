import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about orders, shipping, returns, payments, and more. Find answers to common questions.',
  openGraph: {
    title: 'FAQs',
    description: 'Find answers to frequently asked questions about our store.',
    type: 'website',
  },
};

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
