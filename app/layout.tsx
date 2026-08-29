import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({
  variable: '--font-editorial',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://heaven-furniture-mart.mesperdona348.chatgpt.site'),
  title: 'Heaven Furniture Mart | Bespoke Furniture in Chattogram',
  description:
    'Custom sofas, beds, dining sets, and interior pieces designed and crafted around your space in Chattogram, Bangladesh.',
  keywords: [
    'bespoke furniture Chattogram',
    'custom furniture Bangladesh',
    'luxury furniture Agrabad',
    'interior styling Chattogram',
  ],
  openGraph: {
    title: 'Furniture, Crafted Around You. | Heaven Furniture Mart',
    description: 'Bespoke furniture designed around your space, lifestyle, and taste in Chattogram.',
    type: 'website',
    locale: 'en_BD',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Heaven Furniture Mart — Furniture, Crafted Around You.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Furniture, Crafted Around You. | Heaven Furniture Mart',
    description: 'Bespoke furniture in Chattogram.',
    images: ['/og.png'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: 'Heaven Furniture Mart',
  description: 'Luxury bespoke furniture and interior styling in Chattogram, Bangladesh.',
  foundingDate: '2020',
  founder: { '@type': 'Person', name: 'Abul Kalam Bhuiyan' },
  telephone: '+8801960481983',
  email: 'heavenfurnituremart@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Agrabad Access Road',
    addressLocality: 'Chattogram',
    addressCountry: 'BD',
  },
  sameAs: [
    'https://facebook.com/HeavenFurnitureMart',
    'https://instagram.com/heaven_furniture_ltd',
    'https://youtube.com/@HeavenFurnitureMart',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
