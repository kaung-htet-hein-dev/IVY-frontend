import BookingServiceSelection from '@/components/booking/booking-service-selection';
import { redirect } from 'next/navigation';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BookingPage(props: { params: Params; searchParams: SearchParams }) {
  // const params = await props.searchParams;
  // if (params.service) {
  //   redirect(`/booking/${params.service}`);
  // }

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Select a Service</h1>
            <p className="text-gray-600">Choose from our range of professional hair services</p>
          </div>

          {/* Service Selection */}
          <BookingServiceSelection />
        </div>
      </div>
    </div>
  );
}
