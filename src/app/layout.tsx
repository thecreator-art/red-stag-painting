import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import StickyMobileBar from '@/components/layout/StickyMobileBar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/ui/BackToTop';
import { GA_MEASUREMENT_ID, GTM_ID, SITE_URL } from '@/lib/constants';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
} from '@/lib/schema';

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
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: 'House Painter Los Angeles | Red Stag Painting',
    description:
      'Professional house painting in Los Angeles. Interior, exterior, and cabinet painting. Free estimates.',
    url: SITE_URL,
    siteName: 'Red Stag Painting',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Red Stag Painting — Los Angeles house painting contractor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Painter Los Angeles | Red Stag Painting',
    description:
      'Professional house painting in Los Angeles. Free estimates within 24 hours.',
    images: ['/images/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#C23B2B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <head>
        {GTM_ID ? (
          <Script
            id="gtm-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        ) : null}
        {!GTM_ID && GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-base"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="min-h-screen font-body text-text-body bg-bg-primary antialiased pb-[60px] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateOrganizationSchema(),
              generateWebSiteSchema(),
              generateLocalBusinessSchema(),
            ]),
          }}
        />
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileBar />
        <BackToTop />
      </body>
    </html>
  );
}
