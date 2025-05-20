import { useState, useEffect } from 'react';
import { useGetAvailableTimeSlotsQuery } from '@/store/api/service';
import { format } from 'date-fns';
import { Service } from '@/store/api/service/types';

interface TimeSlot {
  id: string;
  slot: string;
  isAvailable: boolean;
}

export function useTimeSlot({
  service,
  initialDate,
  initialTime,
  branchId,
}: {
  service: Service | undefined;
  initialDate?: Date;
  initialTime?: string;
  branchId?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [time, setTime] = useState<string | undefined>(initialTime);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  const { data: timeSlotsResponse, isFetching: isLoading } = useGetAvailableTimeSlotsQuery(
    {
      date: date ? format(date, 'yyyy-MM-dd') : '',
      serviceId: service?.id || '',
      branchId: branchId || '',
    },
    { skip: !date || !service?.id || !branchId }
  );

  const transformTimeSlots = (data: { slot: string; isAvailable: boolean }[]): TimeSlot[] => {
    return data.map((item, index) => ({
      id: index.toString(),
      slot: item.slot,
      isAvailable: item.isAvailable,
    }));
  };

  // Set a default date (today) if none is selected
  useEffect(() => {
    if (!date) {
      setDate(new Date());
    }
  }, [date]);

  // Reset selections when branch changes
  useEffect(() => {
    if (branchId) {
      setDate(undefined);
      setTime(undefined);
      setAvailableTimeSlots([]);
    }
  }, [branchId]);

  // Update available time slots when response changes
  useEffect(() => {
    if (timeSlotsResponse?.data) {
      const slots = transformTimeSlots(timeSlotsResponse.data);
      setAvailableTimeSlots(slots);
      // Only reset time if it's not in the new available slots
      if (time && !timeSlotsResponse.data.some(item => item.slot === time)) {
        setTime(undefined);
      }
    } else if (!isLoading) {
      setAvailableTimeSlots([]);
    }
  }, [timeSlotsResponse, time, isLoading]);

  return {
    date,
    setDate,
    time,
    setTime,
    availableTimeSlots,
    isLoading,
  };
}
