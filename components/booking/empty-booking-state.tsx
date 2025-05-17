import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EmptyBookingStateProps {
  type: 'upcoming' | 'past';
}

export function EmptyBookingState({ type }: EmptyBookingStateProps) {
  const isUpcoming = type === 'upcoming';

  return (
    <div className="text-center py-12 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">
        No {isUpcoming ? 'Upcoming' : 'Past'} Appointments
      </h3>
      <p className="text-gray-600 mb-6">
        {isUpcoming
          ? "You don't have any upcoming appointments scheduled."
          : "You don't have any past appointment history yet."}
      </p>

      <Link href="/booking" passHref>
        <Button className="bg-rose-500 hover:bg-rose-600">
          Book an Appointment <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
