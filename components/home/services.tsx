import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const ServiceHighlight = dynamic(() => import('@/components/home/service-highlight'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />,
});

export default function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of hair services to meet your needs. From classic cuts to
            transformative treatments, our expert stylists are here to help you look and feel your
            best.
          </p>
        </div>

        <ServiceHighlight />

        <div className="text-center mt-12">
          <Link href="/services" passHref>
            <Button className="bg-rose-500 hover:bg-rose-600">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
