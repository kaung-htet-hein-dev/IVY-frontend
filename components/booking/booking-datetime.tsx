'use client';

import { useGetBranches } from '@/hooks/booking/use-booking';
import { useBooking } from '@/providers/booking-context';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Branch } from '@/types/branch';
import { cn } from '@/utils/helpers';
import { addDays, format, isBefore, startOfDay } from 'date-fns';
import { CalendarDays, Clock, Loader2, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import BookingBranchSelection from './booking-branch-selection';
import { BookingStepNavigation } from './booking-step-navigation';
import { useTimeSlot } from './hooks/use-time-slot';

export default function BookingDateTime() {
  const {
    service,
    selectedDate,
    selectedTime,
    selectedBranchId,
    handleDateTimeSelect,
    setSelectedBranchId,
    serviceID,
  } = useBooking();
  const { date, setDate, time, setTime, availableTimeSlots, isLoading } = useTimeSlot({
    branchID: selectedBranchId,
    initialDate: selectedDate,
    initialTime: selectedTime,
  });
  const { branches } = useGetBranches(serviceID);

  const router = useRouter();

  // Disable past dates
  const disableDate = (date: Date): boolean => {
    return isBefore(date, startOfDay(new Date()));
  };

  const handleSubmit = (): void => {
    if (date && time) {
      handleDateTimeSelect(date, time);
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
      <div className="bg-white border rounded-xl p-4 md:p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Selected Service</h3>
            <p className="text-lg font-semibold text-gray-900">{service?.name}</p>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                {service?.duration_minute} min
              </span>
            </div>
            <div className="bg-rose-50 px-3 py-2 rounded-lg">
              <div className="font-semibold text-rose-600">{service?.price} MMK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Selection */}
      <div className="mb-6">
        <BookingBranchSelection
          selectedBranchId={selectedBranchId}
          onBranchSelect={setSelectedBranchId}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-rose-50">
              <CalendarDays className="h-5 w-5 text-rose-500" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Select Date</h3>
          </div>
          <div className="max-w-sm mx-auto xl:mx-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={disableDate}
              className="border rounded-lg p-3 bg-white shadow-sm"
              fromDate={addDays(new Date(), 1)}
              toDate={addDays(new Date(), 30)}
            />
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-rose-50">
              <Clock className="h-5 w-5 text-rose-500" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Select Time</h3>
          </div>

          <div className="relative max-w-3xl">
            <ScrollArea className="h-[400px] px-1">
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-3 gap-3">
                {isLoading ? (
                  <div className="col-span-full min-h-[200px] flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <Loader2 className="h-8 w-8 animate-spin text-rose-500 mx-auto" />
                      <p className="text-sm text-gray-500">Loading available time slots...</p>
                    </div>
                  </div>
                ) : (availableTimeSlots ?? []).length > 0 ? (
                  (availableTimeSlots ?? []).map(slot => (
                    <Button
                      key={slot.slot}
                      variant="outline"
                      disabled={!slot.is_available}
                      className={cn(
                        'h-12 text-base font-medium transition-all duration-200',
                        'hover:bg-rose-50 hover:border-rose-200',
                        time === slot.slot &&
                          'bg-rose-100 border-rose-500 text-rose-700 ring-2 ring-rose-200',
                        !slot.is_available &&
                          'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
                      )}
                      onClick={() => handleTimeSelect(slot.slot)}
                    >
                      {slot.slot}
                    </Button>
                  ))
                ) : (
                  <div className="col-span-full min-h-[200px] flex items-center justify-center">
                    <div className="text-center space-y-2 px-4">
                      <Clock className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-gray-500">No available time slots for this date</p>
                      <p className="text-sm text-gray-400">Please try selecting a different date</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="mt-8 mb-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-500">Your Selection</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Branch
              </div>
              {selectedBranchId ? (
                <p className="text-sm font-medium text-gray-900">
                  {branches?.data?.find((b: Branch) => b.id === selectedBranchId)?.name ||
                    'Selected Branch'}
                </p>
              ) : (
                <p className="text-sm text-gray-400">No branch selected</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                Date
              </div>
              {date ? (
                <p className="text-sm font-medium text-gray-900">
                  {format(date, 'EEEE, MMM d, yyyy')}
                </p>
              ) : (
                <p className="text-sm text-gray-400">No date selected</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Time
              </div>
              {time ? (
                <p className="text-sm font-medium text-gray-900">{time}</p>
              ) : (
                <p className="text-sm text-gray-400">No time selected</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookingStepNavigation
        onBack={onBack}
        onNext={handleSubmit}
        nextLabel="Continue to Customer Information"
        disabled={!date || !time || isLoading}
        isLoading={isLoading}
      />
    </div>
  );
}
