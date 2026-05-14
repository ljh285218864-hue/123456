import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShareMall',
  description: 'A curated storefront marketplace.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
