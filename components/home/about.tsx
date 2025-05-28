import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brush, Scissors, Sparkles, Timer } from 'lucide-react';

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome to IVY Hair Studio</h2>
            <p className="text-gray-700 mb-6">
              At IVY Hair Studio, we believe that great hair is the best accessory anyone can have.
              Our team of passionate stylists is dedicated to helping you look and feel your best.
            </p>
            <p className="text-gray-700 mb-6">
              With years of experience and continuous education in the latest techniques and trends,
              we provide exceptional hair services in a relaxing, welcoming environment.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <Scissors className="h-5 w-5 text-rose-500 mt-1 mr-2" />
                <div>
                  <h3 className="font-semibold">Expert Stylists</h3>
                  <p className="text-sm text-gray-600">Trained professionals</p>
                </div>
              </div>
              <div className="flex items-start">
                <Sparkles className="h-5 w-5 text-rose-500 mt-1 mr-2" />
                <div>
                  <h3 className="font-semibold">Premium Products</h3>
                  <p className="text-sm text-gray-600">Quality guaranteed</p>
                </div>
              </div>
              <div className="flex items-start">
                <Timer className="h-5 w-5 text-rose-500 mt-1 mr-2" />
                <div>
                  <h3 className="font-semibold">Efficient Service</h3>
                  <p className="text-sm text-gray-600">Value your time</p>
                </div>
              </div>
              <div className="flex items-start">
                <Brush className="h-5 w-5 text-rose-500 mt-1 mr-2" />
                <div>
                  <h3 className="font-semibold">Custom Styles</h3>
                  <p className="text-sm text-gray-600">Personalized for you</p>
                </div>
              </div>
            </div>
            <Link href="/services" passHref>
              <Button variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50">
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Stylist working at IVY Hair Studio"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
