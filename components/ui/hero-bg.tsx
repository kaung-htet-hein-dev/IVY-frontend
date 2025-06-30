import Image from 'next/image';
import React, { ReactNode } from 'react';

const HeroBg = ({ children }: { children: ReactNode }) => {
  return (
    <section className="hero-section min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <Image
        src="/images/hero-background.jpg"
        alt="Hair salon background"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {children}
    </section>
  );
};

export { HeroBg };
