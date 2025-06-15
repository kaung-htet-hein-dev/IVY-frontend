import { LoadingState } from '@/components/ui/ui-state';
import React from 'react';

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-[100dvh]">
        <LoadingState />
      </div>
    </div>
  );
};

export default Loading;
