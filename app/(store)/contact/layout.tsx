import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us. Customer support, orders, and inquiries. We\'re here to help with your shopping experience.',
  openGraph: {
    title: 'Contact Us',
    description: 'Get in touch with our team. We\'re here to help.',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
