import React from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, XCircle } from 'lucide-react';

function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-8">
        <div className="text-center">
          <div className="mx-auto mb-8">
            <XCircle className="h-24 w-24 mx-auto text-rose-500" />
          </div>
          <p className="text-gray-600 mb-8"></p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
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

export { LoadingState, NotFoundState };
