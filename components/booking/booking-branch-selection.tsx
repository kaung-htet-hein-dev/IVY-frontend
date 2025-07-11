'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Clock, MapPin, Phone } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBranches } from '@/hooks/booking/use-booking';
import { Branch } from '@/types/branch';
import { useBooking } from '@/providers/booking-context';

interface BookingBranchSelectionProps {
  selectedBranchId: string | undefined;
  onBranchSelect: (branchID: string) => void;
}

export default function BookingBranchSelection({
  selectedBranchId,
  onBranchSelect,
}: BookingBranchSelectionProps) {
  const { service } = useBooking();
  // const { branches, isLoading } = useGetBranches(serviceID);

  // if (isLoading) {
  //   return (
  //     <div className="space-y-6">
  //       <div className="text-center md:text-left space-y-2">
  //         <Skeleton className="h-8 w-64 mx-auto md:mx-0" />
  //         <Skeleton className="h-5 w-48 mx-auto md:mx-0" />
  //       </div>
  //       <div className="grid gap-4 max-w-3xl mx-auto">
  //         {[1, 2].map(i => (
  //           <Skeleton key={i} className="h-36 rounded-lg" />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-semibold text-gray-900">Select a Branch</h2>
        <p className="mt-2 text-gray-500">Choose your preferred branch for the service</p>
      </div>
      <RadioGroup
        value={selectedBranchId}
        onValueChange={onBranchSelect}
        className="grid gap-4 max-w-3xl mx-auto"
      >
        {service?.branches?.map((branch: Branch) => {
          if (!branch.is_active) return null;
          return (
            <Label
              key={branch.id}
              className={cn(
                'cursor-pointer rounded-lg border transition-all duration-200 hover:border-rose-200 hover:shadow-md',
                selectedBranchId === branch.id
                  ? 'border-rose-500 bg-rose-50 shadow-md ring-2 ring-rose-200'
                  : 'border-gray-200'
              )}
            >
              <RadioGroupItem value={branch.id} className="sr-only" />
              <Card className="border-0 shadow-none">
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg text-gray-900">{branch.name}</div>
                    <div
                      className={
                        'px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700'
                      }
                    >
                      {'Open'}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                      <span className="line-clamp-1">{branch.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-rose-500 shrink-0" />
                      <span>{'9:00 AM - 5:00 PM'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-rose-500 shrink-0" />
                      <span className="font-medium">{branch.phone_number}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
