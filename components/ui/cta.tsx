import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-16 bg-rose-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a New Look?</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Whether you're looking for a simple trim or a complete transformation, our team is here to
          help. Book your appointment today and experience the IVY difference.
        </p>
        <Link href="/booking" passHref>
          <Button
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-8 py-6 text-lg"
          >
            Book an Appointment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
