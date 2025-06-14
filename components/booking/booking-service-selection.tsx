import { getServices } from '@/lib/fetch/fetcher';
import { BookingListItem } from './booking-list-item';
import { ErrorUI } from '../ui/error-ui';

export default async function BookingServiceSelection() {
  const { categorizedServices } = await getServices();

  if (!categorizedServices) {
    return <ErrorUI />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div>
        <p className="text-gray-600 mb-6">Please select the service you would like to book:</p>

        {Object.entries(categorizedServices ?? {}).map(([category, categoryServices]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 gap-4">
              {categoryServices.map(service => (
                <BookingListItem service={service} key={service.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
