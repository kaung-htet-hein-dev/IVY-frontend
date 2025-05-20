'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log any errors to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-full bg-rose-100">
            <RefreshCcw className="h-12 w-12 text-rose-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-gray-600 mb-8">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={() => reset()} className="flex items-center gap-2" variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Link href="/" passHref>
              <Button className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
