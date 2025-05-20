'use client';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, CalendarDays, Loader2 } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { addDays, isBefore, startOfDay } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Service } from '@/store/api/service/types';
import { useTimeSlot } from './hooks/use-time-slot';

interface BookingDateTimeProps {
  service: Service;
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  onDateTimeSelect: (date: Date | undefined, time: string | undefined) => void;
}

export default function BookingDateTime({
  service,
  selectedDate,
  selectedTime,
  onDateTimeSelect,
}: BookingDateTimeProps) {
  const { date, setDate, time, setTime, availableTimeSlots, isLoading } = useTimeSlot({
    service,
    initialDate: selectedDate,
    initialTime: selectedTime,
  });

  const router = useRouter();

  // Disable past dates
  const disableDate = (date: Date): boolean => {
    return isBefore(date, startOfDay(new Date()));
  };

  const handleSubmit = (): void => {
    if (date && time) {
      onDateTimeSelect(date, time);
    }
  };

  const handleTimeSelect = (selectedTime: string): void => {
    setTime(selectedTime);
  };

  const onBack = (): void => {
    router.back();
  };

  return (
    <div>
      {/* Service Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold">Selected Service:</h3>
        <div className="flex justify-between items-center mt-2">
          <span>{service.name}</span>
          <div className="text-right">
            <div className="font-medium text-rose-600">${service.price}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {service.durationMinute} min
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-rose-500" />
            <h3 className="font-semibold text-lg">Select Date</h3>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disableDate}
            className="border rounded-lg p-3"
            fromDate={new Date()}
            toDate={addDays(new Date(), 30)}
          />
        </div>

        {/* Time Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-rose-500" />
            <h3 className="font-semibold text-lg">Select Time</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 min-h-[200px]">
            {isLoading ? (
              <div className="col-span-3 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-rose-500" />
              </div>
            ) : availableTimeSlots.length > 0 ? (
              availableTimeSlots.map(slot => (
                <Button
                  key={slot.id}
                  variant="outline"
                  disabled={!slot.available}
                  className={cn(
                    'h-10 hover:bg-rose-50',
                    time === slot.time && 'bg-rose-100 border-rose-500 text-rose-700',
                    !slot.available && 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                  onClick={() => handleTimeSelect(slot.time)}
                >
                  {slot.time}
                </Button>
              ))
            ) : (
              <div className="col-span-3 text-center py-4 text-gray-500">
                No available time slots for this date
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!date || !time || isLoading}
          className="bg-rose-500 hover:bg-rose-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
