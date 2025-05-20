'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useServices } from '@/hooks/use-services';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LoadingLottie } from '../ui/lottie';

export default function ServiceList() {
  const { categorizedServices, isLoading } = useServices();

  if (isLoading) return <LoadingLottie />;

  return (
    <>
      {Object.entries(categorizedServices).map(([category, services]) => (
        <section key={category} className="mb-16" id={category}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <Card
                key={service.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
                id={service.id}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={service.image || ''}
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
                      <span>{service.durationMinute} min</span>
                    </div>
                  </div>

                  <Link href={`/booking/${service.id}`} passHref>
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
    </>
  );
}
