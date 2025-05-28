import dynamic from 'next/dynamic';
import { testimonials } from '@/utils/data';

const TestimonialCard = dynamic(() => import('@/components/home/testimonial-card'), {
  loading: () => <div className="h-48 animate-pulse bg-gray-100 rounded-lg" />,
});

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their
            experience at IVY Hair Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
