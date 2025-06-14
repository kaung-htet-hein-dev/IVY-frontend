'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface ErrorUIProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
  fullHeight?: boolean;
}

export function ErrorUI({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  showRetry = true,
  className,
  fullHeight = true,
}: ErrorUIProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center px-6 py-12',
        fullHeight && 'min-h-screen',
        className
      )}
    >
      <div className="max-w-md mx-auto">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />

        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{message}</p>
        </div>

        {showRetry && (
          <Button
            onClick={onRetry || (() => window.location.reload())}
            className="inline-flex items-center gap-2"
            variant="outline"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

// Specific error variants for common use cases
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorUI
      title="Connection Error"
      message="Unable to connect to our servers. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  );
}

export function NotFoundError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorUI
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved."
      onRetry={onRetry}
      showRetry={false}
    />
  );
}

export function ServerError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorUI
      title="Server Error"
      message="Our servers are experiencing issues. We're working to fix this as quickly as possible."
      onRetry={onRetry}
    />
  );
}

export function LoadingError({
  resource = 'content',
  onRetry,
}: {
  resource?: string;
  onRetry?: () => void;
}) {
  return (
    <ErrorUI
      title="Loading Error"
      message={`Failed to load ${resource}. This might be a temporary issue.`}
      onRetry={onRetry}
    />
  );
}
