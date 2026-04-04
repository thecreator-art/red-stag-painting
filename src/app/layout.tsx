import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import StickyMobileBar from '@/components/layout/StickyMobileBar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/ui/BackToTop';
import { generateLocalBusinessSchema, generateFAQSchema } from '@/lib/schema';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'House Painter Los Angeles | Interior & Exterior Painting | Red Stag Painting',
  description:
    'Professional house painting in Los Angeles. Interior, exterior, cabinet, and deck staining. Serving Beverly Hills, Pasadena, Santa Monica & 30 neighborhoods. Free estimates. Call today.',
  metadataBase: new URL('https://redstagpainting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'House Painter Los Angeles | Red Stag Painting',
    description:
      'Professional house painting in Los Angeles. Interior, exterior, and cabinet painting. Free estimates.',
    url: 'https://redstagpainting.com',
    siteName: 'Red Stag Painting',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema();

  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* Google Analytics 4 placeholder */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" /> */}
        {/* Google Tag Manager placeholder */}
        {/* <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');` }} /> */}
      </head>
      <body className="min-h-screen font-body text-text-body bg-bg-primary antialiased pb-[60px] md:pb-0">
        <ScrollProgress />
        <SiteHeader />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
        <BackToTop />
      </body>
    </html>
  );
}
