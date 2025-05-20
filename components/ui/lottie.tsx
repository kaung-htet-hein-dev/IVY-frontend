import React from 'react';
import Lottie from 'lottie-react';
import LoadingJson from '@/assets/lottie/loading.json';
import NotFoundJson from '@/assets/lottie/not-found.json';

const LoadingLottie = () => {
  return (
    <div className="flex items-center justify-center">
      <Lottie animationData={LoadingJson} />
    </div>
  );
};

const NotFoundLottie = () => {
  return (
    <div className="flex items-center justify-center">
      <Lottie animationData={NotFoundJson} />
    </div>
  );
};

export { LoadingLottie, NotFoundLottie };
