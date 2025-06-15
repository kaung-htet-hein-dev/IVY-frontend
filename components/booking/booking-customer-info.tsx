'use client';

import { useBooking } from '@/app/(app-layout)/booking/providers/booking-context';
import { CustomerInfo, customerInfoSchema } from '@/app/(app-layout)/booking/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUserInfo, useUserMutation } from '@/hooks/use-user-info';
import { scrollToTop } from '@/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BookingStepNavigation } from './booking-step-navigation';

export default function BookingCustomerInfo() {
  const { data: userInfo } = useUserInfo();
  const { handleCustomerInfoSubmit, goBack: onBack } = useBooking();
  const { mutate, isPending } = useUserMutation();
  const form = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      email: userInfo?.email || '',
      name: userInfo ? `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim() : '',
      phone: userInfo?.phone_number || '',
      notes: '',
    },
  });

  // Handle form submission
  const handleSubmit = form.handleSubmit(async data => {
    try {
      const isPhoneUpdated = data.phone !== userInfo?.phone_number;
      if (isPhoneUpdated) {
        mutate({
          phone_number: data.phone,
          id: userInfo?.id || '',
        });
      }
    } finally {
      handleCustomerInfoSubmit(data);
      scrollToTop();
    }
  });

  useEffect(() => {
    if (userInfo) {
      const fullName = `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim();
      form.reset({
        name: fullName,
        email: userInfo.email || '',
        phone: userInfo.phone_number || '',
        notes: form.getValues('notes') || '', // Preserve existing notes
      });
    }
  }, [userInfo]);

  return (
    <div>
      <p className="text-gray-600 mb-6">
        {
          "Please provide your contact information. We'll send your booking confirmation to the email you provide."
        }
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} disabled={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="09xxxxxxxxx"
                    type="tel"
                    {...field}
                    onChange={e => field.onChange(e.target.value)}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Enter your phone number in this format (e.g., 09xxxxxxxxx)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requirements or preferences for your appointment..."
                    className="resize-none"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>Maximum 500 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <BookingStepNavigation
            onBack={onBack}
            nextLabel="Continue to Confirmation"
            isLoading={isPending}
            submitType
          />
        </form>
      </Form>
    </div>
  );
}
