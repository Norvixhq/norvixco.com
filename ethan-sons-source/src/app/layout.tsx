import { asset } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallBar from '@/components/StickyCallBar';
import { business } from '@/data/business';
import { organizationSchema, websiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Electricians in Addison, TX`,
    template: `%s | ${business.name}`,
  },
  description:
    'Residential and commercial electricians serving Addison, TX and the surrounding North Texas area. Repairs, panel upgrades, EV chargers, lighting and safety inspections.',
  applicationName: business.name,
  icons: {
    icon: [
      { url: asset('/favicon.ico'), sizes: 'any' },
      { url: asset('/icon-32.png'), type: 'image/png', sizes: '32x32' },
      { url: asset('/icon-512.png'), type: 'image/png', sizes: '512x512' },
    ],
    apple: asset('/icon-180.png'),
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: '#002446',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Public+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {/*
          Analytics placeholder — intentionally empty.
          No Google Analytics, Meta Pixel, or any other tracking script is
          installed. Add tags here only once the client provides their own IDs.
        */}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
