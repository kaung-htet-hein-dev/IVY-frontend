import Link from "next/link";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { locations, socialLinks } from "@/lib/data";
import LocationCard from "./location-card";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4">IVY Hair Studio</h3>
            <p className="text-gray-300 mb-4">
              Dedicated to bringing out your natural beauty with our expert styling, 
              cutting, and coloring services. Your satisfaction is our top priority.
            </p>
            <div className="flex space-x-4">
              <a 
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer" 
                className="text-white hover:text-rose-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={`mailto:${socialLinks.email}`}
                className="text-white hover:text-rose-400 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href={`tel:${socialLinks.phone}`}
                className="text-white hover:text-rose-400 transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Locations */}
          {locations.map((location) => (
            <div key={location.id}>
              <LocationCard
                name={location.name}
                address={location.address}
                phone={location.phone}
                mapUrl={location.mapUrl}
              />
            </div>
          ))}

          {/* Hours */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-rose-400" />
                <div>
                  <p className="text-gray-300">Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-300">Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <div className="mb-4">
            <Link href="/services" className="hover:text-rose-400 transition-colors mx-3">Services</Link>
            <Link href="/booking" className="hover:text-rose-400 transition-colors mx-3">Book Appointment</Link>
            <Link href="/my-bookings" className="hover:text-rose-400 transition-colors mx-3">My Bookings</Link>
          </div>
          <p>© {new Date().getFullYear()} IVY Hair Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}