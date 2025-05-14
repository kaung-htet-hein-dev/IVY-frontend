import ServiceHighlight from "@/components/home/service-highlight";
import TestimonialCard from "@/components/home/testimonial-card";
import { Button } from "@/components/ui/button";
import { services, testimonials } from "@/lib/data";
import { ArrowRight, Brush, Scissors, Sparkles, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Display only selected services for highlights
  const highlightServices = services.slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="hero-section min-h-screen flex items-center justify-center pt-16"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1920")'
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            IVY Hair Studio
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto animate-slide-up">
            Elevate your look with our expert stylists. Cuts, colors, and
            treatments tailored to your unique style.
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
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Welcome to IVY Hair Studio
              </h2>
              <p className="text-gray-700 mb-6">
                At IVY Hair Studio, we believe that great hair is the best
                accessory anyone can have. Our team of passionate stylists is
                dedicated to helping you look and feel your best.
              </p>
              <p className="text-gray-700 mb-6">
                With years of experience and continuous education in the latest
                techniques and trends, we provide exceptional hair services in a
                relaxing, welcoming environment.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <Scissors className="h-5 w-5 text-rose-500 mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold">Expert Stylists</h3>
                    <p className="text-sm text-gray-600">
                      Trained professionals
                    </p>
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
                    <p className="text-sm text-gray-600">
                      Personalized for you
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/services" passHref>
                <Button
                  variant="outline"
                  className="border-rose-500 text-rose-500 hover:bg-rose-50"
                >
                  Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Stylist working at IVY Hair Studio"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of hair services to meet your needs. From
              classic cuts to transformative treatments, our expert stylists are
              here to help you look and feel your best.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlightServices.map((service) => (
              <ServiceHighlight key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" passHref>
              <Button className="bg-rose-500 hover:bg-rose-600">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about their experience at IVY Hair Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a New Look?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you're looking for a simple trim or a complete
            transformation, our team is here to help. Book your appointment
            today and experience the IVY difference.
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
    </div>
  );
}
