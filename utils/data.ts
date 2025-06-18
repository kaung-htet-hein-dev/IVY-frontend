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
