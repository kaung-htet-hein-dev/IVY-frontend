import ServiceList from '@/components/services/service-list';
import CTA from '@/components/ui/cta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hair Services - Professional Styling, Cuts & Color',
  description:
    'Explore our comprehensive range of professional hair services including haircuts, styling, coloring, highlights, and treatments. Book your appointment with our expert stylists.',
  keywords: [
    'hair services',
    'haircuts',
    'hair styling',
    'hair coloring',
    'highlights',
    'hair treatments',
    'professional styling',
  ],
  openGraph: {
    title: 'Hair Services - IVY Hair Studio',
    description:
      'Explore our comprehensive range of professional hair services including haircuts, styling, coloring, highlights, and treatments.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of professional hair services designed to bring out your best look.
            From classic cuts to modern styles, our expert stylists have you covered.
          </p>
        </div>

        {/* Service Categories */}
        <ServiceList />

        {/* CTA Section */}
        <CTA />
      </div>
    </div>
  );
}
