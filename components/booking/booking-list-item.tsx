'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/types/service';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const BookingListItem = ({ service }: { service: Service }) => {
  const handleServiceSelect = (service: Service) => {
    redirect(`/booking/${service.id}`);
  };

  return (
    <Card
      key={service.id}
      className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => handleServiceSelect(service)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-1/4 h-48 sm:h-auto">
          <Image src={service.image} alt={service.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <CardContent className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-lg mb-2">{service.name}</h4>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-rose-600">${service.price}</span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{service.duration_minute} min</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
