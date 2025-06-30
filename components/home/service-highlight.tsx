import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getServices } from '@/lib/fetch/fetcher';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ServiceHighlight() {
  const { data: highlightServices, error } = await getServices();

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {highlightServices?.map(service => (
        <Card
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          key={service.id}
        >
          <div className="relative h-48 w-full">
            <Image src={service.image} alt={service.name} fill style={{ objectFit: 'cover' }} />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-rose-600">{service.price} MMK</span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{service.duration_minute} min</span>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <Link href={`/services#${service.id}`} passHref className="flex-1">
                <Button variant="outline" className="w-full">
                  Details
                </Button>
              </Link>
              <Link href={`/booking/${service.id}`} passHref className="flex-1">
                <Button className="w-full bg-rose-500 hover:bg-rose-600">Book</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
