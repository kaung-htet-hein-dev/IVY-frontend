import { useGetAvailableTimeSlots } from '@/hooks/booking/use-booking';
import { format, addDays } from 'date-fns';
import { useEffect, useState, useMemo } from 'react';

// Helper function to convert 12-hour time to 24-hour for sorting
const timeToMinutes = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  let totalHours = hours;
  if (period === 'PM' && hours !== 12) {
    totalHours += 12;
  } else if (period === 'AM' && hours === 12) {
    totalHours = 0;
  }

  return totalHours * 60 + minutes;
};

export function useTimeSlot({
  initialDate,
  initialTime,
  branchID,
}: {
  initialDate?: Date;
  initialTime?: string;
  branchID?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [time, setTime] = useState<string | undefined>(initialTime);

  const { availableTimeSlots: rawTimeSlots, isLoading } = useGetAvailableTimeSlots({
    bookedDate: date ? format(date, 'dd/MM/yyyy') : '',
    branchID,
  });

  // Sort time slots from 09:00 AM to 05:00 PM
  const availableTimeSlots = useMemo(() => {
    if (!rawTimeSlots || !Array.isArray(rawTimeSlots)) {
      return [];
    }

    return [...rawTimeSlots].sort((a, b) => {
      return timeToMinutes(a.slot) - timeToMinutes(b.slot);
    });
  }, [rawTimeSlots]);

  // Set a default date (tomorrow) if none is selected
  useEffect(() => {
    if (!date) {
      setDate(addDays(new Date(), 1)); // Set to tomorrow instead of today
    }
  }, [date]);

  // Reset selections when branch changes
  useEffect(() => {
    if (branchID) {
      setDate(undefined);
      setTime(undefined);
    }
  }, [branchID]);

  return {
    date,
    setDate,
    time,
    setTime,
    availableTimeSlots,
    isLoading,
  };
}
