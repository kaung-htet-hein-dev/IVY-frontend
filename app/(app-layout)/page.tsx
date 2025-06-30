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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" />
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
