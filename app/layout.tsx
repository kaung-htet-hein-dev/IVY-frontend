import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'IVY Hair Studio - Professional Hair Salon & Beauty Services',
    template: '%s | IVY Hair Studio',
  },
  description:
    'Book your next haircut, styling, color, or beauty service at IVY Hair Studio. Professional hair salon offering premium services with expert stylists. Schedule your appointment today.',
  keywords: [
    'hair salon',
    'hair stylist',
    'haircut',
    'hair color',
    'hair styling',
    'beauty salon',
    'professional hair services',
    'IVY Hair Studio',
  ],
  authors: [{ name: 'IVY Hair Studio' }],
  creator: 'IVY Hair Studio',
  publisher: 'IVY Hair Studio',
  metadataBase: new URL('https://ivy-frontend-xi.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ivy-frontend-xi.vercel.app',
    title: 'IVY Hair Studio - Professional Hair Salon & Beauty Services',
    description:
      'Book your next haircut, styling, color, or beauty service at IVY Hair Studio. Professional hair salon offering premium services with expert stylists.',
    siteName: 'IVY Hair Studio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'IVY Hair Studio - Professional Hair Salon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IVY Hair Studio - Professional Hair Salon & Beauty Services',
    description:
      'Book your next haircut, styling, color, or beauty service at IVY Hair Studio. Professional hair salon offering premium services with expert stylists.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '89W-eK5Hhii6edywWb3G_-H0IAU32dXQtBtucijDFtM',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Additional SEO meta tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#be185d" />
          <link rel="canonical" href="https://ivy-frontend-xi.vercel.app" />
        </head>
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
