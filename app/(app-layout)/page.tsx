import About from '@/components/home/about';
import Hero from '@/components/home/hero';
import Services from '@/components/home/services';
import Testimonials from '@/components/home/testimonials';
import CTA from '@/components/ui/cta';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  );
}
