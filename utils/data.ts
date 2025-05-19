// Service types

import { BookingStatus, type Booking } from '@/store/api/booking/types';
import { type Service } from '@/store/api/service/types';

// Booking types
export type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

// Testimonial types
export type Testimonial = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  image?: string;
};

// Mock data for services
export const services: Service[] = [
  {
    id: '1',
    name: "Men's Haircut",
    description:
      "Professional men's haircut tailored to your style and preference, including a consultation.",
    price: 30,
    durationMinute: 30,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
  {
    id: '2',
    name: "Women's Haircut",
    description:
      "Professional women's haircut tailored to your style, including consultation and styling.",
    price: 45,
    durationMinute: 45,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
  {
    id: '3',
    name: 'Hair Wash & Style',
    description:
      'Rejuvenating hair wash with premium products followed by professional blow-dry styling.',
    price: 25,
    durationMinute: 30,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
  {
    id: '4',
    name: 'Hair Rebonding',
    description:
      'Chemical straightening process to transform curly or wavy hair into perfectly straight hair.',
    price: 150,
    durationMinute: 180,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
  {
    id: '5',
    name: 'Curl & Perm',
    description: 'Professional perming service to add beautiful, long-lasting curls to your hair.',
    price: 120,
    durationMinute: 150,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/3993302/pexels-photo-3993302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
  {
    id: '6',
    name: 'Hair Coloring',
    description:
      'Professional hair coloring service using premium products for vibrant, long-lasting results.',
    price: 85,
    durationMinute: 120,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/3993333/pexels-photo-3993333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
  {
    id: '7',
    name: 'Highlights',
    description: 'Add dimension and depth to your hair with custom highlight application.',
    price: 95,
    durationMinute: 120,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
  {
    id: '8',
    name: 'Deep Conditioning Treatment',
    description: 'Intensive hair treatment to restore moisture, shine, and health to damaged hair.',
    price: 40,
    durationMinute: 45,
    category: { id: 'haircut', name: 'haircut' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      'https://images.pexels.com/photos/3993083/pexels-photo-3993083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isActive: true,
  },
];

// Mock testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment:
      'Absolutely love my new haircut! The stylist really listened to what I wanted and delivered beyond my expectations.',
    service: "Women's Haircut",
    date: '2023-08-15',
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    customerName: 'James Wilson',
    rating: 5,
    comment:
      "First time trying this salon and I'm impressed! Great atmosphere and my stylist was very skilled.",
    service: "Men's Haircut",
    date: '2023-07-22',
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    customerName: 'Emily Rodriguez',
    rating: 4,
    comment:
      'Love my new hair color! The staff was friendly and professional. Will definitely come back.',
    service: 'Hair Coloring',
    date: '2023-08-05',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    customerName: 'Michael Chen',
    rating: 5,
    comment: 'The rebonding treatment was perfect. My hair has never looked better.',
    service: 'Hair Rebonding',
    date: '2023-07-30',
    image:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const locations = [
  {
    id: 'yangon',
    name: 'Yangon Branch',
    address: '14, Baho Road, Sanchaung Township, Yangon',
    phone: '+95 9 785 948657',
    mapUrl: 'https://g.co/kgs/oGR3mCb',
    coordinates: {
      lat: 16.805546,
      lng: 96.134571,
    },
  },
  {
    id: 'mandalay',
    name: 'Mandalay Branch',
    address: '35th Street, Between 78th & 79th Street, Mandalay',
    phone: '+95 9 785 948657',
    mapUrl: 'https://g.co/kgs/UqMp2Qw',
    coordinates: {
      lat: 21.97501,
      lng: 96.08329,
    },
  },
];

export const socialLinks = {
  facebook: 'https://www.facebook.com/ivyhairstudiomm',
  email: 'ivyhairstudioygn@gmail.com',
  phone: '+95 9 785 948657',
};

// Generate available time slots for a given date
export function generateTimeSlots(date: string): TimeSlot[] {
  // This is a mock implementation
  const slots: TimeSlot[] = [];

  // Generate slots from 9 AM to 7 PM
  for (let hour = 9; hour <= 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Randomly mark some slots as unavailable
      const available = Math.random() > 0.3;

      slots.push({
        id: `${date}-${time}`,
        time,
        available,
      });
    }
  }

  return slots;
}

// Mock user bookings
export const userBookings: Booking[] = [
  {
    id: 'booking-1',
    date: '2023-09-15',
    status: BookingStatus.COMPLETED,
    createdAt: '2023-09-01T12:00:00Z',
    service: {
      id: '1',
    },
    user: {
      id: 'user-1',
    },
  },
  {
    id: 'booking-2',
    date: '2023-08-20',
    status: BookingStatus.COMPLETED,
    createdAt: '2023-08-01T15:30:00Z',
    service: {
      id: '1',
    },
    user: {
      id: 'user-1',
    },
  },
  {
    id: 'booking-3',
    date: '2023-09-28',
    status: BookingStatus.COMPLETED,
    createdAt: '2023-09-05T09:15:00Z',
    service: {
      id: '1',
    },
    user: {
      id: 'user-1',
    },
  },
];

// Helper to get a service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

// Helper to get a booking by ID
export function getBookingById(id: string): Booking | undefined {
  return userBookings.find(booking => booking.id === id);
}
