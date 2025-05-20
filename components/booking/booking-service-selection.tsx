import { Card, CardContent } from '@/components/ui/card';
import { useServices } from '@/hooks/use-services';
import { Service } from '@/store/api/service/types';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoadingLottie } from '../ui/lottie';

export default function BookingServiceSelection() {
  const { categorizedServices, isLoading } = useServices();
  const router = useRouter();

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    router.push(`/booking/${service.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingLottie />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div>
        <p className="text-gray-600 mb-6">Please select the service you would like to book:</p>

        {Object.entries(categorizedServices).map(([category, categoryServices]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 gap-4">
              {categoryServices.map(service => (
                <Card
                  key={service.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-1/4 h-48 sm:h-auto">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
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
                          <span>{service.durationMinute} min</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
