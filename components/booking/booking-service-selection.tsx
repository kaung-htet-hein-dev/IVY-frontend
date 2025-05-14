import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/lib/data";
import { Clock } from "lucide-react";

interface BookingServiceSelectionProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

export default function BookingServiceSelection({
  services,
  onSelectService,
}: BookingServiceSelectionProps) {
  // Group services by category for better organization
  const categorizedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const categoryNames = {
    haircut: "Haircuts",
    styling: "Styling",
    coloring: "Coloring",
    treatment: "Treatments"
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Please select the service you would like to book:
      </p>

      {Object.entries(categorizedServices).map(([category, categoryServices]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            {categoryNames[category as keyof typeof categoryNames]}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {categoryServices.map((service) => (
              <Card 
                key={service.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                onClick={() => onSelectService(service)}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-1/4 h-48 sm:h-auto">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      style={{ objectFit: "cover" }}
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
                        <span>{service.duration} min</span>
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
  );
}