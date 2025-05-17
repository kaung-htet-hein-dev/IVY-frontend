import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Testimonial } from '@/utils/data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt={testimonial.customerName}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="bg-rose-100 h-full w-full flex items-center justify-center text-rose-500 font-semibold">
                {testimonial.customerName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold">{testimonial.customerName}</h4>
            <p className="text-sm text-gray-500">{testimonial.service}</p>
          </div>
        </div>

        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        <p className="text-gray-700 italic">"{testimonial.comment}"</p>
      </CardContent>
    </Card>
  );
}
