import React from 'react';
import { LoadingState } from '../ui/ui-state';

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
