import { useState, useEffect } from 'react';
import { useGetAvailableTimeSlotsMutation } from '@/store/api/service';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Service } from '@/store/api/service/types';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export function useTimeSlot({
  service,
  initialDate,
  initialTime,
}: {
  service: Service | undefined;
  initialDate?: Date;
  initialTime?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [time, setTime] = useState<string | undefined>(initialTime);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [getAvailableTimeSlots, { isLoading }] = useGetAvailableTimeSlotsMutation();
  const { toast } = useToast();

  const transformTimeSlots = (data: string[]): TimeSlot[] => {
    return data.map((time, index) => ({
      id: index.toString(),
      time,
      available: true,
    }));
  };

  // Set a default date (today) if none is selected
  useEffect(() => {
    if (!date) {
      setDate(new Date());
    }
  }, [date]);

  // Update available time slots when date changes
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!date || !service?.id) return;

      try {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const response = await getAvailableTimeSlots({
          date: formattedDate,
          serviceId: service.id,
        });

        if (response?.data) {
          const slots = transformTimeSlots(response.data.data);
          setAvailableTimeSlots(slots);
          // Only reset time if it's not in the new available slots
          if (time && !response.data.data.includes(time)) {
            setTime(undefined);
          }
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch available time slots. Please try again.',
          variant: 'destructive',
        });
        setAvailableTimeSlots([]);
      }
    };

    fetchTimeSlots();
  }, [date, service?.id, getAvailableTimeSlots, toast, time]);

  return {
    date,
    setDate,
    time,
    setTime,
    availableTimeSlots,
    isLoading,
  };
}
