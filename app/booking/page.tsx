'use client';

import BookingServiceSelection from '@/components/booking/booking-service-selection';
import { Service, services } from '@/utils/data';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect to service page if service is in URL parameters
  useEffect(() => {
    axios.get('/api/movies').then(res => {
      console.log(res.data);
    });

    const serviceId = searchParams.get('service');
    if (serviceId) {
      router.push(`/booking/${serviceId}`);
    }
  }, [searchParams, router]);

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    router.push(`/booking/${service.id}`);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Select a Service</h1>
            <p className="text-gray-600">Choose from our range of professional hair services</p>
          </div>

          {/* Service Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <BookingServiceSelection services={services} onSelectService={handleServiceSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
