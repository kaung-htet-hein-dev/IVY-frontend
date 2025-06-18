import { useGetAvailableTimeSlots } from '@/hooks/booking/use-booking';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

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

  const { availableTimeSlots, isLoading } = useGetAvailableTimeSlots({
    bookedDate: date ? format(date, 'dd/MM/yyyy') : '',
    branchID,
  });

  // Set a default date (today) if none is selected
  useEffect(() => {
    if (!date) {
      setDate(new Date());
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
