import { BookingsTab } from '@/components/booking/bookings-tab';
import { PageHeader } from '@/components/ui/page-header';

export default function MyBookingsPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="My Bookings"
            description="View and manage your upcoming and past appointments"
          />

          <BookingsTab />
        </div>
      </div>
    </div>
  );
}
