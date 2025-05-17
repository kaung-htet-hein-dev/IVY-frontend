import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { services } from '@/utils/data';
import { Clock, ArrowRight } from 'lucide-react';
import CTA from '@/components/ui/cta';

export default function ServicesPage() {
  // Group services by category
  const categorizedServices = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, typeof services>
  );

  const categoryNames = {
    haircut: 'Haircuts',
    styling: 'Styling',
    coloring: 'Coloring',
    treatment: 'Treatments',
  };

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
        {Object.entries(categorizedServices).map(([category, categoryServices]) => (
          <section key={category} className="mb-16" id={category}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b pb-2">
              {categoryNames[category as keyof typeof categoryNames]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryServices.map(service => (
                <Card
                  key={service.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300"
                  id={service.id}
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-rose-600">${service.price}</span>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.duration} min</span>
                      </div>
                    </div>

                    <Link href={`/booking?service=${service.id}`} passHref>
                      <Button className="w-full bg-rose-500 hover:bg-rose-600">
                        Book This Service <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <CTA />
      </div>
    </div>
  );
}
