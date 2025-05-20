'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomerInfo, customerInfoSchema } from '@/app/booking/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useBooking } from '@/providers/booking-context';

export default function BookingCustomerInfo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { customerInfo, handleCustomerInfoSubmit: onSubmit, goBack: onBack } = useBooking();

  const form = useForm<CustomerInfo>({
    defaultValues: {
      name: customerInfo.name || '',
      email: customerInfo.email || '',
      phone: customerInfo.phone || '',
      notes: customerInfo.notes || '',
    },
  });

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');

    // Format as E.164 (e.g., +1234567890)
    if (numbers.length > 0) {
      return `+${numbers}`;
    }
    return numbers;
  };

  // Handle form submission
  const handleSubmit = form.handleSubmit(async data => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Please provide your contact information. We'll send your booking confirmation to the email
        you provide.
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            rules={customerInfoSchema.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={customerInfoSchema.email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            rules={customerInfoSchema.phone}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1234567890"
                    {...field}
                    onChange={e => field.onChange(formatPhoneNumber(e.target.value))}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Enter your phone number in international format (e.g., +1234567890)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            rules={customerInfoSchema.notes}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requirements or preferences for your appointment..."
                    className="resize-none"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>Maximum 500 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
              disabled={isSubmitting}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
