import About from '@/components/home/about';
import Hero from '@/components/home/hero';
import Services from '@/components/home/services';
import Testimonials from '@/components/home/testimonials';
import CTA from '@/components/ui/cta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Hair Salon & Beauty Services',
  description:
    'Premier hair salon offering professional haircuts, styling, coloring, and beauty services. Book your appointment with our expert stylists today.',
  keywords: [
    'hair salon',
    'haircut',
    'hair styling',
    'hair color',
    'beauty salon',
    'professional stylists',
  ],
  openGraph: {
    title: 'IVY Hair Studio - Professional Hair Salon',
    description:
      'Premier hair salon offering professional haircuts, styling, coloring, and beauty services.',
    type: 'website',
    url: 'https://ivy-frontend-xi.vercel.app',
  },
};

// Structured data for search engines
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'IVY Hair Studio',
  description:
    'Professional hair salon offering premium haircuts, styling, coloring, and beauty services',
  url: 'https://ivy-frontend-xi.vercel.app',
  telephone: '+1-555-IVY-HAIR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Beauty Street',
    addressLocality: 'Your City',
    addressRegion: 'Your State',
    postalCode: '12345',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.7128',
    longitude: '-74.0060',
  },
  openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-17:00'],
  priceRange: '$$',
  image: 'https://ivy-frontend-xi.vercel.app/opengraph-image.png',
  sameAs: ['https://www.facebook.com/ivyhairstudiomm'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Haircut & Styling',
          description: 'Professional haircut and styling services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hair Coloring',
          description: 'Expert hair coloring and highlighting services',
        },
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex flex-col">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}
