import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { HeroBg } from '../ui/hero-bg';

export default function Hero() {
  return (
    <HeroBg>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="container mx-auto px-4 text-center relative z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          IVY Hair Studio
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto animate-slide-up">
          Elevate your look with our expert stylists. Cuts, colors, and treatments tailored to your
          unique style.
        </p>
        <Link href="/booking" passHref>
          <Button
            size="lg"
            className="animate-slide-up bg-rose-500 hover:bg-rose-600 text-white font-medium px-8 py-6 text-lg rounded-full"
          >
            Book an Appointment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </HeroBg>
  );
}
