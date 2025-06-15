'use client';

import { Button } from '@/components/ui/button';

// Component that triggers client-side errors
export function ErrorBoundaryTest() {
  const triggerError = () => {
    throw new Error('This is a simulated client-side error!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Error Boundary Test</h2>
      <Button onClick={triggerError} variant="destructive">
        Trigger Error
      </Button>
    </div>
  );
}
