'use client';

import BookingServiceSelection from '@/components/booking/booking-service-selection';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Redirect to service page if service is in URL parameters
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      router.push(`/booking/${serviceId}`);
    }
  }, [searchParams, router]);

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Select a Service</h1>
            <p className="text-gray-600">Choose from our range of professional hair services</p>
          </div>

          {/* Service Selection */}
          <BookingServiceSelection />
        </div>
      </div>
    </div>
  );
}
